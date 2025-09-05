'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Flame, Calendar, TrendingUp, Star, CheckCircle2,
  Circle, MoreHorizontal, Edit3, Trash2, Target
} from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetCount: number;
  currentStreak: number;
  longestStreak: number;
  completions: Record<string, number>; // date -> count
  color: string;
  createdAt: Date;
  isActive: boolean;
}

interface HabitTrackerProps {
  isVisible: boolean;
  onClose: () => void;
  onHabitUpdate: (habitData: any) => void;
}

export function HabitTracker({ isVisible, onClose, onHabitUpdate }: HabitTrackerProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');
  const [newHabitFrequency, setNewHabitFrequency] = useState<'daily' | 'weekly'>('daily');

  const habitColors = [
    '#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B',
    '#EF4444', '#EC4899', '#6366F1', '#14B8A6', '#F97316'
  ];

  const predefinedHabits = [
    { name: 'Drink 8 glasses of water', frequency: 'daily' as const, targetCount: 8 },
    { name: 'Take medication', frequency: 'daily' as const, targetCount: 1 },
    { name: 'Exercise for 30 minutes', frequency: 'daily' as const, targetCount: 1 },
    { name: 'Practice mindfulness', frequency: 'daily' as const, targetCount: 1 },
    { name: 'Read for 20 minutes', frequency: 'daily' as const, targetCount: 1 },
    { name: 'Write in journal', frequency: 'daily' as const, targetCount: 1 },
    { name: 'Organize workspace', frequency: 'weekly' as const, targetCount: 1 },
    { name: 'Review goals', frequency: 'weekly' as const, targetCount: 1 }
  ];

  useEffect(() => {
    const stored = localStorage.getItem('dashmate_habits');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHabits(parsed.map((h: any) => ({
          ...h,
          createdAt: new Date(h.createdAt)
        })));
      } catch (error) {
        console.error('Error loading habits:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('dashmate_habits', JSON.stringify(habits));
    }
  }, [habits]);

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const addHabit = (name: string, description?: string, frequency: 'daily' | 'weekly' = 'daily') => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      description,
      frequency,
      targetCount: frequency === 'daily' ? 1 : 1,
      currentStreak: 0,
      longestStreak: 0,
      completions: {},
      color: habitColors[habits.length % habitColors.length],
      createdAt: new Date(),
      isActive: true
    };
    
    setHabits(prev => [...prev, newHabit]);
    setNewHabitName('');
    setNewHabitDescription('');
    setShowAddHabit(false);
  };

  const markHabitComplete = (habitId: string) => {
    const today = getTodayString();
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const currentCount = habit.completions[today] || 0;
        const newCount = Math.min(currentCount + 1, habit.targetCount);
        
        const updatedCompletions = {
          ...habit.completions,
          [today]: newCount
        };

        // Calculate streak
        let streak = 0;
        const currentDate = new Date();
        while (true) {
          const dateString = currentDate.toISOString().split('T')[0];
          if (updatedCompletions[dateString] >= habit.targetCount) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
          } else {
            break;
          }
        }

        const longestStreak = Math.max(habit.longestStreak, streak);

        return {
          ...habit,
          completions: updatedCompletions,
          currentStreak: streak,
          longestStreak
        };
      }
      return habit;
    }));
  };

  const undoHabitComplete = (habitId: string) => {
    const today = getTodayString();
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const currentCount = habit.completions[today] || 0;
        const newCount = Math.max(currentCount - 1, 0);
        
        const updatedCompletions = {
          ...habit.completions,
          [today]: newCount
        };

        return {
          ...habit,
          completions: updatedCompletions
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  const getCompletionPercentage = (habit: Habit) => {
    const today = getTodayString();
    const completed = habit.completions[today] || 0;
    return Math.round((completed / habit.targetCount) * 100);
  };

  const getWeeklyProgress = (habit: Habit) => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const completed = habit.completions[dateString] || 0;
      const isComplete = completed >= habit.targetCount;
      days.push({ date: dateString, completed: isComplete, count: completed });
    }
    return days;
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6" />
              <div>
                <h3 className="text-xl font-semibold">Habit Tracker</h3>
                <p className="text-green-100 text-sm">Build consistency, one day at a time</p>
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

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Add Habit Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-800">Your Daily Habits</h4>
              <button
                onClick={() => setShowAddHabit(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Habit
              </button>
            </div>

            {/* Quick Add Suggestions */}
            {habits.length === 0 && (
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-600 mb-3">Quick Start Suggestions</h5>
                <div className="grid grid-cols-2 gap-2">
                  {predefinedHabits.map((habit, index) => (
                    <button
                      key={index}
                      onClick={() => addHabit(habit.name, '', habit.frequency)}
                      className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-800">{habit.name}</p>
                      <p className="text-xs text-gray-500">{habit.frequency}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add Custom Habit Form */}
            <AnimatePresence>
              {showAddHabit && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-4"
                >
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newHabitName}
                        onChange={(e) => setNewHabitName(e.target.value)}
                        placeholder="Habit name (e.g., 'Drink 8 glasses of water')"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        value={newHabitDescription}
                        onChange={(e) => setNewHabitDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <div className="flex gap-3">
                        <select
                          value={newHabitFrequency}
                          onChange={(e) => setNewHabitFrequency(e.target.value as 'daily' | 'weekly')}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                        </select>
                        <button
                          onClick={() => newHabitName.trim() && addHabit(newHabitName.trim(), newHabitDescription.trim())}
                          disabled={!newHabitName.trim()}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setShowAddHabit(false);
                            setNewHabitName('');
                            setNewHabitDescription('');
                          }}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Habits List */}
          <div className="space-y-4">
            {habits.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No habits yet. Add your first habit to get started!</p>
              </div>
            ) : (
              habits.map((habit) => {
                const todayComplete = (habit.completions[getTodayString()] || 0) >= habit.targetCount;
                const completionPercentage = getCompletionPercentage(habit);
                const weeklyProgress = getWeeklyProgress(habit);
                
                return (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: habit.color }}
                        />
                        <div>
                          <h5 className="font-medium text-gray-800">{habit.name}</h5>
                          {habit.description && (
                            <p className="text-xs text-gray-500">{habit.description}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Current Streak */}
                        {habit.currentStreak > 0 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 rounded-lg">
                            <Flame className="w-3 h-3" />
                            <span className="text-xs font-medium">{habit.currentStreak}</span>
                          </div>
                        )}
                        
                        {/* Today's Progress */}
                        <button
                          onClick={() => todayComplete ? undoHabitComplete(habit.id) : markHabitComplete(habit.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            todayComplete
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {todayComplete ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => deleteHabit(habit.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Weekly Progress */}
                    <div className="flex items-center gap-1 mb-2">
                      {weeklyProgress.map((day, index) => (
                        <div
                          key={index}
                          className={`flex-1 h-2 rounded ${
                            day.completed
                              ? 'bg-green-500'
                              : day.count > 0
                              ? 'bg-yellow-300'
                              : 'bg-gray-200'
                          }`}
                          title={`${day.date}: ${day.count}/${habit.targetCount}`}
                        />
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        Today: {habit.completions[getTodayString()] || 0}/{habit.targetCount}
                        {completionPercentage > 0 && ` (${completionPercentage}%)`}
                      </span>
                      <span>
                        Longest streak: {habit.longestStreak} days
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}