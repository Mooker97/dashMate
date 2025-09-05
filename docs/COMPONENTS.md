# dashMate Components & Hooks Documentation

## Components

### Core Components

#### `src/app/page.tsx` - Main Application Component
The primary application interface that orchestrates all other components and manages global state.

**Key Features:**
- Voice-enabled microphone interface with visual feedback
- Task list management with ADHD-friendly styling
- Settings-driven UI adaptation (focus mode, gentle notifications, etc.)
- Break reminder integration
- Audio system management

**State Management:**
- `isListening`: Microphone active state
- `menuOpen`: Navigation menu visibility
- `showSettings`: Settings modal visibility
- `isAddingTask`: Task creation form state
- `newTaskText` & `newTaskPriority`: New task form data

**Event Handlers:**
- `handleMicClick()`: Toggles microphone and manages break timer
- `toggleTask()`: Task completion with audio/voice feedback
- `handleAddTask()`: Creates new tasks with validation
- `handleDeleteTask()`: Removes tasks with confirmation

#### `src/app/layout.tsx` - Root Layout Component
Defines the application's root HTML structure and metadata.

**Features:**
- Geist font configuration with CSS variables
- SEO metadata with ADHD-friendly descriptions
- Theme color configuration for light/dark modes
- Viewport settings for responsive design

#### `src/components/Settings.tsx` - Settings Management Modal
Comprehensive settings interface with organized categories and real-time updates.

**Setting Categories:**
- **Appearance**: Theme, colors, density, font size
- **Focus & Productivity**: Sounds, breaks, goals, sorting
- **Audio & Voice**: Microphone, feedback, coach personality
- **ADHD Support**: Focus mode, gentle notifications, animations
- **Developer Options**: Debug tools and testing features

**Components Used:**
- `SettingItem`: Individual setting wrapper with label and description
- `Toggle`: Accessible toggle switch component
- `Select`: Styled dropdown for option selection

#### `src/components/BreakNotification.tsx` - Break Reminder Interface
ADHD-friendly break reminder with gentle animations and coaching messages.

**Features:**
- Adaptive styling based on user preferences (gentle vs standard)
- Coaching personality-matched messaging
- Multiple snooze options (5, 15 minutes)
- Smooth entrance/exit animations (respects reduce motion preferences)
- Progress indicator and visual feedback

**Styling Modes:**
- **Gentle Mode**: Soft blues, minimal animations, calming messaging
- **Standard Mode**: Higher contrast, more dynamic animations
- **Focus Mode**: Simplified interface with essential actions only

#### `src/components/VoiceControls.tsx` - Audio System Debug Panel
Developer-focused component for testing and debugging audio functionality.

**Features:**
- Real-time audio level monitoring
- Microphone test controls
- Speech synthesis testing
- Audio system status display
- Error state visualization

#### `src/components/SettingsTestPanel.tsx` - Settings Testing Interface
Developer tool for validating settings functionality and UI states.

**Testing Capabilities:**
- Settings validation and edge case testing
- UI state preview across different configurations
- ADHD feature combination testing
- Performance impact analysis

## Hooks

### `src/hooks/useTasks.ts` - Task Management Hook
Comprehensive task management with dual storage system (Supabase + localStorage).

**Interface:**
```typescript
interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
  user_id?: string;
}
```

**Exported Functions:**
- `addTask(text: string, priority: Task['priority'])`: Creates new tasks
- `toggleTask(id: string)`: Toggles completion status
- `deleteTask(id: string)`: Removes tasks
- `updateTask(id: string, updates: Partial<Task>)`: Updates task properties
- `updateTaskPriority(id: string, priority: Task['priority'])`: Changes priority
- `getCompletedTasks()`: Returns completed tasks array
- `getPendingTasks()`: Returns incomplete tasks array
- `getTasksByPriority(priority: Task['priority'])`: Filters by priority

**State Values:**
- `tasks`: Current task array
- `loading`: Loading state for async operations
- `error`: Error message string or null
- `isAuthenticated`: User authentication status

### `src/hooks/useSettings.ts` - Settings Management Hook
Manages user preferences with localStorage persistence and computed styling.

**Core Functions:**
- `updateSettings(newSettings: Settings)`: Updates and persists settings
- `resetSettings()`: Restores default configuration
- `getComputedStyles()`: Generates dynamic styling based on current settings

