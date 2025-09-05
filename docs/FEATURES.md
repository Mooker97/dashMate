# dashMate Features Documentation

## Overview

dashMate is an ADHD-friendly task management application that combines intelligent task organization with conversational AI coaching. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4, it provides a comprehensive productivity solution designed specifically for how ADHD minds work.

## Core Features

### 1. Voice-Enabled AI Coaching Interface

**Primary Microphone Interface**
- Large, accessible microphone button as the central interaction point
- Visual feedback with dynamic ripple effects during listening
- Real-time microphone level visualization
- Haptic feedback support for mobile devices
- Voice activity detection with configurable sensitivity levels

**AI Coach Integration**
- Three personality types: Supportive, Direct, and Gentle
- Contextual voice feedback for task completions and breaks
- Encouraging messages tailored to user's preferred coaching style
- Speech synthesis with personality-matched delivery

**Audio Features**
- Microphone sensitivity controls (Low, Medium, High)
- Task completion sounds with priority-based variations
- Voice feedback system with speech synthesis
- Audio permission management and error handling
- Background audio service with cleanup on unmount

### 2. Intelligent Task Management

**Task Data Structure**
- Unique task IDs with timestamp-based generation
- Rich text content with completion status tracking
- Three-tier priority system (High, Medium, Low)
- Automatic timestamp tracking for creation and updates
- User association for authenticated users

**Task Operations**
- Add new tasks with priority selection
- Toggle task completion with visual and audio feedback
- Delete tasks with confirmation patterns
- Real-time task list updates
- Priority-based color coding system

**Storage System**
- Dual-mode storage: Supabase for authenticated users, localStorage for guests
- Automatic fallback to local storage on connection issues
- Default starter tasks for new users
- Real-time synchronization with database

### 3. ADHD-Friendly Design System

**Focus Mode**
- Distraction-free environment with minimal UI elements
- Calming gradients and generous whitespace
- Hidden decorative patterns and statistics
- Enhanced spacing for cognitive load reduction

**Gentle Notifications**
- Softer color palettes and reduced contrast
- Smooth animations and gentle visual feedback
- Calming transitions instead of sharp changes
- Non-intrusive notification styling

**Simplified Interface**
- Hidden complex features and advanced controls
- Reduced visual complexity while maintaining functionality
- Streamlined navigation and menu options
- Essential features only presentation

**Animation Control**
- Configurable animation reduction for motion sensitivity
- Respect for user's motion preferences
- Alternative static states for all interactive elements

### 4. Comprehensive Settings System

**Appearance Customization**
- Theme selection: Light, Dark, Auto-detect
- Task display density: Compact, Normal, Spacious
- Color themes: Default, Ocean, Forest, Sunset, Monochrome
- Theme styles: Minimal, Soft, Bold, Neon, Pastel, Earth, Vintage, Cyberpunk, Warmth, Cool
- Font size scaling: Small, Medium, Large, Extra Large

**Productivity Features**
- Configurable task completion sounds
- Smart break reminder system with customizable intervals
- Daily goal setting (3, 5, or 8 tasks)
- Time-based task sorting capabilities

**Break Management System**
- Intelligent break reminders with work session tracking
- Customizable break intervals (15, 30, 60 minutes)
- Flexible break durations (5, 10, 15 minutes)
- Break progress indicators and timer display
- Snooze functionality (5 or 15 minutes)
- Integration with voice coaching for break encouragement

### 5. Advanced Audio System

**Microphone Management**
- Real-time audio level monitoring
- Configurable sensitivity settings
- Permission request handling
- Error state management with auto-recovery
- Background processing with proper cleanup

**Speech Synthesis**
- Personality-matched voice delivery
- Context-aware response generation
- Error handling for unsupported browsers
- Voice feedback toggle controls

**Audio Service Architecture**
- Centralized audio management
- Promise-based API for audio operations
- Automatic resource cleanup
- Cross-browser compatibility layer

### 6. Responsive Design System

**Mobile-First Architecture**
- Responsive layout scaling from mobile to desktop
- Touch-friendly interface elements
- Gesture support and haptic feedback
- Optimized task interaction patterns

**Accessibility Features**
- Screen reader compatibility
- Keyboard navigation support
- High contrast mode compatibility
- Focus management for modal interfaces

**Visual Hierarchy**
- Clear information architecture
- Consistent spacing and typography systems
- Priority-based visual indicators
- Contextual color coding

### 7. Developer Experience

**Developer Mode**
- Advanced debugging tools and panels
- Audio system testing interface
- Settings validation and testing
- Voice control panel for audio testing
- Developer-only UI components

**Testing Infrastructure**
- Playwright end-to-end testing setup
- Component testing architecture
- Audio system mocking capabilities

## Technical Architecture

### Framework Stack
- **Next.js 15.5.2** with App Router architecture
- **React 19.1.0** with modern hooks and concurrent features
- **TypeScript 5** for comprehensive type safety
- **Tailwind CSS 4** for utility-first styling

### Core Hooks
- `useTasks`: Task management with dual storage modes
- `useSettings`: Persistent user preferences with localStorage
- `useAudio`: Audio system management and voice synthesis
- `useBreakReminder`: Intelligent break tracking and notifications
- `useTheme`: Dynamic theme application and system preference detection

### Services
- `audioService`: Centralized audio management
- `supabase`: Database integration for authenticated users
- `taskService`: Task operations and synchronization

### Component Architecture
- Modular component design with clear separation of concerns
- Settings-driven conditional rendering
- ADHD-specific styling patterns
- Accessibility-first component design

## User Experience Design

### ADHD-Specific Considerations
- **Cognitive Load Reduction**: Simplified interfaces and generous whitespace
- **Sensory Sensitivity**: Gentle animations and soft color palettes
- **Focus Support**: Distraction-free modes and essential-only views
- **Positive Reinforcement**: Encouraging voice feedback and completion celebrations
- **Flexible Interaction**: Multiple input methods and customizable experiences

### Accessibility Standards
- WCAG 2.1 AA compliance considerations
- Screen reader optimization
- Keyboard navigation patterns
- High contrast mode support
- Motion preference respect

### Performance Optimization
- Lazy loading for non-critical components
- Optimized bundle splitting
- Efficient re-rendering patterns
- Memory leak prevention in audio system

## Integration Capabilities

### Current Integrations
- Supabase for user authentication and data storage
- Web Audio API for microphone and sound management
- Web Speech API for voice synthesis
- Browser notification systems

### Extensibility
- Modular architecture for feature additions
- Plugin-ready settings system
- API-ready for external AI service integration
- Webhook-compatible for automation systems

This comprehensive feature set makes dashMate a sophisticated yet accessible task management solution specifically designed to support ADHD productivity patterns and cognitive needs.