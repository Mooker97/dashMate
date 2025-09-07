# Feature Development Pipeline

Automates end-to-end feature development for dashMate with ADHD-friendly design patterns, parallel agent coordination, and comprehensive documentation.

## Usage

```bash
/feature "Add dark mode toggle to user settings"
/feature "Create task category system with color-coded filtering"
/feature "Implement voice transcription for task creation"
```

## Process Flow

This command orchestrates multiple specialized agents working in parallel to deliver complete features in 30-45 seconds:

1. **Requirements Analysis** (5s): @task-delegator analyzes feature scope and creates work packages
2. **Parallel Development** (25s): Four specialists work simultaneously:
   - @ux-designer-minimalist: ADHD-friendly UI patterns and Tailwind specs
   - @frontend-component-engineer: React/Next.js components with TypeScript
   - @backend-engineer: API routes and server-side logic
   - @database-specialist: Data modeling and schema design
3. **Quality Assurance** (10s): @ux-playwright-reviewer validates UX and functionality
4. **Documentation** (5s): @documentation-writer creates feature report in projectDocs

## Interactive Setup

Let me help you build a feature for dashMate. I'll gather some details to ensure the implementation matches your needs perfectly.

**What feature would you like to add to dashMate?**

*Please describe the feature in natural language. Examples:*
- "Add a dark mode toggle that users can access from the settings"
- "Create a task categorization system with color-coded labels"
- "Implement voice-to-text for creating tasks via the microphone button"

---

@task-delegator Please analyze the feature request and coordinate the development workflow. Break down the requirements into specific work packages for our specialist agents, considering dashMate's ADHD-friendly design principles and existing Next.js architecture.

For this feature: {user_input}

Create a detailed implementation plan that:
1. Identifies required components, routes, and data models
2. Defines ADHD-friendly UX requirements (generous whitespace, calming colors, clear visual hierarchy)
3. Specifies integration points with existing systems (Task interface, microphone interaction, priority colors)
4. Outlines testing scenarios for the UX reviewer
5. Sets up the foundation for comprehensive feature documentation

Once you've created the implementation plan, delegate work packages to:

**Design Phase:**
@ux-designer-minimalist Design ADHD-friendly UI patterns, color schemes, and responsive layouts that integrate with dashMate's existing visual language. Focus on cognitive load reduction and accessibility.

**Development Phase (Parallel Execution):**

@frontend-component-engineer Implement React components with TypeScript, following dashMate's patterns. Use Tailwind CSS 4.0 for styling and ensure mobile-first responsive design. Integrate with existing hooks and state management.

@backend-engineer Create Next.js API routes and server actions as needed. Implement business logic that supports the frontend requirements while maintaining clean separation of concerns.

@database-specialist Design data models and schemas that extend dashMate's Task interface. Consider performance and scalability for ADHD users who may create many tasks quickly.

**Quality Assurance:**
@ux-playwright-reviewer Create and execute comprehensive UX tests. Validate the ADHD-friendly design implementation and ensure the feature integrates seamlessly with existing workflows. Test accessibility and mobile responsiveness.

**Documentation:**
@documentation-writer Create a detailed feature implementation report in the projectDocs folder. Include technical specifications, user impact analysis, and maintenance guidance.

## Expected Outputs

Upon completion, you'll receive:

- ✅ **Working Feature**: Complete implementation integrated with dashMate
- ✅ **New Components**: React/TypeScript components following ADHD-friendly patterns  
- ✅ **API Routes**: Backend logic and data handling as needed
- ✅ **Database Schema**: Extended data models and relationships
- ✅ **UX Validation**: Comprehensive testing results and accessibility verification
- ✅ **Feature Report**: Detailed documentation in `projectDocs/feature-[name]-[date].md`

## ADHD-Friendly Design Principles

All agents are instructed to follow these core principles:

- **Generous Whitespace**: Reduce visual overwhelm and improve focus
- **Calming Color Gradients**: Use dashMate's established palette for emotional regulation
- **Clear Visual Hierarchy**: Help users understand priority and importance at a glance
- **Minimalist Interface**: Remove unnecessary cognitive load and distractions  
- **Consistent Patterns**: Leverage familiar interaction paradigms (microphone button, priority colors)
- **Mobile-First**: Ensure accessibility across devices for users on the go

## Technical Integration

The feature will integrate seamlessly with dashMate's architecture:

- **Next.js 15.5.2**: App Router with TypeScript for type safety
- **React 19.1.0**: Hooks-based state management and component lifecycle
- **Tailwind CSS 4.0**: Utility-first styling with responsive design
- **Task Interface**: Extends existing `Task { id, text, completed, priority }` structure
- **Path Aliases**: Uses `@/*` mapping to `./src/*` for clean imports

## Success Metrics

Each feature implementation will be measured against:

1. **Functionality**: Does it work as intended?
2. **ADHD Accessibility**: Does it reduce cognitive load and support focus?
3. **Integration Quality**: Does it feel native to dashMate's ecosystem?
4. **Code Quality**: Is it maintainable, type-safe, and well-tested?
5. **User Impact**: Does it genuinely improve the task management experience?

---

*This command represents the pinnacle of automated feature development, combining sophisticated multi-agent coordination with deep understanding of ADHD-friendly design principles to deliver complete, polished features in under a minute.*