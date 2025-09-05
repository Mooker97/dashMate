'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProfile, UserPreferences, UserCustomizations, UserBehaviorData, EnergyPattern, ProductivityPattern, LearningInsight } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEYS = {
  PROFILE: 'dashmate_user_profile',
  BEHAVIOR: 'dashmate_user_behavior',
  SESSIONS: 'dashmate_user_sessions'
};

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'auto',
  colorScheme: 'default',
  reducedMotion: false,
  fontScale: 1.0,
  compactMode: false,
  defaultTaskPriority: 'medium',
  autoBreakReminders: true,
  gentleNudges: true,
  celebrationStyle: 'enthusiastic',
  coachingStyle: 'supportive',
  voiceFeedback: true,
  proactiveCoaching: true,
  learningMode: true,
  enableNotifications: true,
  quietHours: { start: '22:00', end: '08:00' },
  notificationFrequency: 'standard',
  dataCollection: 'full',
  shareAnalytics: false,
  localStorageOnly: true
};

const DEFAULT_CUSTOMIZATIONS: UserCustomizations = {
  customColors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    priorityHigh: '#ef4444',
    priorityMedium: '#f59e0b',
    priorityLow: '#10b981'
  },
  dashboardLayout: 'default',
  defaultView: 'today',
  taskGrouping: 'priority',
  coachPersonality: 'supportive',
  customPrompts: {},
  learningPreferences: {
    trackProductivityPatterns: true,
    trackEnergyLevels: true,
    trackMoodCorrelations: true,
    trackTimeEstimations: true
  },
  customVoiceCommands: {},
  quickActionButtons: ['Add Task', 'Take Break', 'Review Day'],
  customCategories: ['Work', 'Personal', 'Health', 'Learning']
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [behaviorData, setBehaviorData] = useState<UserBehaviorData[]>([]);
  const [currentSession, setCurrentSession] = useState<UserBehaviorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize profile
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile({
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          lastActiveAt: new Date(parsed.lastActiveAt)
        });
      } catch (error) {
        console.error('Error parsing stored profile:', error);
        createDefaultProfile();
      }
    } else {
      createDefaultProfile();
    }

    const behaviorStored = localStorage.getItem(STORAGE_KEYS.BEHAVIOR);
    if (behaviorStored) {
      try {
        const parsed = JSON.parse(behaviorStored);
        setBehaviorData(parsed.map((b: any) => ({
          ...b,
          startTime: new Date(b.startTime),
          endTime: b.endTime ? new Date(b.endTime) : undefined
        })));
      } catch (error) {
        console.error('Error parsing behavior data:', error);
      }
    }

    setIsLoading(false);
    startSession();
  }, []);

  const createDefaultProfile = () => {
    const newProfile: UserProfile = {
      id: uuidv4(),
      createdAt: new Date(),
      lastActiveAt: new Date(),
      energyPatterns: [],
      workingMemoryStrength: 3,
      focusStyle: 'flexible',
      motivationTriggers: [],
      stressIndicators: [],
      completedTasks: 0,
      totalSessions: 0,
      averageSessionLength: 0,
      productivityPatterns: [],
      learningInsights: [],
      preferences: DEFAULT_PREFERENCES,
      customizations: DEFAULT_CUSTOMIZATIONS
    };
    setProfile(newProfile);
  };

  // Save profile to localStorage
  const saveProfile = useCallback((updatedProfile: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
  }, []);

  // Update preferences
  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    if (!profile) return;
    
    const updatedProfile = {
      ...profile,
      preferences: { ...profile.preferences, ...updates },
      lastActiveAt: new Date()
    };
    
    saveProfile(updatedProfile);
  }, [profile, saveProfile]);

  // Update customizations
  const updateCustomizations = useCallback((updates: Partial<UserCustomizations>) => {
    if (!profile) return;
    
    const updatedProfile = {
      ...profile,
      customizations: { ...profile.customizations, ...updates },
      lastActiveAt: new Date()
    };
    
    saveProfile(updatedProfile);
  }, [profile, saveProfile]);

  // Track user behavior
  const trackBehavior = useCallback((behaviorType: string, data: any) => {
    if (!profile?.preferences.learningMode) return;
    
    const now = new Date();
    const behavior = {
      type: behaviorType,
      timestamp: now,
      data,
      sessionId: currentSession?.sessionId || 'unknown'
    };

    // Add to current session if exists
    if (currentSession) {
      setCurrentSession(prev => prev ? {
        ...prev,
        [`${behaviorType}Count`]: (prev[`${behaviorType}Count` as keyof UserBehaviorData] as number || 0) + 1
      } : null);
    }
    
    // Store behavior for analysis
    setBehaviorData(prev => [...prev.slice(-1000), behavior] as UserBehaviorData[]); // Keep last 1000 entries
  }, [profile, currentSession]);

  // Start new session
  const startSession = () => {
    const session: UserBehaviorData = {
      sessionId: uuidv4(),
      startTime: new Date(),
      tasksCompleted: 0,
      tasksCreated: 0,
      voiceInteractions: 0,
      mostActiveHours: [],
      averageTaskCompletionTime: {},
      procrastinationIndicators: [],
      flowStateIndicators: [],
      dayOfWeek: new Date().getDay()
    };
    
    setCurrentSession(session);
  };

  // End current session
  const endSession = () => {
    if (!currentSession) return;
    
    const endedSession = {
      ...currentSession,
      endTime: new Date()
    };
    
    setBehaviorData(prev => [...prev, endedSession]);
    setCurrentSession(null);
    
    if (profile) {
      const updatedProfile = {
        ...profile,
        totalSessions: profile.totalSessions + 1,
        lastActiveAt: new Date()
      };
      saveProfile(updatedProfile);
    }
  };

  // Add energy pattern
  const addEnergyPattern = useCallback((pattern: Omit<EnergyPattern, 'confidence'>) => {
    if (!profile) return;
    
    const newPattern = { ...pattern, confidence: 0.5 };
    const updatedProfile = {
      ...profile,
      energyPatterns: [...profile.energyPatterns, newPattern]
    };
    
    saveProfile(updatedProfile);
  }, [profile, saveProfile]);

  // Add learning insight
  const addLearningInsight = useCallback((insight: Omit<LearningInsight, 'id' | 'discoveredAt'>) => {
    if (!profile) return;
    
    const newInsight: LearningInsight = {
      ...insight,
      id: uuidv4(),
      discoveredAt: new Date()
    };
    
    const updatedProfile = {
      ...profile,
      learningInsights: [...profile.learningInsights, newInsight].slice(-50) // Keep last 50 insights
    };
    
    saveProfile(updatedProfile);
  }, [profile, saveProfile]);

  // Analyze productivity patterns
  const analyzeProductivityPatterns = useCallback(() => {
    if (!profile || behaviorData.length < 10) return [];
    
    const patterns: ProductivityPattern[] = [];
    
    // Analyze time-based patterns
    const hourlyProductivity = new Map<number, { completed: number, created: number }>();
    behaviorData.forEach(session => {
      const hour = session.startTime.getHours();
      const current = hourlyProductivity.get(hour) || { completed: 0, created: 0 };
      hourlyProductivity.set(hour, {
        completed: current.completed + session.tasksCompleted,
        created: current.created + session.tasksCreated
      });
    });
    
    // Find peak productivity hours
    const peakHour = Array.from(hourlyProductivity.entries())
      .sort(([,a], [,b]) => (b.completed / Math.max(b.created, 1)) - (a.completed / Math.max(a.created, 1)))[0];
    
    if (peakHour) {
      patterns.push({
        pattern: 'peak_productivity_hour',
        description: `You're most productive around ${peakHour[0]}:00`,
        confidence: 0.8,
        impact: 'positive',
        examples: [`${peakHour[1].completed} tasks completed during ${peakHour[0]}:00 hour on average`],
        recommendations: ['Schedule important tasks during this time', 'Block this time for deep work']
      });
    }
    
    return patterns;
  }, [profile, behaviorData]);

  // Get personalized recommendations
  const getPersonalizedRecommendations = useCallback(() => {
    if (!profile) return [];
    
    const recommendations = [];
    
    // Based on energy patterns
    if (profile.energyPatterns.length > 0) {
      const highEnergyTimes = profile.energyPatterns
        .filter(p => p.energyLevel >= 4)
        .map(p => p.timeOfDay);
      
      if (highEnergyTimes.length > 0) {
        recommendations.push({
          type: 'energy',
          title: 'Optimize Your High-Energy Times',
          description: `You have peak energy at ${highEnergyTimes.join(', ')}. Schedule challenging tasks during these periods.`,
          actionable: true
        });
      }
    }
    
    // Based on learning insights
    profile.learningInsights.forEach(insight => {
      if (insight.actionable && !insight.applied) {
        recommendations.push({
          type: insight.type,
          title: insight.title,
          description: insight.description,
          actionable: true
        });
      }
    });
    
    return recommendations;
  }, [profile]);

  // Save all data
  useEffect(() => {
    if (behaviorData.length > 0) {
      localStorage.setItem(STORAGE_KEYS.BEHAVIOR, JSON.stringify(behaviorData));
    }
  }, [behaviorData]);

  return {
    profile,
    behaviorData,
    currentSession,
    isLoading,
    
    // Actions
    updatePreferences,
    updateCustomizations,
    trackBehavior,
    startSession,
    endSession,
    addEnergyPattern,
    addLearningInsight,
    
    // Analysis
    analyzeProductivityPatterns,
    getPersonalizedRecommendations,
    
    // Utilities
    saveProfile
  };
}