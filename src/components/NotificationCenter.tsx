'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Clock, Zap, Target, Heart, CheckCircle, AlertTriangle } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface Notification {
  id: string;
  type: 'reminder' | 'encouragement' | 'energy_check' | 'break_reminder' | 'habit_reminder' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  actionable?: boolean;
  dismissible?: boolean;
}

interface NotificationCenterProps {
  isVisible: boolean;
  onClose: () => void;
  onTriggerEnergyCheck: () => void;
  onTriggerBreak: () => void;
  onTriggerHabits: () => void;
}

export function NotificationCenter({ 
  isVisible, 
  onClose, 
  onTriggerEnergyCheck, 
  onTriggerBreak, 
  onTriggerHabits 
}: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { profile, trackBehavior } = useUserProfile();

  // Generate smart notifications based on user patterns and preferences
  useEffect(() => {
    if (!profile || !isVisible) return;

    const now = new Date();
    const hour = now.getHours();
    const lastEnergyCheck = profile.behaviorPatterns?.lastEnergyCheck;
    const lastBreakTime = profile.behaviorPatterns?.lastBreakTime;

    const newNotifications: Notification[] = [];

    // Morning energy check reminder
    if (hour >= 9 && hour <= 11 && (!lastEnergyCheck || 
        new Date(lastEnergyCheck).toDateString() !== now.toDateString())) {
      newNotifications.push({
        id: 'morning-energy',
        type: 'energy_check',
        title: 'Good Morning Energy Check',
        message: 'Start your day right! How are you feeling this morning?',
        timestamp: now,
        priority: 'medium',
        actionable: true,
        dismissible: true
      });
    }

    // Afternoon energy dip reminder
    if (hour >= 14 && hour <= 16 && profile.behaviorPatterns?.energyLevels.find((e: any) => 
        new Date(e.timestamp).getHours() === hour && e.energy <= 2)) {
      newNotifications.push({
        id: 'afternoon-dip',
        type: 'break_reminder',
        title: 'Time for a Break?',
        message: 'You typically feel low energy around this time. Consider a quick walk or stretch!',
        timestamp: now,
        priority: 'medium',
        actionable: true,
        dismissible: true
      });
    }

    // Break reminder based on work patterns
    const timeSinceLastBreak = lastBreakTime ? 
      (now.getTime() - new Date(lastBreakTime).getTime()) / (1000 * 60) : 0;
    
    if (timeSinceLastBreak > (profile.preferences.breakReminders || profile.preferences.autoBreakReminders ? 60 : 90)) {
      newNotifications.push({
        id: 'break-reminder',
        type: 'break_reminder',
        title: 'Break Time!',
        message: 'You\'ve been focused for a while. Time for a gentle break to recharge!',
        timestamp: now,
        priority: 'medium',
        actionable: true,
        dismissible: false
      });
    }

    // Habit reminders based on streaks
    const habitStreaks = profile.behaviorPatterns?.habitStreaks || {};
    Object.entries(habitStreaks).forEach(([habit, streak]) => {
      if (typeof streak === 'number' && streak > 0 && Math.random() < 0.3) {
        newNotifications.push({
          id: `habit-${habit}`,
          type: 'habit_reminder',
          title: 'Keep Your Streak!',
          message: `You're on a ${streak}-day streak with ${habit}. Don't break the chain!`,
          timestamp: now,
          priority: 'low',
          actionable: true,
          dismissible: true
        });
      }
    });

    // Encouragement based on recent completions
    const recentCompletions = profile.behaviorPatterns?.taskCompletions?.filter((t: any) => 
      (now.getTime() - new Date(t.timestamp).getTime()) < 24 * 60 * 60 * 1000
    ) || [];

    if (recentCompletions.length >= 3) {
      newNotifications.push({
        id: 'productivity-praise',
        type: 'encouragement',
        title: 'You\'re On Fire! 🔥',
        message: `Amazing work today! You've completed ${recentCompletions.length} tasks. Your focus is incredible!`,
        timestamp: now,
        priority: 'low',
        actionable: false,
        dismissible: true
      });
    }

    // Achievement notifications
    if (recentCompletions.length >= 10) {
      newNotifications.push({
        id: 'achievement-productive',
        type: 'achievement',
        title: 'Productivity Master!',
        message: '🏆 Incredible! You\'ve completed 10 tasks today. You\'re building amazing momentum!',
        timestamp: now,
        priority: 'high',
        actionable: false,
        dismissible: true
      });
    }

    // Evening reflection reminder
    if (hour >= 18 && hour <= 20) {
      newNotifications.push({
        id: 'evening-reflection',
        type: 'reminder',
        title: 'Evening Reflection',
        message: 'Take a moment to celebrate today\'s wins, however small. You did great!',
        timestamp: now,
        priority: 'low',
        actionable: false,
        dismissible: true
      });
    }

    setNotifications(newNotifications);
  }, [profile, isVisible]);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    trackBehavior('notification_dismissed', { notificationId: id });
  };

  const handleNotificationAction = (notification: Notification) => {
    trackBehavior('notification_acted', { 
      notificationId: notification.id, 
      type: notification.type 
    });

    switch (notification.type) {
      case 'energy_check':
        onTriggerEnergyCheck();
        break;
      case 'break_reminder':
        onTriggerBreak();
        break;
      case 'habit_reminder':
        onTriggerHabits();
        break;
    }
    
    dismissNotification(notification.id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'energy_check': return Zap;
      case 'break_reminder': return Clock;
      case 'habit_reminder': return Target;
      case 'encouragement': return Heart;
      case 'achievement': return CheckCircle;
      case 'reminder': return Bell;
      default: return AlertTriangle;
    }
  };

  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-blue-200 bg-blue-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6" />
              <div>
                <h3 className="text-xl font-semibold">Smart Notifications</h3>
                <p className="text-purple-100 text-sm">Your gentle ADHD-friendly reminders</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto mb-4 text-purple-300" />
              <h4 className="text-lg font-medium text-gray-700 mb-2">All Caught Up!</h4>
              <p className="text-gray-500">No new notifications right now. Keep up the great work!</p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className={`p-4 rounded-xl border-2 ${getNotificationColor(notification.priority)} transition-all hover:shadow-md`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          <Icon className="w-5 h-5 text-purple-500" />
                        </div>
                        
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800 mb-1">
                            {notification.title}
                          </h5>
                          <p className="text-sm text-gray-600 mb-3">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {notification.timestamp.toLocaleTimeString('en', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </span>
                            
                            <div className="flex gap-2">
                              {notification.actionable && (
                                <button
                                  onClick={() => handleNotificationAction(notification)}
                                  className="px-3 py-1 bg-purple-500 text-white text-xs rounded-lg hover:bg-purple-600 transition-colors"
                                >
                                  Take Action
                                </button>
                              )}
                              
                              {notification.dismissible && (
                                <button
                                  onClick={() => dismissNotification(notification.id)}
                                  className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              💜 Notifications are personalized based on your patterns and preferences
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}