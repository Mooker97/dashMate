import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Task } from '@/hooks/useTasks';

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

const SYSTEM_PROMPT = `You are dashMate, an ADHD-friendly AI coach designed to help users manage tasks with kindness, encouragement, and understanding. 

Your personality:
- Warm, supportive, and genuinely caring
- Never judgmental about incomplete tasks or disorganization
- Celebrates small wins enthusiastically
- Uses gentle accountability, not shame
- Understands ADHD challenges like executive dysfunction, time blindness, and overwhelm

When responding to users:
1. Parse their input for task-related requests
2. Provide encouragement and validation
3. Help break down overwhelming tasks into smaller steps
4. Suggest task priorities based on importance and urgency
5. Offer gentle reminders without being pushy
6. Celebrate completions with genuine enthusiasm

For task management, you can suggest:
- Adding new tasks (return as JSON with action: "add")
- Marking tasks complete (return as JSON with action: "complete")
- Updating task priority (return as JSON with action: "update")
- Breaking down complex tasks into subtasks

Always respond with warmth and understanding. Remember that your user may be struggling with focus, motivation, or feeling overwhelmed. Your job is to be their supportive companion, not their critic.`;

interface ChatRequest {
  message: string;
  tasks: Task[];
  context?: string;
}

interface ChatResponse {
  message: string;
  suggestions?: {
    action: 'add' | 'complete' | 'update' | 'break_down';
    tasks?: Partial<Task>[];
    taskIds?: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message, tasks, context }: ChatRequest = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'No message provided' },
        { status: 400 }
      );
    }

    if (!openai || !process.env.OPENAI_API_KEY) {
      return NextResponse.json(createMockResponse(message, tasks));
    }

    const tasksContext = tasks.length > 0 
      ? `\n\nCurrent tasks:\n${tasks.map(t => 
          `- [${t.completed ? 'x' : ' '}] ${t.text} (${t.priority} priority)`
        ).join('\n')}`
      : '\n\nNo current tasks.';

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { 
          role: 'user', 
          content: `${message}${tasksContext}${context ? `\n\nAdditional context: ${context}` : ''}` 
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiMessage = response.choices[0].message.content || '';
    
    const result = parseAIResponse(aiMessage);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Chat error:', error);
    
    return NextResponse.json(
      { 
        message: "I'm having a little trouble connecting right now, but I'm still here to help! Try adding a task manually, and remember - you're doing great just by being here! 💪",
        suggestions: undefined
      },
      { status: 200 }
    );
  }
}

function parseAIResponse(aiMessage: string): ChatResponse {
  try {
    const jsonMatch = aiMessage.match(/```json\n?([\s\S]*?)\n?```/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[1];
      const parsed = JSON.parse(jsonStr);
      
      const textWithoutJson = aiMessage.replace(/```json[\s\S]*?```/, '').trim();
      
      return {
        message: textWithoutJson || parsed.message || aiMessage,
        suggestions: parsed.suggestions || parsed
      };
    }
    
    return {
      message: aiMessage,
      suggestions: undefined
    };
  } catch {
    return {
      message: aiMessage,
      suggestions: undefined
    };
  }
}

function createMockResponse(message: string, tasks: Task[]): ChatResponse {
  const lowerMessage = message.toLowerCase();
  
  const responses = [
    {
      trigger: ['overwhelmed', 'stressed', 'anxious', 'too much'],
      message: "I hear you - feeling overwhelmed is totally valid! Let's take this one tiny step at a time. What's the ONE smallest thing you could do right now? Even just 2 minutes counts! 🌟"
    },
    {
      trigger: ['done', 'completed', 'finished'],
      message: "AMAZING! 🎉 You did it! Seriously, completing tasks is huge and you should feel proud! Every single thing you check off is a win. What would feel good to tackle next?"
    },
    {
      trigger: ['help', 'what should', 'priority'],
      message: "Let me help you figure out what to focus on! Looking at your tasks, I'd suggest starting with anything marked 'urgent' first, then 'important' tasks. Remember: you don't have to do everything today! What feels most manageable right now?"
    },
    {
      trigger: ['add', 'new task', 'need to'],
      message: "Got it! I'll help you add that to your list. Breaking things down into smaller pieces makes everything more manageable. You're doing great by planning ahead! 💪",
      suggestions: {
        action: 'add' as const,
        tasks: [
          {
            text: message.replace(/add|new task|need to/gi, '').trim(),
            priority: 'medium' as const,
            completed: false
          }
        ]
      }
    }
  ];

  const activeTasks = tasks.filter(t => !t.completed);
  const highPriorityCount = activeTasks.filter(t => t.priority === 'high').length;
  
  if (highPriorityCount > 3) {
    return {
      message: "Hey, I notice you have several urgent tasks. That can feel overwhelming! Would you like to pick just ONE to focus on for the next 25 minutes? Sometimes starting is the hardest part, and you've already done that by being here! 🌈"
    };
  }

  for (const response of responses) {
    if (response.trigger.some(t => lowerMessage.includes(t))) {
      return {
        message: response.message,
        suggestions: 'suggestions' in response ? response.suggestions : undefined
      };
    }
  }

  return {
    message: "You're doing great just by being here and thinking about your tasks! Remember, progress over perfection. What would feel good to work on right now? I'm here to help however you need! 🌟"
  };
}