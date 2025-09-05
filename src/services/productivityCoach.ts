import { Task } from '@/hooks/useTasks';
import { UserProfile, UserBehaviorData, LearningInsight, ProductivityPattern } from '@/types/user';

interface CoachingContext {
  currentTime: Date;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek: string;
  recentTasks: Task[];
  userEnergy?: 1 | 2 | 3 | 4 | 5;
  userMood?: string;
  lastSessionData?: UserBehaviorData;
}

interface CoachResponse {
  message: string;
  tone: 'encouraging' | 'supportive' | 'motivating' | 'gentle' | 'analytical';
  suggestions?: {
    action: 'add' | 'complete' | 'update' | 'break' | 'focus' | 'prioritize';
    tasks?: Partial<Task>[];
    taskIds?: string[];
    metadata?: Record<string, any>;
  };
  insights?: LearningInsight[];
  nextCheckIn?: Date;
}

export class ProductivityCoach {
  private static instance: ProductivityCoach;
  private userProfile: UserProfile | null = null;
  private behaviorHistory: UserBehaviorData[] = [];

  static getInstance(): ProductivityCoach {
    if (!ProductivityCoach.instance) {
      ProductivityCoach.instance = new ProductivityCoach();
    }
    return ProductivityCoach.instance;
  }

  setUserProfile(profile: UserProfile) {
    this.userProfile = profile;
  }

  setBehaviorHistory(history: UserBehaviorData[]) {
    this.behaviorHistory = history;
  }

  async processInput(
    input: string, 
    tasks: Task[], 
    context: Partial<CoachingContext> = {}
  ): Promise<CoachResponse> {
    const fullContext = this.buildContext(tasks, context);
    
    // Analyze input for intent
    const intent = this.analyzeIntent(input);
    
    // Generate personalized response based on user profile and history
    const response = await this.generateResponse(input, intent, tasks, fullContext);
    
    // Learn from this interaction
    this.learnFromInteraction(input, intent, response, fullContext);
    
    return response;
  }

