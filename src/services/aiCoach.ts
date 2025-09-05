import { Task } from '@/hooks/useTasks';

export interface AICoachResponse {
  message: string;
  suggestions?: {
    action: 'add' | 'complete' | 'update' | 'break_down';
    tasks?: Partial<Task>[];
    taskIds?: string[];
  };
}

export class AICoachService {
  private static instance: AICoachService;
  
  static getInstance(): AICoachService {
    if (!AICoachService.instance) {
      AICoachService.instance = new AICoachService();
    }
    return AICoachService.instance;
  }

  async processVoiceInput(
    transcription: string, 
    currentTasks: Task[]
  ): Promise<AICoachResponse> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: transcription,
          tasks: currentTasks,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      return await response.json();
    } catch (error) {
      console.error('AI Coach error:', error);
      return this.getFallbackResponse(transcription, currentTasks);
    }
  }

  private getFallbackResponse(message: string, tasks: Task[]): AICoachResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('add') || lowerMessage.includes('new')) {
      const taskText = message
        .replace(/please|can you|could you|add|new|task|todo/gi, '')
        .trim();
      
      if (taskText) {
        return {
          message: "I'll add that to your list! Remember, you're doing great by planning ahead! 🌟",
          suggestions: {
            action: 'add',
            tasks: [{
              text: taskText,
              priority: this.extractPriority(message),
              completed: false
            }]
          }
        };
      }
    }

    if (lowerMessage.includes('done') || lowerMessage.includes('complete')) {
      return {
        message: "Fantastic work! 🎉 Every completed task is a victory! What would you like to tackle next?"
      };
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('what should')) {
      const urgentTasks = tasks.filter(t => !t.completed && t.priority === 'high');
      if (urgentTasks.length > 0) {
        return {
          message: `I see you have ${urgentTasks.length} urgent task${urgentTasks.length > 1 ? 's' : ''}. Let's start with one of those - even 5 minutes of progress counts! You've got this! 💪`
        };
      }
    }

    return {
      message: "I'm here to help! You can tell me about tasks you want to add, or just let me know how you're feeling. Remember, every small step forward is progress! 🌈"
    };
  }

  private extractPriority(message: string): Task['priority'] {
    const lower = message.toLowerCase();
    if (lower.includes('urgent') || lower.includes('asap') || lower.includes('immediately')) {
      return 'high';
    }
    if (lower.includes('important') || lower.includes('soon')) {
      return 'medium';
    }
    if (lower.includes('whenever') || lower.includes('eventually') || lower.includes('someday')) {
      return 'low';
    }
    return 'medium';
  }

  generateEncouragement(): string {
    const encouragements = [
      "You're doing amazing! Every small step counts! 🌟",
      "Remember: progress over perfection! You've got this! 💪",
      "Taking breaks is productive too. Be kind to yourself! 🌈",
      "You showed up today, and that's what matters! 🎯",
      "Small wins add up to big victories! Keep going! ✨",
      "Your effort is visible and valuable! 🌱",
      "It's okay to go at your own pace. You're doing great! 🦋",
      "Every task you complete is a celebration! 🎉",
    ];
    
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  }

  analyzeTaskLoad(tasks: Task[]): string {
    const active = tasks.filter(t => !t.completed);
    const urgent = active.filter(t => t.priority === 'high');
    
    if (active.length === 0) {
      return "Your task list is clear! Time to celebrate or add what's on your mind! 🎊";
    }
    
    if (urgent.length > 5) {
      return "I notice lots of urgent tasks. Let's pick just 2-3 to focus on today. You don't have to do everything at once! 🤗";
    }
    
    if (active.length > 10) {
      return "That's quite a list! Remember, it's okay to move some tasks to tomorrow. What feels most important right now? 🌟";
    }
    
    return `You have ${active.length} task${active.length === 1 ? '' : 's'} to work with. You're managing your workload well! 👏`;
  }
}