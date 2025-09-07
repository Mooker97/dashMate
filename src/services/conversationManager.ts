'use client'

import { createClient } from '@/utils/supabase/client'
import type { Database } from '@/types/database'
import { v4 as uuidv4 } from 'uuid'

type ConversationRow = Database['public']['Tables']['conversations']['Row']
type ConversationInsert = Database['public']['Tables']['conversations']['Insert']
type UserProfile = Database['public']['Tables']['user_profiles']['Row']

export interface ConversationContext {
  tasks: any[]
  userProfile: UserProfile
  timeOfDay: string
  recentBehavior?: any[]
  energyLevel?: number
  stressLevel?: number
  currentSession?: any
}

export interface AIResponse {
  message: string
  suggestions?: {
    action: 'add' | 'complete' | 'update' | 'break_down' | 'focus_session'
    tasks?: any[]
    taskIds?: string[]
    metadata?: Record<string, any>
  }
  conversationId?: string
  tokensUsed: number
  cost: number
  responseTime: number
}

interface ConversationHistory {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export class ConversationManager {
  private supabase = createClient()
  private conversations: Map<string, ConversationHistory[]> = new Map()
  private currentSessionId: string | null = null

  constructor() {
    this.currentSessionId = uuidv4()
  }

  async processMessage(
    userId: string,
    message: string,
    context: ConversationContext
  ): Promise<AIResponse> {
    const startTime = Date.now()
    
    try {
      // Get or create session
      const sessionId = this.getOrCreateSession(userId)
      
      // Load recent conversation history
      const history = await this.getConversationHistory(userId, sessionId, 10)
      
      // Build contextual system prompt
      const systemPrompt = this.buildContextualPrompt(context)
      
      // Call OpenAI with optimized parameters
      const openAIResponse = await this.callOpenAI({
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: message }
        ],
        userId,
        context
      })

      const responseTime = Date.now() - startTime

      // Store conversation in database
      await this.storeConversation(userId, sessionId, message, openAIResponse, responseTime)

