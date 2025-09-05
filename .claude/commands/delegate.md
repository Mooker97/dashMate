# Delegate Command

## Overview
The `/delegate` command automatically routes complex tasks to the task-delegator agent for proper work breakdown and team assignment.

## Usage
```
/delegate "task description"
```

## Implementation
When this command is invoked, Claude should:

1. Extract the task description from the quoted string
2. Use the Task tool with the following parameters:
   - `subagent_type`: "task-delegator"
   - `description`: "Delegate task"
   - `prompt`: A formatted prompt that includes:
     - The user's task description
     - Current project context (dashMate - ADHD-friendly task management app)
     - Available agents and their capabilities
     - Request for structured delegation plan

3. Return the delegation plan to the user
4. Ask for confirmation before proceeding with execution
5. Once the delegation plan is approved:
   - Record the plan using the `/document` command
   - Create a documentation task: `/document "delegation plan for {task_description}"`
   - Add this documentation task as the first item in the execution sequence

## Example Prompt Template
```
Please analyze and delegate the following task: "{user_task}"

Project Context: dashMate - ADHD-friendly task management app with React/Next.js, TypeScript, Tailwind CSS.

Available agents:
- frontend-component-engineer: React components, UI features
- ux-designer-minimalist: Design, UX improvements
- general-purpose: Research, complex multi-step tasks

Break this down into:
1. Subtasks with clear descriptions
2. Recommended agent assignments
3. Priority levels and dependencies
4. Estimated complexity

Provide a structured delegation plan that can be executed systematically.
```

## Examples
- `/delegate "add voice transcription feature"`
- `/delegate "implement user authentication"`  
- `/delegate "create analytics dashboard"`
- `/delegate "optimize mobile performance"`

## Expected Behavior
1. Parse quoted task description
2. Invoke task-delegator agent with context
3. Present delegation plan
4. Wait for user confirmation
5. When approved, automatically execute `/document "delegation plan for {task_description}"`
6. Add the documentation task as the first item in the execution sequence
7. Begin systematic execution starting with documentation, then proceeding with delegated tasks