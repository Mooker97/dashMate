'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Clock, Zap, Brain, Target, Calendar,
  BarChart3, PieChart, Activity, Lightbulb, Star,
  ChevronRight, ChevronDown, Award
} from 'lucide-react';
import { UserProfile, LearningInsight, ProductivityPattern } from '@/types/user';
import { Task } from '@/hooks/useTasks';

interface InsightsPanelProps {
  profile: UserProfile;
  tasks: Task[];
  isVisible: boolean;
  onClose: () => void;
}

export function InsightsPanel({ profile, tasks, isVisible, onClose }: InsightsPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'patterns' | 'insights' | 'achievements'>('overview');
  const [expandedInsights, setExpandedInsights] = useState<Set<string>>(new Set());

  const completedTasks = tasks.filter(t => t.completed);
  const activeTasks = tasks.filter(t => !t.completed);
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  // Calculate productivity metrics
  const getCompletionsByPriority = () => {
    const high = completedTasks.filter(t => t.priority === 'high').length;
    const medium = completedTasks.filter(t => t.priority === 'medium').length;
    const low = completedTasks.filter(t => t.priority === 'low').length;
    return { high, medium, low };
  };

  const getProductivityTrend = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const completed = completedTasks.filter(t => {
        const taskDate = new Date(t.updated_at);
        return taskDate.toDateString() === date.toDateString();
      }).length;
      return { date: date.toLocaleDateString('en', { weekday: 'short' }), completed };
    }).reverse();

    return last7Days;
  };

  const getEnergyAnalysis = () => {
    if (profile.energyPatterns.length === 0) {
      return { peakHour: 'Not enough data', lowHour: 'Not enough data' };
    }

    const sortedByEnergy = [...profile.energyPatterns].sort((a, b) => b.energyLevel - a.energyLevel);
    const peakHour = sortedByEnergy[0]?.timeOfDay || 'Unknown';
    const lowHour = sortedByEnergy[sortedByEnergy.length - 1]?.timeOfDay || 'Unknown';
    
    return { peakHour, lowHour };
  };

  const getMotivationalStats = () => {
    const today = new Date().toDateString();
    const todayCompleted = completedTasks.filter(t => 
      new Date(t.updated_at).toDateString() === today
    ).length;

    const streak = calculateStreak();
    const totalCompleted = completedTasks.length;
    const avgPerDay = profile.totalSessions > 0 ? Math.round(totalCompleted / profile.totalSessions * 10) / 10 : 0;

    return { todayCompleted, streak, totalCompleted, avgPerDay };
  };

  const calculateStreak = () => {
    const sortedCompletions = completedTasks
      .map(t => new Date(t.updated_at).toDateString())
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (sortedCompletions.length === 0) return 0;

    const uniqueDates = [...new Set(sortedCompletions)];
    let streak = 0;
    const today = new Date().toDateString();
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const date = new Date(uniqueDates[i]);
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (date.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const priorityData = getCompletionsByPriority();
  const trendData = getProductivityTrend();
  const energyData = getEnergyAnalysis();
  const motivationalData = getMotivationalStats();

  const toggleInsightExpanded = (id: string) => {
    const newExpanded = new Set(expandedInsights);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedInsights(newExpanded);
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Today</p>
              <p className="text-2xl font-bold text-blue-800">{motivationalData.todayCompleted}</p>
              <p className="text-xs text-blue-600">tasks completed</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Streak</p>
              <p className="text-2xl font-bold text-green-800">{motivationalData.streak}</p>
              <p className="text-xs text-green-600">days active</p>
            </div>
            <Zap className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Total</p>
              <p className="text-2xl font-bold text-purple-800">{motivationalData.totalCompleted}</p>
              <p className="text-xs text-purple-600">completed</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Rate</p>
              <p className="text-2xl font-bold text-orange-800">{completionRate}%</p>
              <p className="text-xs text-orange-600">completion</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Weekly Trend Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Weekly Progress
        </h3>
        <div className="flex items-end justify-between h-32 gap-2">
          {trendData.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t min-h-1 w-full transition-all duration-500"
                style={{ 
                  height: `${Math.max(10, (day.completed / Math.max(...trendData.map(d => d.completed), 1)) * 100)}%` 
                }}
              />
              <p className="text-xs text-gray-500 mt-2">{day.date}</p>
              <p className="text-xs font-medium text-gray-700">{day.completed}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Priority Focus
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-700">High Priority</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{priorityData.high} tasks</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-700">Medium Priority</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{priorityData.medium} tasks</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-700">Low Priority</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{priorityData.low} tasks</span>
          </div>
        </div>
      </div>

      {/* Energy Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Energy Patterns
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-green-700 font-medium">Peak Energy</p>
            <p className="text-lg font-bold text-green-800">{energyData.peakHour}</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-blue-700 font-medium">Rest Time</p>
            <p className="text-lg font-bold text-blue-800">{energyData.lowHour}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const InsightsTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5" />
        Personalized Insights
      </h3>
      
      {profile.learningInsights.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>I'm still learning about your patterns!</p>
          <p className="text-sm mt-2">Complete more tasks to unlock personalized insights.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {profile.learningInsights.map((insight) => (
            <div key={insight.id} className="bg-white rounded-xl border border-gray-200">
              <button
                onClick={() => toggleInsightExpanded(insight.id)}
                className="w-full p-4 text-left hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      insight.confidence > 0.8 ? 'bg-green-500' :
                      insight.confidence > 0.6 ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <h4 className="font-medium text-gray-800">{insight.title}</h4>
                      <p className="text-sm text-gray-600">{insight.type}</p>
                    </div>
                  </div>
                  {expandedInsights.has(insight.id) ? 
                    <ChevronDown className="w-5 h-5 text-gray-400" /> :
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  }
                </div>
              </button>
              
              {expandedInsights.has(insight.id) && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-sm text-gray-700 mt-3">{insight.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      Confidence: {Math.round(insight.confidence * 100)}%
                    </span>
                    {insight.actionable && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        Actionable
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'patterns', label: 'Patterns', icon: Activity },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'achievements', label: 'Achievements', icon: Star }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed right-4 top-20 w-80 max-h-[80vh] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-40"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Your Analytics
        </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 p-3 text-center text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 mx-auto mb-1" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="overflow-y-auto max-h-[60vh] p-4">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'insights' && <InsightsTab />}
        {activeTab === 'patterns' && (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Pattern analysis coming soon!</p>
          </div>
        )}
        {activeTab === 'achievements' && (
          <div className="text-center py-8 text-gray-500">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Achievement system coming soon!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}