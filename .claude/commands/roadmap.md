# Roadmap Command

## Overview
The `/roadmap` command handles feature requests through strategic planning and roadmap documentation. It involves the tech lead analyzing and planning the feature, then the archivist documenting it in the project roadmap for long-term visibility and planning.

## Usage
```
/roadmap "feature request description"
```

## Implementation
When this command is invoked, Claude should:

1. Extract the feature request description from the quoted string
2. Use the Task tool with the following parameters:
   - `subagent_type`: "tech-lead-decision-maker"
   - `description`: "Analyze and plan feature for roadmap"
   - `prompt`: A formatted prompt that includes:
     - The user's feature request description
     - Current project context (dashMate - ADHD-friendly task management app)
     - Request for strategic planning and roadmap placement

3. Tech lead analyzes the feature request and determines:
   - Technical feasibility and complexity
   - Resource requirements and timeline estimates
   - Dependencies and prerequisites
   - Priority level and strategic alignment
   - Roadmap placement (short-term, medium-term, or long-term)

4. Create a structured roadmap entry including:
   - Feature description and rationale
   - Technical requirements and approach
   - Estimated timeline and effort
   - Dependencies and milestones
   - Success criteria and impact

5. Ask for confirmation before adding to roadmap
6. Once approved, use the code-archivist to:
   - Add the feature to ROADMAP.md with proper formatting
   - Update any related documentation
   - Cross-reference with existing roadmap items

## Example Prompt Template
```
Please analyze and plan the following feature request for the project roadmap: "{feature_request}"

Project Context: dashMate - ADHD-friendly task management app with React/Next.js, TypeScript, Tailwind CSS.

As tech lead, provide strategic analysis including:
1. Technical feasibility assessment
2. Complexity and effort estimation
3. Required resources and timeline
4. Dependencies and prerequisites
5. Strategic value and user impact
6. Recommended roadmap placement (Q1, Q2, Q3, Q4, or future)
7. Success criteria and metrics

Create a comprehensive roadmap entry that aligns with project goals and technical constraints.
```

## Examples
- `/roadmap "add AI-powered task categorization"`
- `/roadmap "implement collaborative task sharing between users"`
- `/roadmap "create mobile app version of dashMate"`
- `/roadmap "integrate with calendar applications"`
- `/roadmap "add voice-to-text task creation"`

## Expected Behavior
1. Parse feature request from quoted string
2. Invoke tech-lead-decision-maker agent for strategic analysis
3. Present structured roadmap entry with timeline and requirements
4. Wait for user confirmation
5. When approved, use code-archivist to:
   - Update ROADMAP.md with the new feature entry
   - Ensure proper formatting and categorization
   - Cross-reference related features or dependencies
6. Confirm successful roadmap addition

## Roadmap Structure
Features will be organized by timeline and priority:
- **Current Quarter** - Active development features
- **Next Quarter** - Planned upcoming features  
- **Future Releases** - Long-term strategic features
- **Under Consideration** - Features being evaluated
- **Completed** - Delivered features for reference

## Strategic Planning
The tech lead ensures each roadmap entry includes:
- **Business Value** - Why this feature matters
- **Technical Approach** - High-level implementation strategy
- **Resource Requirements** - Team members and time needed
- **Dependencies** - Prerequisites or blockers
- **Success Metrics** - How success will be measured
