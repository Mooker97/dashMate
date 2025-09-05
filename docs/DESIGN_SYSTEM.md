# dashMate Design System Documentation

## Design Philosophy

dashMate's design system is built around ADHD-friendly principles that prioritize cognitive accessibility, reduce overwhelm, and support diverse attention patterns. The system provides flexible, adaptive interfaces that scale from minimal to rich experiences based on user needs and preferences.

## Core Design Principles

### 1. Cognitive Load Reduction
- **Generous Whitespace**: Ample spacing prevents visual crowding
- **Clear Hierarchy**: Obvious information priority and relationships  
- **Progressive Disclosure**: Advanced features hidden until needed
- **Focused Interactions**: Single-purpose interface elements

### 2. Sensory Sensitivity Support
- **Gentle Animations**: Smooth, slow transitions that respect motion preferences
- **Soft Color Palettes**: Reduced contrast options for visual comfort
- **Configurable Intensity**: User control over visual stimulation levels
- **Respectful Defaults**: Conservative styling that can be enhanced

### 3. Attention Pattern Flexibility
- **Multiple Interaction Methods**: Voice, touch, and traditional input
- **Interruption Recovery**: Graceful handling of attention shifts  
- **Context Preservation**: Maintaining state during task switching
- **Momentum Support**: Visual feedback that encourages continued focus

## Typography System

### Font Stack
```css
--font-geist-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-geist-mono: 'Geist Mono', 'SF Mono', Consolas, monospace;
```

### Size Scale
The typography system adapts based on user font size preference:

```typescript
// Font Size Mapping
const fontSizes = {
  'small': {
    base: 'text-sm',           // 14px
    heading: 'text-4xl',       // 36px on mobile, 48px on desktop
    subtitle: 'text-sm'        // 14px
  },
  'medium': {
    base: 'text-base',         // 16px
    heading: 'text-5xl',       // 48px on mobile, 60px on desktop  
    subtitle: 'text-base'      // 16px on mobile, 18px on desktop
  },
  'large': {
    base: 'text-lg',           // 18px
    heading: 'text-6xl',       // 60px on mobile, 72px on desktop
    subtitle: 'text-lg'        // 18px on mobile, 20px on desktop
  },
  'extra-large': {
    base: 'text-xl',           // 20px
    heading: 'text-7xl',       // 72px on mobile, 96px on desktop
    subtitle: 'text-xl'        // 20px on mobile, 24px on desktop
  }
};
```

### Typography Hierarchy
- **Headings**: Light weight (font-light) with generous tracking
- **Body Text**: Regular weight with relaxed line-height (leading-relaxed)
- **UI Text**: Medium weight for interactive elements
- **Subtle Text**: Reduced opacity (text-gray-500) for secondary information

## Color System

### Theme Architecture

The color system uses a two-tier approach: base themes and style variations.

#### Base Color Themes

**Default Theme:**
```css
--color-primary-high: rgb(239, 68, 68);    /* Red - High priority */
--color-primary-medium: rgb(245, 158, 11);  /* Amber - Medium priority */  
--color-primary-low: rgb(34, 197, 94);      /* Green - Low priority */
```

**Ocean Theme:**
```css
--color-primary-high: rgb(59, 130, 246);    /* Blue spectrum */
--color-primary-medium: rgb(14, 165, 233);  
--color-primary-low: rgb(6, 182, 212);      
```

**Forest Theme:**
```css
--color-primary-high: rgb(34, 197, 94);     /* Green spectrum */
--color-primary-medium: rgb(132, 204, 22);  
--color-primary-low: rgb(16, 185, 129);     
```

**Sunset Theme:**
```css
--color-primary-high: rgb(251, 146, 60);    /* Warm spectrum */
--color-primary-medium: rgb(245, 101, 101); 
--color-primary-low: rgb(236, 72, 153);     
```

**Monochrome Theme:**
```css
--color-primary-high: rgb(75, 85, 99);      /* Gray spectrum */
--color-primary-medium: rgb(107, 114, 128); 
--color-primary-low: rgb(156, 163, 175);    
```

#### Style Variations

Each base theme can be modified with style variations:

- **Minimal**: Standard colors with subtle presentation
- **Soft**: Lighter, gentler variations (300 weight)
- **Bold**: Stronger, more saturated versions (600 weight)
- **Neon**: High-saturation accent colors (pink, cyan, lime)
- **Pastel**: Very light, calming variations (200 weight)
- **Earth**: Natural, warm earth tones (amber-700, orange-600)
- **Vintage**: Deep, rich historical colors (800 weight)
- **Cyberpunk**: Futuristic electric colors (fuchsia, cyan, lime)
- **Warmth**: Warm color temperature (red-400, orange-400, yellow-400)
- **Cool**: Cool color temperature (blue-500, indigo-500, purple-500)

### Priority Color Coding

Visual priority is communicated through consistent color application:

```typescript
// Priority dot colors
const priorityColors = {
  high: 'bg-red-500',      // Urgent attention
  medium: 'bg-amber-500',  // Important but not urgent  
  low: 'bg-emerald-500'    // Nice to have
};
```

### Adaptive Color Application

Colors automatically adapt based on ADHD support settings:

```typescript
// Gentle notification colors
const gentleColors = {
  success: 'bg-green-50 text-green-600 border-green-200',
  error: 'bg-red-50 text-red-600 border-red-200', 
  warning: 'bg-amber-50 text-amber-600 border-amber-200'
};

// Standard notification colors  
const standardColors = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  warning: 'bg-amber-100 text-amber-800 border-amber-300'
};
```

## Spacing and Layout

