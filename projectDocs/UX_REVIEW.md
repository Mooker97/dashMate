# dashMate UX Review - Action Plan

## Critical Fixes (Do Today)

### 1. Fix Text Truncation
**Problem:** "Ready to" text cut off by gradient  
**Action:** In `src/app/page.tsx`, adjust gradient overlay CSS or reposition text elements

### 2. Add Focus Indicators
**Problem:** No keyboard navigation visibility (WCAG violation)  
**Action:** Add to global CSS:
```css
*:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
```

### 3. Implement Hover States
**Problem:** No interactive feedback  
**Action:** Add hover classes to all buttons and task cards:
- Microphone button: `hover:scale-105 transition-transform`
- Task cards: `hover:shadow-lg hover:border-gray-300`
- Navigation icons: `hover:bg-gray-100 rounded-lg`

## High Priority (This Week)

### 4. Microphone Visual Feedback
**Action:** Add pulsing animation when listening:
```css
.listening { animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
```

### 5. Fix Mobile Navigation
**Problem:** Icons cramped on small screens  
**Action:** Increase spacing or implement hamburger menu for screens < 640px

### 6. Add Text Input Alternative
**Action:** Add input field below microphone with placeholder "Type a task or click the mic"

### 7. Task Edit/Delete Actions
**Action:** Add icon buttons to each task card:
- Edit icon (pencil) - opens inline edit mode
- Delete icon (trash) - removes with confirmation

## Medium Priority (Next Sprint)

### 8. Empty State
**Action:** When no tasks, display:
- Encouraging message: "Your day is clear! Add your first task"
- Subtle illustration or icon
- Clear CTA pointing to microphone/input

### 9. Loading States
**Action:** Add skeleton screens for task list during API calls

### 10. Improve Contrast
**Action:** Ensure gradient text meets 4.5:1 ratio:
- Test with WebAIM contrast checker
- Darken gradient stops if needed

## ADHD-Specific Features

### 11. Time Estimates
**Action:** Add optional duration field to tasks (5min, 15min, 30min, 1hr)

### 12. Visual Timer
**Action:** Add countdown timer component that shows remaining time visually

### 13. Task Chunking
**Action:** Allow tasks to have subtasks with checkboxes

### 14. Celebration Animation
**Action:** Trigger confetti or checkmark animation on task completion

### 15. Quick Add Button
**Action:** Floating action button for instant task capture on mobile

## Implementation Checklist

```
Week 1:
□ Fix text truncation (page.tsx line ~50)
□ Add focus indicators (globals.css)
□ Implement hover states (all interactive components)
□ Add microphone pulsing animation
□ Fix mobile nav spacing

Week 2:
□ Add text input field
□ Implement edit/delete on tasks
□ Create empty state component
□ Add loading skeletons
□ Test and fix contrast issues

Week 3:
□ Add time estimate field
□ Implement visual timer
□ Add subtask functionality
□ Create completion animations
□ Add floating quick-add button
```

## Quick Wins (Can do now)

1. **globals.css:** Add focus-visible styles
2. **page.tsx:** Add hover classes to existing elements
3. **page.tsx:** Fix gradient text positioning
4. **Task component:** Add hover:shadow-lg class
5. **Microphone button:** Add transition-all duration-200

## Testing Requirements

- Test keyboard navigation flow
- Verify all interactive elements have hover states
- Check contrast ratios with browser DevTools
- Test on actual mobile devices (not just browser resize)
- Get feedback from at least 3 ADHD users

## Success Metrics

- Zero accessibility violations in Lighthouse
- All interactive elements have visible feedback
- Mobile navigation usable with one thumb
- Task actions completable in < 3 clicks
- 100% keyboard navigable

---
*Priority: Critical = Today | High = This Week | Medium = Next Sprint*