# dashMate API Documentation

## Core Data Structures

### Task Interface

The central data structure for task management throughout the application.

```typescript
interface Task {
  id: string;                    // Unique identifier (timestamp-based for localStorage)
  text: string;                  // Task description/content
  completed: boolean;            // Completion status
  priority: 'high' | 'medium' | 'low';  // Priority level for visual coding
  created_at: string;           // ISO timestamp of creation
  updated_at: string;           // ISO timestamp of last modification
  user_id?: string;             // Optional user association (Supabase users only)
}
```

**Field Specifications:**

- **id**: Generated using `generateTaskId()` function for localStorage tasks, or Supabase auto-increment for authenticated users
- **text**: Trimmed string, minimum 1 character after whitespace removal
- **completed**: Default `false` on creation
- **priority**: Affects visual presentation (red/yellow/green color coding)
- **created_at**: Set automatically on task creation
- **updated_at**: Updated on any task modification
- **user_id**: Only present for authenticated Supabase users

### Settings Interface

Comprehensive user preference system with type-safe configuration options.

```typescript
interface Settings {
  // Appearance Configuration
  theme: 'light' | 'dark' | 'auto';
  taskDisplayDensity: 'compact' | 'normal' | 'spacious';
  colorTheme: 'default' | 'ocean' | 'forest' | 'sunset' | 'monochrome';
  themeStyle: 'minimal' | 'soft' | 'bold' | 'neon' | 'pastel' | 'earth' | 'vintage' | 'cyberpunk' | 'warmth' | 'cool';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  
  // Productivity Features
  taskCompletionSound: boolean;
  breakReminders: boolean;
  breakInterval: 15 | 30 | 60;           // minutes
  breakDuration: 5 | 10 | 15;            // minutes
  dailyGoalTasks: 3 | 5 | 8;             // target tasks per day
  timeBasedSorting: boolean;
  
  // Audio System
  microphoneSensitivity: 'low' | 'medium' | 'high';
  voiceFeedback: boolean;
  coachPersonality: 'supportive' | 'direct' | 'gentle';
  
  // ADHD Support Features
  reduceAnimations: boolean;
  simplifiedInterface: boolean;
  gentleNotifications: boolean;
  focusMode: boolean;
  
  // Developer Tools
  devMode: boolean;
}
```

## Hook APIs

### useTasks Hook API

Complete task management with automatic storage switching based on authentication status.

```typescript
function useTasks(): {
  // State
  tasks: Task[];                         // Current task array
  loading: boolean;                      // Async operation status
  error: string | null;                 // Error message or null
  isAuthenticated: boolean | null;       // Authentication status
  
  // Core Operations
  addTask: (text: string, priority?: Task['priority']) => Promise<Task | undefined>;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'created_at'>>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  updateTaskPriority: (id: string, priority: Task['priority']) => Promise<void>;
  
  // Utility Functions
  getCompletedTasks: () => Task[];
  getPendingTasks: () => Task[];
  getTasksByPriority: (priority: Task['priority']) => Task[];
  refetch: () => Promise<void>;
}
```

**Usage Examples:**

```typescript
// Basic task management
const { tasks, addTask, toggleTask, deleteTask } = useTasks();

// Create new task
await addTask("Review project documentation", "high");

// Toggle completion
await toggleTask(taskId);

// Remove task
await deleteTask(taskId);

// Filter operations
const highPriorityTasks = getTasksByPriority('high');
const completedTasks = getCompletedTasks();
```

### useSettings Hook API

Settings management with computed styling and localStorage persistence.

```typescript
function useSettings(): {
  // State
  settings: Settings;                    // Current settings object
  isLoaded: boolean;                     // Initialization status
  
  // Operations
  updateSettings: (settings: Settings) => void;
  resetSettings: () => void;
  getComputedStyles: () => ComputedStyles;
}
```

**ComputedStyles Interface:**

```typescript
interface ComputedStyles {
  // Typography
  fontSize: string;                      // Tailwind text size class
  headingSize: string;                   // Responsive heading classes
  subtitleSize: string;                  // Responsive subtitle classes
  
  // Layout
  taskPadding: string;                   // Task item padding
  taskSpacing: string;                   // Task list spacing
  
  // Theme
  themeColors: ThemeColors;              // Dynamic color palette
  animationClass: string;                // Animation/transition classes
  
  // ADHD-Specific Styles
  adhdStyles: {
    focusMode: boolean;
    simplifiedInterface: boolean;
    gentleNotifications: boolean;
    focusBackground: string;             // Focus mode background gradient
    gentleSuccess: string;               // Gentle success styling
    gentleError: string;                 // Gentle error styling
    gentleWarning: string;               // Gentle warning styling
    reducedShadow: string;               // Minimal shadow classes
    reducedBorder: string;               // Subtle border classes
    focusPadding: string;                // Enhanced padding for focus
    focusMargin: string;                 // Enhanced margins for focus
    gentleHover: string;                 // Subtle hover effects
  };
}
```

