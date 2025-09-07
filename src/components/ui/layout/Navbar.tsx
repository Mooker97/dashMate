'use client';

import { useState } from 'react';
import { Brain, Sparkles, Settings as SettingsIcon, BarChart3, Menu, X, Clock, Flame, Zap, Bell } from 'lucide-react';
import { AuthButton } from '@/components/AuthButton';

interface NavbarProps {
  profile?: { name: string } | null;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onShowNotifications: () => void;
  onShowEnergyTracker: () => void;
  onShowHabitTracker: () => void;
  onStartFocusSession: () => void;
  onShowInsights: () => void;
  onShowSettings: () => void;
}

export function Navbar({
  profile,
  menuOpen,
  onMenuToggle,
  onShowNotifications,
  onShowEnergyTracker,
  onShowHabitTracker,
  onStartFocusSession,
  onShowInsights,
  onShowSettings
}: NavbarProps) {
  return (
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
          onClick={onShowNotifications}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative focusable touch-target"
          title="Smart Notifications"
          aria-label="Open smart notifications panel"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {/* Notification indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
        </button>
        
        <button
          onClick={onShowEnergyTracker}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors focusable touch-target"
          title="Energy Check-in"
          aria-label="Open energy tracking check-in"
        >
          <Zap className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={onShowHabitTracker}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors focusable touch-target"
          title="Habit Tracker"
          aria-label="Open habit tracking panel"
        >
          <Flame className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={onStartFocusSession}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors focusable touch-target"
          title="Start Focus Session"
          aria-label="Start a new focus session"
        >
          <Clock className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={onShowInsights}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors focusable touch-target"
          title="View Analytics"
          aria-label="View productivity analytics and insights"
        >
          <BarChart3 className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={onShowSettings}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors focusable touch-target"
          title="Settings"
          aria-label="Open application settings"
        >
          <SettingsIcon className="w-5 h-5 text-gray-600" />
        </button>
        
        {/* Authentication Button */}
        <AuthButton />
        
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden focusable touch-target"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
        </button>
      </div>
    </nav>
  );
}