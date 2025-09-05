export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  createdAt: Date;
  lastActiveAt: Date;
  
  // ADHD & Neurodivergent Profile
  adhdType?: 'inattentive' | 'hyperactive' | 'combined' | 'other';
  energyPatterns: EnergyPattern[];
  workingMemoryStrength: 1 | 2 | 3 | 4 | 5;
  focusStyle: 'short-burst' | 'deep-dive' | 'pomodoro' | 'flexible';
  motivationTriggers: string[];
  stressIndicators: string[];
  
  // Learning Data
  completedTasks: number;
  totalSessions: number;
  averageSessionLength: number;
  productivityPatterns: ProductivityPattern[];
  learningInsights: LearningInsight[];
  
  // Preferences
  preferences: UserPreferences;
  customizations: UserCustomizations;
  
  // Behavior tracking
  behaviorPatterns?: {
    lastEnergyCheck?: Date | string;
    lastBreakTime?: Date | string;
    energyLevels: Array<{ timestamp: Date | string; energy: number }>;
    taskCompletions?: Array<{ timestamp: Date | string; taskId: string }>;
    habitStreaks?: Record<string, number>;
  };
}

export interface EnergyPattern {
  timeOfDay: string; // '09:00'
  energyLevel: 1 | 2 | 3 | 4 | 5;
  focusQuality: 1 | 2 | 3 | 4 | 5;
  taskTypes: string[]; // What works best at this time
  confidence: number; // 0-1, how confident we are in this data
}

export interface ProductivityPattern {
  pattern: string;
  description: string;
  confidence: number;
  impact: 'positive' | 'negative' | 'neutral';
  examples: string[];
  recommendations: string[];
}

export interface LearningInsight {
  id: string;
  type: 'productivity' | 'energy' | 'focus' | 'motivation' | 'stress';
  title: string;
  description: string;
  confidence: number;
  discoveredAt: Date;
  actionable: boolean;
  applied: boolean;
}

export interface UserPreferences {
  // Interface Preferences
  theme: 'light' | 'dark' | 'auto' | 'high-contrast' | 'warm' | 'cool';
  colorScheme: 'default' | 'calm' | 'energizing' | 'focus' | 'custom';
  reducedMotion: boolean;
  fontScale: 0.8 | 0.9 | 1.0 | 1.1 | 1.2 | 1.3 | 1.4;
  compactMode: boolean;
  
  // Productivity Preferences
  defaultTaskPriority: 'high' | 'medium' | 'low';
  autoBreakReminders: boolean;
  breakReminders?: boolean;  // Alias for autoBreakReminders
  preferredEnergyLevel?: number; // 1-5 scale, user's typical energy level
  gentleNudges: boolean;
  celebrationStyle: 'enthusiastic' | 'calm' | 'minimal';
  
  // AI Coach Preferences
  coachingStyle: 'supportive' | 'direct' | 'gentle' | 'motivating' | 'analytical';
  voiceFeedback: boolean;
  proactiveCoaching: boolean;
  learningMode: boolean; // Whether AI should learn from user patterns
  
  // Notification Preferences
  enableNotifications: boolean;
  quietHours: { start: string; end: string };
  notificationFrequency: 'minimal' | 'standard' | 'frequent';
  
  // Privacy Preferences
  dataCollection: 'full' | 'essential' | 'minimal';
  shareAnalytics: boolean;
  localStorageOnly: boolean;
}

export interface UserCustomizations {
  // Visual Customizations
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    priorityHigh: string;
    priorityMedium: string;
    priorityLow: string;
  };
  
  // Workspace Customizations
  dashboardLayout: 'default' | 'minimal' | 'detailed' | 'focus';
  defaultView: 'today' | 'upcoming' | 'all' | 'energy-based';
  taskGrouping: 'priority' | 'category' | 'energy' | 'time' | 'none';
  
  // AI Behavior Customizations
  coachPersonality: string;
  customPrompts: Record<string, string>;
  learningPreferences: {
    trackProductivityPatterns: boolean;
    trackEnergyLevels: boolean;
    trackMoodCorrelations: boolean;
    trackTimeEstimations: boolean;
  };
  
  // Quick Actions
  customVoiceCommands: Record<string, string>;
  quickActionButtons: string[];
  customCategories: string[];
}

export interface UserBehaviorData {
  // Session Data
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  tasksCompleted: number;
  tasksCreated: number;
  voiceInteractions: number;
  
  // Interaction Patterns
  mostActiveHours: number[];
  averageTaskCompletionTime: Record<string, number>; // by priority
  procrastinationIndicators: string[];
  flowStateIndicators: string[];
  
  // Context Data
  dayOfWeek: number;
  energyLevelReported?: 1 | 2 | 3 | 4 | 5;
  stressLevelReported?: 1 | 2 | 3 | 4 | 5;
  moodReported?: string;
  environmentNotes?: string;
}