  private buildContext(tasks: Task[], context: Partial<CoachingContext>): CoachingContext {
    const now = new Date();
    const hour = now.getHours();
    
    let timeOfDay: CoachingContext['timeOfDay'];
    if (hour >= 5 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';

    return {
      currentTime: now,
      timeOfDay,
      dayOfWeek: now.toLocaleDateString('en', { weekday: 'long' }),
      recentTasks: tasks.slice(-10),
      ...context
    };
  }

  private analyzeIntent(input: string): string {
    const lower = input.toLowerCase();
    
    // Task-related intents
    if (lower.match(/\b(add|create|new)\b.*\b(task|todo)\b/)) return 'add_task';
    if (lower.match(/\b(done|finished|completed)\b/)) return 'complete_task';
    if (lower.match(/\b(delete|remove|cancel)\b/)) return 'delete_task';
    if (lower.match(/\b(priority|important|urgent)\b/)) return 'prioritize';
    
    // Emotional/state intents
    if (lower.match(/\b(overwhelmed|stressed|anxious|stuck)\b/)) return 'feeling_overwhelmed';
    if (lower.match(/\b(tired|exhausted|drained|low.energy)\b/)) return 'low_energy';
    if (lower.match(/\b(motivated|energized|ready|focused)\b/)) return 'high_energy';
    if (lower.match(/\b(distracted|unfocused|scattered)\b/)) return 'distracted';
    
    // Productivity intents
    if (lower.match(/\b(break|rest|pause)\b/)) return 'need_break';
    if (lower.match(/\b(focus|concentrate|deep.work)\b/)) return 'need_focus';
    if (lower.match(/\b(help|what|how|advice)\b/)) return 'need_guidance';
    if (lower.match(/\b(progress|review|summary)\b/)) return 'review_progress';
    
    // Time-related intents
    if (lower.match(/\b(time|when|schedule|plan)\b/)) return 'time_management';
    if (lower.match(/\b(later|tomorrow|next)\b/)) return 'defer_task';
    
    return 'general_chat';
  }

  private async generateResponse(
    input: string,
    intent: string,
    tasks: Task[],
    context: CoachingContext
  ): Promise<CoachResponse> {
    const coachingStyle = this.userProfile?.preferences.coachingStyle || 'supportive';
    const activeTasks = tasks.filter(t => !t.completed);
    const completedToday = tasks.filter(t => 
      t.completed && 
      new Date(t.updated_at).toDateString() === context.currentTime.toDateString()
    );

    // Get user's productivity patterns
    const patterns = this.getProductivityInsights();
    const energyInsight = this.getEnergyInsight(context);
    
    switch (intent) {
      case 'add_task':
        return this.handleAddTask(input, context, coachingStyle);
        
      case 'feeling_overwhelmed':
        return this.handleOverwhelm(activeTasks, context, coachingStyle);
        
      case 'low_energy':
        return this.handleLowEnergy(activeTasks, context, energyInsight, coachingStyle);
        
      case 'high_energy':
        return this.handleHighEnergy(activeTasks, context, energyInsight, coachingStyle);
        
      case 'need_focus':
        return this.handleFocusRequest(activeTasks, context, patterns, coachingStyle);
        
      case 'review_progress':
        return this.handleProgressReview(tasks, completedToday, context, coachingStyle);
        
      case 'time_management':
        return this.handleTimeManagement(activeTasks, context, patterns, coachingStyle);
        
      default:
        return this.handleGeneralChat(input, tasks, context, coachingStyle);
    }
  }

  private handleAddTask(
    input: string, 
    context: CoachingContext, 
    style: string
  ): CoachResponse {
    // Extract task details from natural language
    const taskText = this.extractTaskFromInput(input);
    const priority = this.inferPriority(input);
    const category = this.inferCategory(input);
    
    const messages = {
      supportive: "Great thinking ahead! I love how you're planning. Let me add that for you! 🌟",
      direct: "Got it. Adding that task to your list now.",
      gentle: "What a thoughtful addition. I'll add that for you with care.",
      motivating: "YES! That's the planning energy I love to see! Adding it now! 🚀",
      analytical: "Task identified and categorized. Adding to your workflow with optimal priority settings."
    };

    return {
      message: messages[style as keyof typeof messages] || messages.supportive,
      tone: style as CoachResponse['tone'],
      suggestions: {
        action: 'add',
        tasks: [{
          text: taskText,
          priority,
          category,
          completed: false
        }]
      }
    };
  }

  private handleOverwhelm(
    activeTasks: Task[], 
    context: CoachingContext, 
    style: string
  ): CoachResponse {
    const highPriorityCount = activeTasks.filter(t => t.priority === 'high').length;
    
    const messages = {
      supportive: `I hear you, and those feelings are completely valid. You have ${activeTasks.length} tasks, and that can feel like a lot. Let's break this down into just ONE tiny step. What feels most important right now? 💙`,
      
      gentle: `Take a deep breath. You're not alone in feeling this way. Looking at your ${activeTasks.length} tasks, let's pick just one small thing - even 5 minutes counts as progress. You're doing better than you think. 🤗`,
      
      direct: `${activeTasks.length} tasks total, ${highPriorityCount} high priority. Let's focus on one task for the next 15 minutes. Which one would move the needle most?`,
      
      motivating: `Hey, overwhelm is just your brain telling you that you CARE about getting things done! That's actually awesome! Out of these ${activeTasks.length} tasks, which ONE would make you feel most accomplished? Let's crush that one first! 💪`,
      
      analytical: `Task load analysis: ${activeTasks.length} active tasks detected. Recommendation: Single-task focus strategy. Highest ROI appears to be addressing ${highPriorityCount > 0 ? 'high-priority items first' : 'quick wins to build momentum'}.`
    };

    // Suggest the smallest, easiest task if available
    const easiestTask = activeTasks.find(t => 
      t.text.length < 50 && 
      !t.text.toLowerCase().includes('complex') &&
      !t.text.toLowerCase().includes('difficult')
    );

    return {
      message: messages[style as keyof typeof messages] || messages.supportive,
      tone: 'supportive',
      suggestions: easiestTask ? {
        action: 'prioritize',
        taskIds: [easiestTask.id],
        metadata: { reason: 'smallest_step' }
      } : undefined
    };
  }

  private handleLowEnergy(
    activeTasks: Task[], 
    context: CoachingContext,
    energyInsight: string,
    style: string
  ): CoachResponse {
    const lowEnergyTasks = activeTasks.filter(t => 
      t.priority === 'low' || 
      t.text.toLowerCase().includes('easy') ||
      t.text.toLowerCase().includes('simple')
    );

    const messages = {
      supportive: `Low energy days are totally normal and okay! ${energyInsight} Maybe try one of these easier tasks, or it's perfectly fine to rest. Your worth isn't measured by productivity! 🤗`,
      
      gentle: `Your energy is precious, and it's wise to honor where you're at today. ${energyInsight} Perhaps choose something gentle, or simply rest. Tomorrow is a new day. 🌙`,
      
      motivating: `Even champions have recovery days! ${energyInsight} How about we pick the smallest possible win? Sometimes tiny progress leads to surprising momentum! ⭐`,
      
      analytical: `Energy levels detected as sub-optimal. ${energyInsight} Recommended approach: Low-cognitive-load tasks or strategic rest period for future productivity gains.`
    };

    return {
      message: messages[style as keyof typeof messages] || messages.supportive,
      tone: 'gentle',
      suggestions: lowEnergyTasks.length > 0 ? {
        action: 'prioritize',
        taskIds: lowEnergyTasks.slice(0, 3).map(t => t.id),
        metadata: { reason: 'low_energy_match' }
      } : {
        action: 'break',
        metadata: { type: 'rest', duration: 30 }
      }
    };
  }

  private handleHighEnergy(
    activeTasks: Task[], 
    context: CoachingContext,
    energyInsight: string,
    style: string
  ): CoachResponse {
    const challengingTasks = activeTasks.filter(t => 
      t.priority === 'high' || 
      t.text.toLowerCase().includes('complex') ||
      t.text.toLowerCase().includes('important')
    );

    const messages = {
      supportive: `I can feel that energy! This is perfect timing! ${energyInsight} Let's channel this into something meaningful - which challenging task has been waiting for this exact moment? 🔥`,
      
      motivating: `NOW WE'RE TALKING! This energy is GOLD! ${energyInsight} Time to tackle something big! Which of your important tasks deserves this beautiful focus? Let's GO! 🚀`,
      
      analytical: `Optimal energy state detected. ${energyInsight} Maximum productivity window identified. Recommend targeting high-cognitive-load tasks for maximum ROI.`
    };

    return {
      message: messages[style as keyof typeof messages] || messages.supportive,
      tone: 'motivating',
      suggestions: challengingTasks.length > 0 ? {
        action: 'focus',
        taskIds: challengingTasks.slice(0, 1).map(t => t.id),
        metadata: { reason: 'high_energy_match', suggestedDuration: 45 }
      } : undefined
    };
  }

  private handleFocusRequest(
    activeTasks: Task[], 
    context: CoachingContext,
    patterns: ProductivityPattern[],
    style: string
  ): CoachResponse {
    const focusInsight = patterns.find(p => p.pattern === 'peak_productivity_hour');
    const timeAdvice = focusInsight ? `Your data shows you focus best around ${focusInsight.description}.` : '';

    const messages = {
      supportive: `Love that you're ready to focus! ${timeAdvice} Let's set up the perfect environment for deep work. What feels most important to tackle right now? 🎯`,
      
      direct: `Focus mode activated. ${timeAdvice} Select your target task and I'll help you maintain concentration.`,
      
      analytical: `Focus session initiated. ${timeAdvice} Recommend 45-minute blocks with 15-minute breaks for optimal cognitive performance.`
    };

    return {
      message: messages[style as keyof typeof messages] || messages.supportive,
      tone: 'motivating',
      suggestions: {
        action: 'focus',
        metadata: { 
          type: 'deep_work',
          duration: 45,
          insight: timeAdvice
        }
      }
    };
  }

  private handleTimeManagement(
    activeTasks: Task[], 
    context: CoachingContext, 
    patterns: ProductivityPattern[], 
    style: string
  ): CoachResponse {
    const highPriorityTasks = activeTasks.filter(t => t.priority === 'high');
    const message = highPriorityTasks.length > 0
      ? `You have ${highPriorityTasks.length} high-priority tasks. Let's tackle the most important one first to build momentum!`
      : `Great time to focus! What would you like to work on? I can help you break it down into manageable steps.`;
    
    return {
      message,
      suggestions: {
        action: 'focus',
        tips: [
          'Start with a 25-minute focus session',
          'Break large tasks into smaller steps',
          'Take regular breaks to maintain energy'
        ]
      }
    };
  }

  private handleProgressReview(
    allTasks: Task[], 
    completedToday: Task[], 
    context: CoachingContext,
    style: string
  ): CoachResponse {
    const totalTasks = allTasks.length;
    const completedCount = allTasks.filter(t => t.completed).length;
    const completionRate = Math.round((completedCount / totalTasks) * 100);

    const messages = {
      supportive: `You've completed ${completedToday.length} tasks today and ${completedCount} total! That's a ${completionRate}% completion rate - you're doing amazing! Every single task matters! 🌟`,
      
      motivating: `${completedToday.length} tasks CRUSHED today! ${completedCount} total victories! You're at ${completionRate}% - that's serious productivity energy! Keep this momentum! 🏆`,
      
      analytical: `Progress metrics: ${completedToday.length} tasks completed today. Overall completion rate: ${completionRate}%. Performance trajectory: ${completedToday.length > 3 ? 'above average' : 'steady progress'}.`,
      
      gentle: `Look at what you've accomplished: ${completedToday.length} things completed today. That's real progress, and you should feel proud. Every step forward matters. 🌱`
    };

    return {
      message: messages[style as keyof typeof messages] || messages.supportive,
      tone: 'encouraging',
      insights: [{
        type: 'productivity',
        title: 'Daily Progress Update',
        description: `Completed ${completedToday.length} tasks today with ${completionRate}% overall completion rate`,
        confidence: 0.9,
        actionable: completionRate < 50,
        applied: false
      }]
    };
  }

  private handleGeneralChat(
    input: string, 
    tasks: Task[], 
    context: CoachingContext, 
    style: string
  ): CoachResponse {
    const activeTasks = tasks.filter(t => !t.completed);
    const encouragements = {
      supportive: [
        "You're doing great just by being here! What would feel good to work on?",
        "I believe in you! Small steps lead to big victories. What's on your mind?",
        "You've got this! Every moment of planning is already progress. How can I help?"
      ],
      motivating: [
        "Ready to make things happen? I can feel your potential! What's our target?",
        "Let's turn thoughts into ACTION! What victory are we going for today?",
        "Your future self is going to THANK you for this moment! What's the move?"
      ],
      gentle: [
        "I'm here with you, whatever pace feels right today. What would help?",
        "Be kind to yourself. Progress comes in all sizes. What feels manageable?",
        "Take your time. There's wisdom in pausing to think. How can I support you?"
      ]
    };

    const styleMessages = encouragements[style as keyof typeof encouragements] || encouragements.supportive;
    const message = styleMessages[Math.floor(Math.random() * styleMessages.length)];

    return {
      message: `${message} ${activeTasks.length > 0 ? `You have ${activeTasks.length} active tasks when you're ready! 💪` : ''}`,
      tone: style as CoachResponse['tone']
    };
  }

  // Utility methods
  private extractTaskFromInput(input: string): string {
    // Remove common prefixes and clean up
    return input
      .replace(/^(add|create|new|make|do|i need to|please|can you)\s+/i, '')
      .replace(/\b(task|todo|item)\b/gi, '')
      .trim();
  }

  private inferPriority(input: string): 'high' | 'medium' | 'low' {
    const lower = input.toLowerCase();
    if (lower.match(/\b(urgent|asap|important|critical|must|deadline|now)\b/)) return 'high';
    if (lower.match(/\b(soon|should|need to|today)\b/)) return 'medium';
    if (lower.match(/\b(later|sometime|eventually|maybe|when|if)\b/)) return 'low';
    return 'medium';
  }

  private inferCategory(input: string): string {
    const lower = input.toLowerCase();
    if (lower.match(/\b(work|job|office|meeting|email|project)\b/)) return 'Work';
    if (lower.match(/\b(health|exercise|doctor|gym|wellness)\b/)) return 'Health';
    if (lower.match(/\b(learn|study|read|course|skill)\b/)) return 'Learning';
    if (lower.match(/\b(family|friend|call|visit|social)\b/)) return 'Personal';
    if (lower.match(/\b(home|house|clean|cook|fix|repair)\b/)) return 'Home';
    return 'General';
  }

  private getProductivityInsights(): ProductivityPattern[] {
    // This would normally come from user behavior analysis
    return this.userProfile?.productivityPatterns || [];
  }

  private getEnergyInsight(context: CoachingContext): string {
    if (!this.userProfile?.energyPatterns.length) {
      return `Based on the time (${context.timeOfDay}), this could be a good moment to check in with your energy levels.`;
    }

    const currentHour = context.currentTime.getHours().toString().padStart(2, '0') + ':00';
    const energyPattern = this.userProfile.energyPatterns.find(p => p.timeOfDay === currentHour);
    
    if (energyPattern) {
      const energyDescription = {
        1: 'very low energy',
        2: 'low energy', 
        3: 'moderate energy',
        4: 'good energy',
        5: 'peak energy'
      }[energyPattern.energyLevel];
      
      return `Your patterns show you typically have ${energyDescription} around this time.`;
    }

    return '';
  }

  private learnFromInteraction(
    input: string,
    intent: string,
    response: CoachResponse,
    context: CoachingContext
  ) {
    // This would update user patterns and preferences based on the interaction
    // For now, we'll just log for future analysis
    console.log('Learning from interaction:', { input, intent, response: response.tone, context });
  }
}