**Computed Styles System:**
- **Typography**: Responsive font sizing across elements
- **Spacing**: Task density and ADHD-friendly spacing patterns
- **Colors**: Theme-based color palette generation
- **Animations**: Motion-reduction and gentle animation controls
- **ADHD Styles**: Focus mode, gentle notifications, simplified interfaces

**Theme System:**
- **Color Themes**: Default, Ocean, Forest, Sunset, Monochrome
- **Style Variations**: Minimal, Soft, Bold, Neon, Pastel, Earth, Vintage, Cyberpunk, Warmth, Cool
- **Dynamic Application**: Real-time style generation based on preferences

### `src/hooks/useAudio.ts` - Audio System Management Hook
Manages microphone input, speech synthesis, and audio feedback systems.

**Audio State:**
```typescript
interface AudioState {
  isSupported: {
    audio: boolean;
    speech: boolean;
  };
  hasPermissions: boolean;
  isMicrophoneActive: boolean;
  isSpeaking: boolean;
  microphoneLevel: number;
  error: string | null;
}
```

**Audio Controls:**
- `initialize()`: Sets up audio system with permission checks
- `startMicrophone(sensitivity: string)`: Begins audio input with sensitivity settings
- `stopMicrophone()`: Ends audio input and cleans up resources
- `speak(text: string, personality: string)`: Text-to-speech with personality matching
- `stopSpeaking()`: Interrupts current speech
- `playTaskCompletionSound(priority: string)`: Priority-based completion audio
- `requestMicrophonePermissions()`: Handles permission requests
- `clearError()`: Resets error state

### `src/hooks/useBreakReminder.ts` - Break Management System Hook
Intelligent break reminder system with work session tracking and gentle notifications.

**Break State:**
- `isActive`: Timer running status
- `isPaused`: Timer paused during interactions
- `timeUntilBreak`: Remaining minutes until break
- `isBreakNotificationShown`: Break modal visibility
- `workSessionProgress`: Progress percentage (0-1)

**Break Controls:**
- `startTimer()`: Begins/resumes break countdown
- `pauseTimer()`: Pauses timer during interactions
- `resetTimer()`: Resets to full interval duration
- `takeBreak()`: Logs break and resets timer
- `snoozeBreak(minutes: number)`: Delays break by specified minutes
- `dismissBreak()`: Hides notification without taking break
- `getFormattedTimeUntilBreak()`: Returns "Xm Ys" formatted string
- `getWorkSessionProgress()`: Returns progress as decimal (0-1)

**Integration Features:**
- Automatic pause during voice interactions
- Settings-based interval and duration configuration
- Gentle notification styling adaptation
- Voice coaching integration for break encouragement

### `src/hooks/useTheme.ts` - Theme Application Hook
Handles dynamic theme switching and system preference detection.

**Features:**
- System theme preference detection
- Dynamic CSS class application
- Real-time theme switching
- Dark/light mode coordination with settings

## Services

### `src/services/audioService.ts`
Low-level audio management service providing cross-browser compatibility.

### `src/services/supabase.ts`
Database connection and configuration for authenticated users.

### `src/services/taskService.ts`
Task synchronization and data transformation utilities.

## Component Architecture Patterns

### Settings-Driven Rendering
All components adapt their appearance and behavior based on user settings:

```typescript
const computedStyles = getComputedStyles();
const isGentle = settings.gentleNotifications;
const isFocusMode = settings.focusMode;
```

### ADHD-Friendly Styling
Components implement conditional styling based on ADHD support features:

```typescript
const adhdStyles = {
  focusMode: settings.focusMode ? 'reduced-chrome' : 'full-interface',
  gentleAnimations: settings.reduceAnimations ? 'static' : 'animated',
  calmingColors: settings.gentleNotifications ? 'soft-palette' : 'standard-palette'
};
```

### Progressive Enhancement
Audio and voice features gracefully degrade when not supported:

```typescript
if (audioState.isSupported.speech && settings.voiceFeedback) {
  await audioControls.speak(message, settings.coachPersonality);
}
```

### Error Boundary Patterns
All components implement error recovery and fallback states:

```typescript
try {
  await performAsyncOperation();
} catch (error) {
  setError(error.message);
  fallbackToAlternativeMethod();
}
```

This component and hook architecture provides a robust, accessible, and ADHD-friendly foundation for the dashMate task management application.