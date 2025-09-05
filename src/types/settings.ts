export interface Settings {
  // Appearance
  theme: 'light' | 'dark' | 'auto';
  taskDisplayDensity: 'compact' | 'normal' | 'spacious';
  colourTheme: 'sage' | 'stone' | 'lavender' | 'sky' | 'earth';
  themeStyle: 'gentle' | 'natural' | 'serene' | 'muted' | 'warm';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  
  // Focus & Productivity
  taskCompletionSound: boolean;
  breakReminders: boolean;
  breakInterval: 15 | 30 | 60;
  breakDuration: 5 | 10 | 15;
  dailyGoalTasks: 3 | 5 | 8;
  timeBasedSorting: boolean;
  
  // Audio & Voice
  microphoneSensitivity: 'low' | 'medium' | 'high';
  voiceFeedback: boolean;
  coachPersonality: 'supportive' | 'direct' | 'gentle';
  
  // ADHD Support
  reduceAnimations: boolean;
  simplifiedInterface: boolean;
  gentleNotifications: boolean;
  focusMode: boolean;
  
  // Developer Options
  devMode: boolean;
}

export const defaultSettings: Settings = {
  // Appearance
  theme: 'auto',
  taskDisplayDensity: 'normal',
  colourTheme: 'sage',
  themeStyle: 'gentle',
  fontSize: 'medium',
  
  // Focus & Productivity
  taskCompletionSound: true,
  breakReminders: true,
  breakInterval: 30,
  breakDuration: 10,
  dailyGoalTasks: 5,
  timeBasedSorting: false,
  
  // Audio & Voice
  microphoneSensitivity: 'medium',
  voiceFeedback: true,
  coachPersonality: 'supportive',
  
  // ADHD Support
  reduceAnimations: false,
  simplifiedInterface: false,
  gentleNotifications: true,
  focusMode: false,
  
  // Developer Options
  devMode: false,
};