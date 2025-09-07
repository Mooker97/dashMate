'use client';

import { useState, useEffect } from 'react';
import { MicrophoneButton } from '@/components/MicrophoneButton';
import { TaskList } from '@/components/TaskList';
import { Settings } from '@/components/Settings';
import { InsightsPanel } from '@/components/InsightsPanel';
import { FocusSession } from '@/components/FocusSession';
import { HabitTracker } from '@/components/HabitTracker';
import { EnergyTracker } from '@/components/EnergyTracker';
import { NotificationCenter } from '@/components/NotificationCenter';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ProductivityCoach } from '@/services/productivityCoach';
import './theme.css';
import { useTasks } from '@/hooks/useTasks';
import { useUserProfile } from '@/hooks/useUserProfile';
import { toast, Toaster } from 'sonner';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Heart, Target, Settings as SettingsIcon, BarChart3, Menu, X, Clock, Flame, Zap, Bell } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [aiMessage, setAiMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showFocusSession, setShowFocusSession] = useState(false);
  const [showHabitTracker, setShowHabitTracker] = useState(false);
  const [showEnergyTracker, setShowEnergyTracker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTaskForFocus, setSelectedTaskForFocus] = useState<{ id: string; text: string; priority: string } | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    updateTaskPriority
  } = useTasks();

  const {
    profile,
    updatePreferences,
    updateCustomizations,
    trackBehavior,
    getPersonalizedRecommendations,
    isLoading: profileLoading
  } = useUserProfile();

  const productivityCoach = ProductivityCoach.getInstance();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize productivity coach with user data
  useEffect(() => {
    if (profile) {
      productivityCoach.setUserProfile(profile);
    }
  }, [profile]);

  const handleTranscription = async (transcription: string) => {
    setIsProcessing(true);
    toast.info('Processing your request...', { duration: 2000 });

    try {
      // Track voice interaction
      trackBehavior('voice_interaction', { transcription, taskCount: tasks.length });
      
      const response = await productivityCoach.processInput(transcription, tasks, {
        currentTime: new Date(),
        recentTasks: tasks.slice(-5)
      });
      
      setAiMessage(response.message);
      toast.success(response.message, { duration: 4000 });

      if (response.suggestions) {
        const { action, tasks: suggestedTasks, taskIds } = response.suggestions;

        switch (action) {
          case 'add':
            if (suggestedTasks) {
              for (const task of suggestedTasks) {
                await addTask(
                  task.text || 'New task',
                  task.priority || 'medium'
                );
              }
              toast.success('Task(s) added! You&apos;re doing great! 🌟', { duration: 3000 });
            }
            break;

          case 'complete':
            if (taskIds) {
              for (const id of taskIds) {
                toggleTask(id);
              }
              toast.success('Amazing work! Task completed! 🎉', { duration: 3000 });
            }
            break;

          case 'update':
            if (taskIds && suggestedTasks && suggestedTasks[0]) {
              const updates = suggestedTasks[0];
              for (const id of taskIds) {
                updateTask(id, updates);
              }
              toast.info('Task updated successfully!', { duration: 2000 });
            }
            break;
        }
      }
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast.error('I had trouble understanding that. Could you try again?', { duration: 3000 });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceError = (error: string) => {
    toast.error(error, { duration: 3000 });
  };

  const handleStartFocusSession = (task?: { id: string; text: string; priority: string }) => {
    if (task) {
      setSelectedTaskForFocus({
        id: task.id,
        text: task.text,
        priority: task.priority
      });
    }
    setShowFocusSession(true);
    trackBehavior('focus_session_started', { taskId: task?.id });
  };

  const handleSessionComplete = (sessionData: { tasksCompleted: number; focusScore: number }) => {
    trackBehavior('focus_session_completed', sessionData);
    toast.success(`🎉 Great focus session! You completed ${sessionData.tasksCompleted} tasks with a focus score of ${sessionData.focusScore}!`, { duration: 5000 });
  };

  const handleEnergySubmit = (energy: number, mood?: string, notes?: string) => {
    trackBehavior('energy_checkin', { energy, mood, notes, timestamp: new Date().toISOString() });
    toast.success(`Energy level recorded: ${energy}/5 ${mood ? `(${mood})` : ''}`, { duration: 3000 });
  };

  const handleHabitUpdate = (habitData: Record<string, unknown>) => {
    trackBehavior('habit_update', habitData);
    toast.success('Habit progress updated! Keep building those positive patterns! 🌟', { duration: 3000 });
  };

  const handleAddTask = async (text: string, priority: 'high' | 'medium' | 'low') => {
    await addTask(text, priority);
    toast.success('Task added! Great job planning ahead! 💪', { duration: 2000 });
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    const wasCompleted = task?.completed;
    
    toggleTask(id);
    
    // Track task completion
    if (task && !wasCompleted) {
      trackBehavior('task_completed', { 
        taskId: id, 
        priority: task.priority, 
        timeToComplete: Date.now() - new Date(task.created_at).getTime() 
      });
      
      const encouragements = [
        "🎉 Amazing work! That's the energy I love to see!",
        "✨ Another victory! You're building incredible momentum!",
        "🌟 Fantastic! Your future self is thanking you right now!",
        "🚀 Yes! That's how it's done! Keep this flow going!",
        "💪 Outstanding! You're proving what's possible when you focus!"
      ];
      
      const message = encouragements[Math.floor(Math.random() * encouragements.length)];
      toast.success(message, { duration: 3000 });
    }
  };

  if (!mounted || loading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your personalized coach...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider customizations={profile?.customizations || { 
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
      }}>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'white',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
          },
          className: 'sonner-toast',
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 pointer-events-none" />
        
        <div className="relative z-10">
          <nav className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-100" role="navigation" aria-label="Main navigation">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">dashMate</h1>
                {profile?.name && (
                  <p className="text-xs text-gray-500">Welcome back, {profile.name}!</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline text-xs text-gray-500">ADHD-Friendly AI Coach</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
              
              {/* Action Buttons */}
              <button
                onClick={() => setShowNotifications(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative focusable touch-target"
                title="Smart Notifications"
                aria-label="Open smart notifications panel"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {/* Notification indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
              </button>
              
              <button
                onClick={() => setShowEnergyTracker(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors focusable touch-target"
                title="Energy Check-in"
                aria-label="Open energy tracking check-in"
              >
                <Zap className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setShowHabitTracker(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors focusable touch-target"
                title="Habit Tracker"
                aria-label="Open habit tracking panel"
              >
                <Flame className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => handleStartFocusSession()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors focusable touch-target"
                title="Start Focus Session"
                aria-label="Start a new focus session"
              >
                <Clock className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setShowInsights(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors focusable touch-target"
                title="View Analytics"
                aria-label="View productivity analytics and insights"
              >
                <BarChart3 className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors focusable touch-target"
                title="Settings"
                aria-label="Open application settings"
              >
                <SettingsIcon className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden focusable touch-target"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>

          <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl" role="main" aria-label="Task management dashboard">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 welcome-text"
              role="banner"
            >
              <h2 className="text-4xl font-light text-gray-800 mb-3">
                Welcome back! Ready to
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"> shine today?</span>
              </h2>
              <p className="text-gray-600 text-lg">
                I&apos;m here to help you focus, flow, and flourish. Let&apos;s tackle your tasks together! 🌟
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center mb-12"
              role="region"
              aria-label="Voice interaction controls"
            >
              <MicrophoneButton
                onTranscription={handleTranscription}
                onError={handleVoiceError}
                size="xl"
              />
              
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-center"
                >
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-600">AI Coach is thinking...</span>
                  </div>
                </motion.div>
              )}

              {aiMessage && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 max-w-md"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{aiMessage}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-center"
              >
                <p className="text-red-600 text-sm">{error}</p>
                <p className="text-red-500 text-xs mt-1">Don&apos;t worry! Your tasks are saved locally. 💪</p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
              role="region"
              aria-label="Task management section"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-gray-600" />
                  <h3 className="text-xl font-medium text-gray-800">Your Tasks</h3>
                </div>
                <span className="text-sm text-gray-500">
                  {tasks.length === 0 
                    ? "Ready to start your day! 🌟" 
                    : `${tasks.filter(t => !t.completed).length} active tasks`
                  }
                </span>
              </div>

              <TaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={deleteTask}
                onUpdatePriority={updateTaskPriority}
                onUpdateTask={updateTask}
                onAddTask={handleAddTask}
                loading={loading}
              />
            </motion.div>

            {tasks.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
                  <Sparkles className="w-12 h-12 text-purple-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Your canvas is clear!
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Press the microphone and tell me what you&apos;d like to accomplish today. 
                  I&apos;m here to help you break it down and stay motivated! 🚀
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-xs text-gray-400">
                Remember: Progress over perfection. You&apos;re doing amazing! 💜
              </p>
              
              {/* Show personalized recommendations if available */}
              {profile && (
                <div className="mt-4">
                  <button
                    onClick={() => {
                      const recommendations = getPersonalizedRecommendations();
                      if (recommendations.length > 0) {
                        toast.info(recommendations[0].description, { duration: 5000 });
                      }
                    }}
                    className="text-xs text-blue-500 hover:text-blue-600 underline"
                  >
                    💡 Get personalized tip
                  </button>
                </div>
              )}
            </motion.div>
          </main>
        </div>
        
        {/* Settings Modal */}
        {showSettings && profile && (
          <Settings
            preferences={profile.preferences}
            customizations={profile.customizations}
            onPreferencesChange={updatePreferences}
            onCustomizationsChange={updateCustomizations}
            onClose={() => setShowSettings(false)}
          />
        )}
        
        {/* Analytics/Insights Panel */}
        {showInsights && profile && (
          <InsightsPanel
            profile={profile}
            tasks={tasks}
            isVisible={showInsights}
            onClose={() => setShowInsights(false)}
          />
        )}

        {/* Focus Session Modal */}
        <FocusSession
          isVisible={showFocusSession}
          onClose={() => {
            setShowFocusSession(false);
            setSelectedTaskForFocus(undefined);
          }}
          onSessionComplete={handleSessionComplete}
          selectedTask={selectedTaskForFocus}
        />

        {/* Habit Tracker Modal */}
        <HabitTracker
          isVisible={showHabitTracker}
          onClose={() => setShowHabitTracker(false)}
          onHabitUpdate={handleHabitUpdate}
        />

        {/* Energy Tracker Modal */}
        <EnergyTracker
          isVisible={showEnergyTracker}
          onClose={() => setShowEnergyTracker(false)}
          onEnergySubmit={handleEnergySubmit}
          currentEnergy={profile?.preferences.preferredEnergyLevel}
        />

        {/* Smart Notifications Center */}
        <NotificationCenter
          isVisible={showNotifications}
          onClose={() => setShowNotifications(false)}
          onTriggerEnergyCheck={() => {
            setShowNotifications(false);
            setShowEnergyTracker(true);
          }}
          onTriggerBreak={() => {
            setShowNotifications(false);
            handleStartFocusSession();
          }}
          onTriggerHabits={() => {
            setShowNotifications(false);
            setShowHabitTracker(true);
          }}
        />
      </div>
    </ThemeProvider>
  );
}