### Spacing Scale

The spacing system uses a progressive scale that provides more generous spacing in ADHD-friendly modes:

```typescript
// Task spacing based on density and ADHD settings
const spacing = {
  compact: {
    normal: 'space-y-2',      // 8px gaps
    focus: 'space-y-4'        // 16px gaps (more breathing room)
  },
  normal: {
    normal: 'space-y-3',      // 12px gaps  
    focus: 'space-y-6'        // 24px gaps
  },
  spacious: {
    normal: 'space-y-4',      // 16px gaps
    focus: 'space-y-8'        // 32px gaps
  }
};

// Padding follows similar pattern
const padding = {
  compact: {
    normal: 'p-3',            // 12px padding
    focus: 'p-4'              // 16px padding  
  },
  normal: {
    normal: 'p-4',            // 16px padding
    focus: 'p-6'              // 24px padding
  },
  spacious: {
    normal: 'p-6',            // 24px padding
    focus: 'p-8'              // 32px padding
  }
};
```

### Focus Mode Enhancements

Focus mode provides enhanced spacing for cognitive comfort:

```css
.focus-margin { margin-bottom: 3rem; }     /* 48px instead of 32px */
.focus-padding { padding: 2rem; }          /* 32px instead of 24px */  
.focus-background {
  background: linear-gradient(
    to bottom right,
    rgb(249, 250, 251, 0.7),
    rgb(239, 246, 255, 0.3),
    rgb(245, 243, 255, 0.2)
  );
}
```

## Animation System

### Motion Philosophy

The animation system respects user motion preferences and provides alternatives for users with motion sensitivity:

```typescript
// Animation classes based on user preference
const animations = {
  reduceMotion: 'transition-none',                    // No animations
  gentle: 'transition-all duration-500 ease-out',    // Slow, smooth
  standard: 'transition-all duration-300'            // Normal speed
};
```

### Gentle Animation Patterns

For users who prefer gentler interactions:

```css
/* Gentle hover effects */
.gentle-hover:hover {
  background-color: rgba(0, 0, 0, 0.02);
  transform: scale(1.01);
  transition: all 500ms ease-out;
}

/* Gentle bounce animation for break notifications */
@keyframes bounce-gentle {
  0%, 20%, 53%, 80%, 100% { transform: scale(1); }
  40%, 43% { transform: scale(1.02); }  
  70% { transform: scale(1.01); }
}
```

### Audio-Visual Coordination

Animations coordinate with audio feedback:

```typescript
// Ripple effect intensity based on microphone level
const rippleOpacity = Math.max(0.05, microphoneLevel * 0.3);
const rippleAnimation = gentleNotifications 
  ? 'animate-gentle-pulse' 
  : 'animate-ping';
```

## Component Design Patterns

### Progressive Enhancement

Components start with basic functionality and enhance based on capabilities:

```typescript
// Audio features enhance text-based interactions
const handleTaskCompletion = async (taskId: string) => {
  // Always: Update task state  
  await toggleTask(taskId);
  
  // Enhancement: Audio feedback if supported
  if (audioSupported && settings.taskCompletionSound) {
    await playCompletionSound(task.priority);
  }
  
  // Enhancement: Voice encouragement if supported
  if (speechSupported && settings.voiceFeedback) {
    await speakEncouragement(settings.coachPersonality);
  }
};
```

### Adaptive Complexity

Interface complexity adjusts based on user preferences:

```typescript
// Simplified interface hides advanced features
const shouldShowAdvancedFeatures = !settings.simplifiedInterface;
const shouldShowStatistics = !settings.focusMode && !settings.simplifiedInterface;
const shouldShowDecorations = !settings.focusMode;
```

### Accessibility Integration

Design patterns include accessibility by default:

```jsx
// Accessible toggle with proper ARIA attributes
<button
  onClick={() => onChange(!enabled)}
  role="switch"
  aria-checked={enabled}
  aria-label={label}
  className={`focus:ring-2 focus:ring-offset-2 ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
>
  <span className={`transform transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
</button>
```

## Responsive Design Strategy

### Mobile-First Implementation

All components start with mobile-optimized designs and enhance for larger screens:

```css
/* Mobile-first typography */
.heading { font-size: 2.25rem; }        /* 36px on mobile */
@media (min-width: 640px) {
  .heading { font-size: 3rem; }          /* 48px on tablet+ */
}

/* Mobile-first spacing */
.container { padding: 1rem; }           /* 16px on mobile */  
@media (min-width: 768px) {
  .container { padding: 2rem; }         /* 32px on desktop */
}
```

### Touch-Friendly Interactions

Interactive elements meet minimum touch target requirements:

```css
/* Minimum 44px touch targets */
.touch-target {
  min-width: 2.75rem;   /* 44px */
  min-height: 2.75rem;  /* 44px */
  padding: 0.75rem;     /* 12px */
}
```

## Error and Loading States

### Gentle Error Presentation

Error states use calming colors and helpful messaging:

```css
.error-gentle {
  background-color: rgb(254, 242, 242);  /* red-50 */
  color: rgb(220, 38, 38);               /* red-600 */
  border-color: rgb(254, 202, 202);      /* red-200 */
}

.error-standard {
  background-color: rgb(254, 226, 226);  /* red-100 */  
  color: rgb(153, 27, 27);               /* red-800 */
  border-color: rgb(252, 165, 165);      /* red-300 */
}
```

### Loading State Consistency

Loading states maintain layout stability:

```css
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}
```

This design system creates a cohesive, accessible, and ADHD-friendly experience that adapts to diverse user needs while maintaining visual consistency and usability across all interfaces.