### useAudio Hook API

Comprehensive audio system management with cross-browser compatibility.

```typescript
function useAudio(): [AudioState, AudioControls];

interface AudioState {
  isSupported: {
    audio: boolean;                      // Web Audio API support
    speech: boolean;                     // Speech Synthesis support
  };
  hasPermissions: boolean;               // Microphone permission status
  isMicrophoneActive: boolean;           // Recording state
  isSpeaking: boolean;                   // Speech synthesis state
  microphoneLevel: number;               // Current audio level (0-1)
  error: string | null;                 // Error message or null
}

interface AudioControls {
  initialize: () => Promise<void>;
  startMicrophone: (sensitivity: 'low' | 'medium' | 'high') => Promise<void>;
  stopMicrophone: () => void;
  speak: (text: string, personality: 'supportive' | 'direct' | 'gentle') => Promise<void>;
  stopSpeaking: () => void;
  playTaskCompletionSound: (priority: 'high' | 'medium' | 'low') => Promise<void>;
  requestMicrophonePermissions: () => Promise<boolean>;
  clearError: () => void;
}
```

**Usage Examples:**

```typescript
const [audioState, audioControls] = useAudio();

// Initialize system
await audioControls.initialize();

// Start listening
if (audioState.hasPermissions) {
  await audioControls.startMicrophone('medium');
}

// Provide feedback
if (audioState.isSupported.speech) {
  await audioControls.speak("Great job completing that task!", 'supportive');
}
```

### useBreakReminder Hook API

Intelligent break management with work session tracking.

```typescript
function useBreakReminder(settings: Settings): [BreakReminderState, BreakReminderControls];

interface BreakReminderState {
  isActive: boolean;                     // Timer running status
  isPaused: boolean;                     // Paused during interactions
  timeUntilBreak: number;                // Minutes remaining
  isBreakNotificationShown: boolean;     // Modal visibility
}

interface BreakReminderControls {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  takeBreak: () => void;
  snoozeBreak: (minutes: number) => void;
  dismissBreak: () => void;
  getFormattedTimeUntilBreak: () => string;
  getWorkSessionProgress: () => number;   // 0-1 progress value
}
```

## Storage Architecture

### Dual Storage System

The application implements intelligent storage switching based on authentication status:

**Authenticated Users (Supabase):**
- Real-time synchronization across devices
- Automatic conflict resolution
- User association and data isolation
- Backup and recovery capabilities

**Guest Users (localStorage):**
- Immediate responsiveness
- Privacy-focused (data stays local)
- No account requirements
- Graceful migration path to authenticated storage

### Database Schema (Supabase)

```sql
-- Tasks table structure
CREATE TABLE tasks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own tasks" ON tasks
  FOR ALL USING (auth.uid() = user_id);
```

## Component Communication Patterns

### Event Handling

Tasks and audio systems coordinate through structured event patterns:

```typescript
// Task completion with audio feedback
const handleTaskCompletion = async (taskId: string) => {
  const task = tasks.find(t => t.id === taskId);
  
  // Update task state
  await toggleTask(taskId);
  
  // Provide audio feedback if enabled
  if (settings.taskCompletionSound && audioState.isSupported.audio) {
    await audioControls.playTaskCompletionSound(task.priority);
  }
  
  // Voice encouragement if enabled
  if (settings.voiceFeedback && audioState.isSupported.speech) {
    const message = generateEncouragementMessage(settings.coachPersonality);
    await audioControls.speak(message, settings.coachPersonality);
  }
};
```

### Settings Propagation

Settings changes trigger immediate UI updates through computed styles:

```typescript
// Settings update triggers style recalculation
const updateUserSettings = (newSettings: Settings) => {
  updateSettings(newSettings);
  // Computed styles automatically update via getComputedStyles()
  // All components re-render with new styling
};
```

This API design ensures type safety, predictable behavior, and seamless integration between all system components while maintaining the ADHD-friendly user experience focus.