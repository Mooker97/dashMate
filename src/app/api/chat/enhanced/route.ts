import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ConversationManager } from '@/services/conversationManager'
import type { ConversationContext } from '@/services/conversationManager'

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

interface EnhancedChatRequest {
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
  userId: string
  context: ConversationContext
}

// Token costs per model (as of 2025)
const MODEL_COSTS = {
  'gpt-4': { input: 0.00003, output: 0.00006 },       // $30/$60 per 1M tokens
  'gpt-4-turbo': { input: 0.00001, output: 0.00003 }, // $10/$30 per 1M tokens  
  'gpt-3.5-turbo': { input: 0.0000015, output: 0.000002 }, // $1.50/$2.00 per 1M tokens
  'o1-preview': { input: 0.000015, output: 0.00006 },  // $15/$60 per 1M tokens
  'o1-mini': { input: 0.000003, output: 0.000012 }     // $3/$12 per 1M tokens
}

export async function POST(request: NextRequest) {
  try {
    const { messages, userId, context }: EnhancedChatRequest = await request.json()

    if (!messages || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: messages, userId' },
        { status: 400 }
      )
    }

    if (!openai || !process.env.OPENAI_API_KEY) {
      return NextResponse.json(createFallbackResponse(messages, context))
    }

    // Initialize services (currently unused but may be needed for future features)
    // const conversationManager = new ConversationManager()

    // Call OpenAI with default parameters
    const startTime = Date.now()
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
      user: userId // Track usage per user
    })

    const responseTime = Date.now() - startTime
    const completion = response.choices[0].message.content || ''

    // Parse AI response for task suggestions
    const parsedResponse = parseAIResponse(completion)

    // Calculate cost
    const inputTokens = response.usage?.prompt_tokens || 0
    const outputTokens = response.usage?.completion_tokens || 0
    const modelCosts = MODEL_COSTS['gpt-3.5-turbo']
    const cost = (inputTokens * modelCosts.input) + (outputTokens * modelCosts.output)

    const result = {
      message: parsedResponse.message,
      suggestions: parsedResponse.suggestions,
      conversationId: response.id,
      tokensUsed: (response.usage?.total_tokens || 0),
      cost: cost,
      responseTime: responseTime,
      model: 'gpt-3.5-turbo',
      metadata: {
        inputTokens,
        outputTokens,
        fromOptimizer: false
      }
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Enhanced chat error:', error)
    
    return NextResponse.json(
      { 
        message: "I'm having a little trouble connecting right now, but I'm still here to help! Try adding a task manually, and remember - you're doing great just by being here! 💪",
        suggestions: undefined,
        tokensUsed: 0,
        cost: 0,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 200 } // Return 200 to avoid UI errors, but with fallback response
    )
  }
}

function parseAIResponse(aiMessage: string) {
  try {
    // Look for JSON blocks in the response
    const jsonMatch = aiMessage.match(/```json\n?([\s\S]*?)\n?```/)
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[1]
      const parsed = JSON.parse(jsonStr)
      
      // Remove JSON from the message text
      const messageWithoutJson = aiMessage.replace(/```json[\s\S]*?```/, '').trim()
      
      return {
        message: messageWithoutJson || parsed.message || aiMessage,
        suggestions: validateSuggestions(parsed)
      }
    }
    
    return {
      message: aiMessage,
      suggestions: undefined
    }
  } catch (error) {
    console.warn('Failed to parse AI response JSON:', error)
    return {
      message: aiMessage,
      suggestions: undefined
    }
  }
}

function validateSuggestions(suggestions: unknown) {
  if (!suggestions || typeof suggestions !== 'object') {
    return undefined
  }

  const suggestionsObj = suggestions as Record<string, unknown>

  // Ensure action is valid
  const validActions = ['add', 'complete', 'update', 'break_down', 'focus_session']
  if (!validActions.includes(suggestionsObj.action as string)) {
    return undefined
  }

  // Validate task structure if present
  if (suggestionsObj.tasks && Array.isArray(suggestionsObj.tasks)) {
    suggestionsObj.tasks = suggestionsObj.tasks.filter((task: unknown) => 
      task && typeof task === 'object' && (task as Record<string, unknown>).text && 
      typeof (task as Record<string, unknown>).text === 'string' && 
      ((task as Record<string, unknown>).text as string).trim().length > 0
    )
  }

  // Validate task IDs if present
  if (suggestionsObj.taskIds && Array.isArray(suggestionsObj.taskIds)) {
    suggestionsObj.taskIds = suggestionsObj.taskIds.filter((id: unknown) => 
      typeof id === 'string' && id.trim().length > 0
    )
  }

  return suggestionsObj
}

function createFallbackResponse(messages: Array<{ role: string; content: string }>, _context: ConversationContext) {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
  
  // Simple pattern matching for offline mode
  const responses = [
    {
      patterns: ['add', 'new task', 'create', 'make'],
      message: "I'd love to help you add that task! Even though I can't connect to my full AI right now, you can add tasks manually. You're being so proactive! 🌟",
      suggestions: {
        action: 'add',
        tasks: [{ 
          text: lastMessage.replace(/add|new task|create|make/gi, '').trim() || 'New task',
          priority: 'medium'
        }]
      }
    },
    {
      patterns: ['done', 'complete', 'finished'],
      message: "Amazing work! 🎉 Completing tasks is huge - you should feel proud! What would you like to tackle next?",
      suggestions: undefined
    },
    {
      patterns: ['help', 'stuck', 'overwhelmed'],
      message: "I hear you, and it's okay to feel stuck sometimes. Let's start small - what's ONE tiny thing you could do right now? Even 2 minutes counts! 💪",
      suggestions: undefined
    },
    {
      patterns: ['break', 'rest', 'tired'],
      message: "Taking breaks is SO important, especially for ADHD brains! Your productivity includes rest time. Maybe try a quick walk or some deep breaths? 🌈",
      suggestions: {
        action: 'focus_session',
        metadata: { type: 'break', duration: '10 minutes' }
      }
    }
  ]

  // Find matching response
  for (const response of responses) {
    if (response.patterns.some(pattern => lastMessage.includes(pattern))) {
      return {
        message: response.message,
        suggestions: response.suggestions,
        tokensUsed: 0,
        cost: 0,
        responseTime: 0,
        fromFallback: true
      }
    }
  }

  // Default encouraging response
  return {
    message: "I'm having trouble connecting to my full AI capabilities right now, but I'm still here with you! Remember: you're doing amazing just by being here and thinking about your tasks. Every small step counts! ✨",
    suggestions: undefined,
    tokensUsed: 0,
    cost: 0,
    responseTime: 0,
    fromFallback: true
  }
}