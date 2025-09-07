'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Settings as SettingsIcon, Brain, Bell, 
  Shield, User, Sliders, Eye, MousePointer, Target
} from 'lucide-react';
import { UserPreferences, UserCustomizations } from '@/types/user';
import { ColorCustomizer } from './ColorCustomizer';

interface SettingsProps {
  preferences: UserPreferences;
  customizations: UserCustomizations;
  onPreferencesChange: (updates: Partial<UserPreferences>) => void;
  onCustomizationsChange: (updates: Partial<UserCustomizations>) => void;
  onClose: () => void;
}

export function Settings({
  preferences,
  customizations,
  onPreferencesChange,
  onCustomizationsChange,
  onClose
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState<string>('interface');

  const tabs = [
    { id: 'interface', label: 'Interface', icon: Eye },
    { id: 'personalization', label: 'Personal', icon: User },
    { id: 'productivity', label: 'Productivity', icon: Target },
    { id: 'coach', label: 'AI Coach', icon: Brain },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'accessibility', label: 'Accessibility', icon: MousePointer },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'advanced', label: 'Advanced', icon: Sliders }
  ];

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const SettingItem = ({ 
    label, 
    description, 
    children 
  }: { 
    label: string; 
    description?: string; 
    children: React.ReactNode 
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange, disabled = false }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void;
    disabled?: boolean;
  }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        !disabled && onChange(!checked);
      }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked 
          ? 'bg-blue-600' 
          : 'bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const Select = ({ 
    value, 
    options, 
    onChange 
  }: { 
    value: string; 
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find(opt => opt.value === value) || options[0];

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    return (
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-left flex items-center justify-between"
        >
          <span>{selectedOption?.label}</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-lg last:rounded-b-lg ${
                  option.value === value ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ColorPicker = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value: string; 
    onChange: (color: string) => void;
    label: string;
  }) => (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => {
          e.stopPropagation();
          onChange(e.target.value);
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
      />
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'interface':
        return (
          <div>
            <SettingSection title="Appearance">
              <SettingItem 
                label="Theme" 
                description="Choose your preferred color theme"
              >
                <Select
                  value={preferences.theme}
                  options={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'auto', label: 'Auto' },
                    { value: 'high-contrast', label: 'High Contrast' },
                    { value: 'warm', label: 'Warm' },
                    { value: 'cool', label: 'Cool' }
                  ]}
                  onChange={(value) => onPreferencesChange({ theme: value as UserPreferences['theme'] })}
                />
              </SettingItem>

              <SettingItem 
                label="Color Scheme" 
                description="Select an overall color mood"
              >
                <Select
                  value={preferences.colorScheme}
                  options={[
                    { value: 'default', label: 'Default' },
                    { value: 'calm', label: 'Calm Blues' },
                    { value: 'energizing', label: 'Energizing' },
                    { value: 'focus', label: 'Focus Mode' },
                    { value: 'custom', label: 'Custom' }
                  ]}
                  onChange={(value) => onPreferencesChange({ colorScheme: value as UserPreferences['colorScheme'] })}
                />
              </SettingItem>

              <SettingItem 
                label="Font Size" 
                description="Adjust text size for better readability"
              >
                <Select
                  value={preferences.fontScale.toString()}
                  options={[
                    { value: '0.8', label: 'Small' },
                    { value: '0.9', label: 'Medium-Small' },
                    { value: '1.0', label: 'Normal' },
                    { value: '1.1', label: 'Medium-Large' },
                    { value: '1.2', label: 'Large' },
                    { value: '1.3', label: 'Extra Large' },
                    { value: '1.4', label: 'Huge' }
                  ]}
                  onChange={(value) => onPreferencesChange({ fontScale: parseFloat(value) as UserPreferences['fontScale'] })}
                />
              </SettingItem>

              <SettingItem 
                label="Compact Mode" 
                description="Reduce spacing for more information density"
              >
                <Toggle
                  checked={preferences.compactMode}
                  onChange={(checked) => onPreferencesChange({ compactMode: checked })}
                />
              </SettingItem>
            </SettingSection>

            {preferences.colorScheme === 'custom' && (
              <SettingSection title="Advanced Color Customization">
                <ColorCustomizer
                  customizations={customizations}
                  onUpdate={onCustomizationsChange}
                />
              </SettingSection>
            )}

            <SettingSection title="Layout">
              <SettingItem 
                label="Dashboard Layout" 
                description="Choose your preferred dashboard style"
              >
                <Select
                  value={customizations.dashboardLayout}
                  options={[
                    { value: 'default', label: 'Default' },
                    { value: 'minimal', label: 'Minimal' },
                    { value: 'detailed', label: 'Detailed' },
                    { value: 'focus', label: 'Focus Mode' }
                  ]}
                  onChange={(value) => onCustomizationsChange({ dashboardLayout: value as UserCustomizations['dashboardLayout'] })}
                />
              </SettingItem>

              <SettingItem 
                label="Default View" 
                description="What to show when you open the app"
              >
                <Select
                  value={customizations.defaultView}
                  options={[
                    { value: 'today', label: 'Today\'s Tasks' },
                    { value: 'upcoming', label: 'Upcoming Tasks' },
                    { value: 'all', label: 'All Tasks' },
                    { value: 'energy-based', label: 'Energy-Based View' }
                  ]}
                  onChange={(value) => onCustomizationsChange({ defaultView: value as UserCustomizations['defaultView'] })}
                />
              </SettingItem>
            </SettingSection>
          </div>
        );

      case 'personalization':
        return (
          <div>
            <SettingSection title="ADHD Profile">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 mb-3">
                  Help dashMate understand your unique brain! This information helps personalize your experience.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-blue-700 mb-1">ADHD Type</label>
                    <select 
                      className="w-full px-2 py-1 text-xs border border-blue-200 rounded bg-white text-gray-900"
                      onChange={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option>Combined Type</option>
                      <option>Inattentive</option>
                      <option>Hyperactive</option>
                      <option>Other/Unsure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-700 mb-1">Focus Style</label>
                    <select 
                      className="w-full px-2 py-1 text-xs border border-blue-200 rounded bg-white text-gray-900"
                      onChange={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option>Flexible</option>
                      <option>Short Bursts</option>
                      <option>Deep Dives</option>
                      <option>Pomodoro</option>
                    </select>
                  </div>
                </div>
              </div>
            </SettingSection>

            <SettingSection title="Learning Preferences">
              <SettingItem 
                label="Track Productivity Patterns" 
                description="Learn when you work best"
              >
                <Toggle
                  checked={customizations.learningPreferences.trackProductivityPatterns}
                  onChange={(checked) => onCustomizationsChange({
                    learningPreferences: { ...customizations.learningPreferences, trackProductivityPatterns: checked }
                  })}
                />
              </SettingItem>

              <SettingItem 
                label="Track Energy Levels" 
                description="Understand your energy patterns"
              >
                <Toggle
                  checked={customizations.learningPreferences.trackEnergyLevels}
                  onChange={(checked) => onCustomizationsChange({
                    learningPreferences: { ...customizations.learningPreferences, trackEnergyLevels: checked }
                  })}
                />
              </SettingItem>

              <SettingItem 
                label="Track Time Estimates" 
                description="Improve time blindness over time"
              >
                <Toggle
                  checked={customizations.learningPreferences.trackTimeEstimations}
                  onChange={(checked) => onCustomizationsChange({
                    learningPreferences: { ...customizations.learningPreferences, trackTimeEstimations: checked }
                  })}
                />
              </SettingItem>
            </SettingSection>
          </div>
        );

      case 'coach':
        return (
          <div>
            <SettingSection title="AI Coach Personality">
              <SettingItem 
                label="Coaching Style" 
                description="How should your AI coach communicate with you?"
              >
                <Select
                  value={preferences.coachingStyle}
                  options={[
                    { value: 'supportive', label: 'Supportive & Encouraging' },
                    { value: 'direct', label: 'Direct & Clear' },
                    { value: 'gentle', label: 'Gentle & Patient' },
                    { value: 'motivating', label: 'High Energy & Motivating' },
                    { value: 'analytical', label: 'Data-Driven & Analytical' }
                  ]}
                  onChange={(value) => onPreferencesChange({ coachingStyle: value as UserPreferences['coachingStyle'] })}
                />
              </SettingItem>

              <SettingItem 
                label="Celebration Style" 
                description="How should achievements be celebrated?"
              >
                <Select
                  value={preferences.celebrationStyle}
                  options={[
                    { value: 'enthusiastic', label: 'Enthusiastic! 🎉' },
                    { value: 'calm', label: 'Calm Recognition' },
                    { value: 'minimal', label: 'Minimal Acknowledgment' }
                  ]}
                  onChange={(value) => onPreferencesChange({ celebrationStyle: value as UserPreferences['celebrationStyle'] })}
                />
              </SettingItem>

              <SettingItem 
                label="Voice Feedback" 
                description="Enable spoken responses from your AI coach"
              >
                <Toggle
                  checked={preferences.voiceFeedback}
                  onChange={(checked) => onPreferencesChange({ voiceFeedback: checked })}
                />
              </SettingItem>

              <SettingItem 
                label="Proactive Coaching" 
                description="Allow the AI to offer suggestions without being asked"
              >
                <Toggle
                  checked={preferences.proactiveCoaching}
                  onChange={(checked) => onPreferencesChange({ proactiveCoaching: checked })}
                />
              </SettingItem>

              <SettingItem 
                label="Learning Mode" 
                description="Let the AI learn your patterns and preferences"
              >
                <Toggle
                  checked={preferences.learningMode}
                  onChange={(checked) => onPreferencesChange({ learningMode: checked })}
                />
              </SettingItem>
            </SettingSection>
          </div>
        );

      case 'accessibility':
        return (
          <div>
            <SettingSection title="Motion & Animation">
              <SettingItem 
                label="Reduce Motion" 
                description="Minimize animations and transitions"
              >
                <Toggle
                  checked={preferences.reducedMotion}
                  onChange={(checked) => onPreferencesChange({ reducedMotion: checked })}
                />
              </SettingItem>
            </SettingSection>

            <SettingSection title="ADHD Support">
              <SettingItem 
                label="Gentle Nudges" 
                description="Soft reminders instead of harsh alerts"
              >
                <Toggle
                  checked={preferences.gentleNudges}
                  onChange={(checked) => onPreferencesChange({ gentleNudges: checked })}
                />
              </SettingItem>

              <SettingItem 
                label="Auto Break Reminders" 
                description="Suggest breaks to prevent burnout"
              >
                <Toggle
                  checked={preferences.autoBreakReminders}
                  onChange={(checked) => onPreferencesChange({ autoBreakReminders: checked })}
                />
              </SettingItem>
            </SettingSection>
          </div>
        );

      case 'colors':
        return (
          <ColorCustomizer 
            customizations={customizations}
            onUpdate={onCustomizationsChange}
          />
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <SettingsIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Settings panel for {tabs.find(t => t.id === activeTab)?.label}</p>
            <p className="text-xs mt-2">Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <SettingsIcon className="w-6 h-6" />
            Settings & Customization
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-100px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 bg-gray-50">
            <div className="p-4 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(tab.id);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500">
            Settings are automatically saved as you change them
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}