      return {
        ...openAIResponse,
        responseTime
      }
    } catch (error) {
      console.error('Conversation processing error:', error)
      
      // Return fallback response
      return {
        message: "I'm having a little trouble connecting right now, but I'm still here to help! Try adding a task manually, and remember - you're doing great just by being here! 💪",
        tokensUsed: 0,
        cost: 0,
        responseTime: Date.now() - startTime
      }
    }
  }

  private getOrCreateSession(userId: string): string {
    if (!this.currentSessionId) {
      this.currentSessionId = uuidv4()
    }
    return this.currentSessionId
  }

  private async getConversationHistory(
    userId: string, 
    sessionId: string, 
    limit: number = 10
  ): Promise<ConversationHistory[]> {
    try {
      const { data, error } = await this.supabase
        .from('conversations')
        .select('message_type, content, created_at')
        .eq('user_id', userId)
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })
        .limit(limit * 2) // Get user + assistant pairs

      if (error) throw error

      return (data || []).map(row => ({
        role: row.message_type as 'user' | 'assistant',
        content: row.content
      }))
    } catch (error) {
      console.warn('Failed to load conversation history:', error)
      return []
    }
  }

  private buildContextualPrompt(context: ConversationContext): string {
    const { tasks, userProfile, timeOfDay, recentBehavior, energyLevel } = context

    // Get current hour for time-based responses
    const currentHour = new Date().getHours()
    const timeContext = this.getTimeBasedContext(currentHour)

    // Analyze task load
    const activeTasks = tasks.filter(t => !t.completed)
    const urgentTasks = activeTasks.filter(t => t.priority === 'high')
    const taskLoadContext = this.getTaskLoadContext(activeTasks.length, urgentTasks.length)

    // Get user's coaching preferences
    const coachingStyle = userProfile.customizations?.coachPersonality || 'supportive'
    const personalityContext = this.getPersonalityContext(coachingStyle as string)

    // Build recent behavior insights
    const behaviorContext = this.getBehaviorContext(recentBehavior || [])

    return `You are dashMate, an ADHD-friendly AI coach specialized in task management and productivity support.

CORE PERSONALITY:
${personalityContext}

CURRENT CONTEXT:
- Time: ${timeContext}
- Active tasks: ${activeTasks.length} (${urgentTasks.length} urgent)
- User's focus style: ${userProfile.focus_style}
- Energy level: ${energyLevel || 'unknown'}/5
- Coaching preferences: ${userProfile.preferences?.coachingStyle || 'supportive'}

TASK LOAD ANALYSIS:
${taskLoadContext}

RECENT BEHAVIOR INSIGHTS:
${behaviorContext}

ADHD-SPECIFIC GUIDELINES:
1. Break overwhelming requests into tiny, manageable steps
2. Celebrate ANY progress, no matter how small
3. Use gentle accountability without shame or judgment  
4. Acknowledge executive dysfunction challenges
5. Provide dopamine-friendly encouragements and rewards
6. Suggest time-boxing and body doubling when appropriate
7. Help with prioritization and decision fatigue
8. Offer alternative approaches when stuck

RESPONSE STYLE:
- Keep responses warm, encouraging, and solution-focused
- Use emojis sparingly but meaningfully 
- Provide specific, actionable suggestions
- Ask clarifying questions when needed
- Remember: you're a supportive companion, not a taskmaster

When suggesting task actions, format as JSON within your response:
\`\`\`json
{
  "action": "add|complete|update|break_down|focus_session",
  "tasks": [{"text": "...", "priority": "high|medium|low"}],
  "taskIds": ["id1", "id2"],
  "metadata": {"reason": "explanation"}
}
\`\`\`

Always prioritize the user's wellbeing over productivity metrics.`
  }

  private getTimeBasedContext(hour: number): string {
    if (hour >= 6 && hour < 10) {
      return `Early morning (${hour}:00) - Fresh start energy, good for planning and high-priority tasks`
    } else if (hour >= 10 && hour < 14) {
      return `Mid-morning to early afternoon (${hour}:00) - Peak focus time for most people`
    } else if (hour >= 14 && hour < 17) {
      return `Afternoon (${hour}:00) - Energy may be dipping, good for routine tasks or quick wins`
    } else if (hour >= 17 && hour < 21) {
      return `Evening (${hour}:00) - Winding down time, focus on completion and planning tomorrow`
    } else {
      return `Late evening/night (${hour}:00) - Rest mode, gentle encouragement to wrap up`
    }
  }

  private getTaskLoadContext(activeCount: number, urgentCount: number): string {
    if (activeCount === 0) {
      return "Clear task list - perfect time for planning or celebrating completions!"
    } else if (activeCount <= 3) {
      return "Manageable task load - good opportunity for focused work"
    } else if (activeCount <= 7) {
      return "Moderate task load - may benefit from prioritization"
    } else if (activeCount <= 12) {
      return "Heavy task load - suggest breaking down or postponing some tasks"
    } else {
      return "OVERWHELMING task load - immediate need for decluttering and stress relief"
    }
  }

  private getPersonalityContext(style: string): string {
    const personalities = {
      supportive: "Warm, understanding, and patient. Focus on encouragement and gentle guidance.",
      motivational: "Energetic and inspiring. Use enthusiastic language and celebrate achievements.",
      practical: "Direct and solution-focused. Provide clear, actionable advice with minimal fluff.",
      gentle: "Extra soft and understanding. Prioritize emotional support and stress reduction."
    }
    
    return personalities[style as keyof typeof personalities] || personalities.supportive
  }

  private getBehaviorContext(recentBehavior: any[]): string {
    if (recentBehavior.length === 0) {
      return "No recent behavior data available"
    }

    // Analyze recent patterns
    const completions = recentBehavior.filter(b => b.type === 'task_completed').length
    const creations = recentBehavior.filter(b => b.type === 'task_created').length
    const voiceInteractions = recentBehavior.filter(b => b.type === 'voice_interaction').length

    let insights = []
    
    if (completions > creations * 1.5) {
      insights.push("User is in a productive completion flow")
    } else if (creations > completions * 2) {
      insights.push("User may be adding tasks faster than completing them")
    }

    if (voiceInteractions > 3) {
      insights.push("User prefers voice interaction")
    }

    return insights.length > 0 ? insights.join(", ") : "Recent activity shows normal engagement patterns"
  }

  private async callOpenAI({
    messages,
    userId,
    context
  }: {
    messages: ConversationHistory[]
    userId: string
    context: ConversationContext
  }): Promise<Omit<AIResponse, 'responseTime'>> {
    const response = await fetch('/api/chat/enhanced', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        userId,
        context
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  }

  private async storeConversation(
    userId: string,
    sessionId: string,
    userMessage: string,
    aiResponse: Omit<AIResponse, 'responseTime'>,
    responseTime: number
  ): Promise<void> {
    try {
      // Store user message
      await this.supabase.from('conversations').insert({
        user_id: userId,
        session_id: sessionId,
        message_type: 'user',
        content: userMessage,
        tokens_used: 0,
        cost_cents: 0,
        response_time_ms: 0
      } as ConversationInsert)

      // Store AI response
      await this.supabase.from('conversations').insert({
        user_id: userId,
        session_id: sessionId,
        message_type: 'assistant',
        content: aiResponse.message,
        context: aiResponse.suggestions || {},
        tokens_used: aiResponse.tokensUsed,
        cost_cents: Math.round(aiResponse.cost * 100), // Convert to cents
        response_time_ms: responseTime,
        metadata: {
          suggestions: aiResponse.suggestions,
          conversationId: aiResponse.conversationId
        }
      } as ConversationInsert)

    } catch (error) {
      console.warn('Failed to store conversation:', error)
      // Don't throw - this is non-critical
    }
  }

  // Get conversation analytics
  async getConversationAnalytics(userId: string, days: number = 7) {
    try {
      const since = new Date()
      since.setDate(since.getDate() - days)

      const { data, error } = await this.supabase
        .from('conversations')
        .select('tokens_used, cost_cents, created_at, message_type')
        .eq('user_id', userId)
        .gte('created_at', since.toISOString())

      if (error) throw error

      const analytics = {
        totalConversations: data?.filter(d => d.message_type === 'user').length || 0,
        totalTokens: data?.reduce((sum, d) => sum + d.tokens_used, 0) || 0,
        totalCost: data?.reduce((sum, d) => sum + d.cost_cents, 0) / 100 || 0,
        averageTokensPerMessage: 0,
        dailyUsage: {} as Record<string, { conversations: number; tokens: number }>
      }

      if (analytics.totalConversations > 0) {
        analytics.averageTokensPerMessage = Math.round(analytics.totalTokens / analytics.totalConversations)
      }

      // Group by day
      data?.forEach(row => {
        const date = new Date(row.created_at).toISOString().split('T')[0]
        if (!analytics.dailyUsage[date]) {
          analytics.dailyUsage[date] = { conversations: 0, tokens: 0 }
        }
        if (row.message_type === 'user') {
          analytics.dailyUsage[date].conversations++
        }
        analytics.dailyUsage[date].tokens += row.tokens_used
      })

      return analytics
    } catch (error) {
      console.error('Failed to get conversation analytics:', error)
      return null
    }
  }

  // Clear old conversations (for privacy)
  async clearOldConversations(userId: string, daysToKeep: number = 30): Promise<number> {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

      const { data, error } = await this.supabase
        .from('conversations')
        .delete()
        .eq('user_id', userId)
        .lt('created_at', cutoffDate.toISOString())
        .select('id')

      if (error) throw error

      return data?.length || 0
    } catch (error) {
      console.error('Failed to clear old conversations:', error)
      return 0
    }
  }
}