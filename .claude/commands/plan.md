# Plan Command

## Overview
The `/plan` command initiates a collaborative planning session involving all engineers in the team. It breaks down the stated goal into a set of actionable todos, assigns each todo to a specific engineer, and organizes them in order to achieve the goal described in the task.

## Usage
```
/plan "task description"
```

## Implementation
When this command is invoked, Claude should:

1. Extract the task description from the quoted string
2. Use the Task tool with the following parameters:
  - `subagent_type`: "tech-lead-decision-maker"
  - `description`: "Collaborative planning"
  - `prompt`: A formatted prompt that includes:
    - The user's task description
    - Current project context (dashMate - ADHD-friendly task management app)
    - List of all engineers in the team and their roles/capabilities
    - Request for a collaborative planning session

3. Return a structured plan to the user, including:
  - A set of todos required to achieve the goal
  - Assignment of each todo to a specific engineer
  - Order of execution, priority, and dependencies
4. Ask for confirmation before proceeding with execution
5. Once the plan is approved:
   - Record the plan in project documentation using the `/document` command
   - Create a documentation task: `/document "project plan for {task_description}"`
   - Add this documentation task as the first item in the execution sequence

## Example Prompt Template
```
Please analyze and collaboratively plan the following task: "{user_task}"

Project Context: dashMate - ADHD-friendly task management app with React/Next.js, TypeScript, Tailwind CSS.

Team Members:
- Engineer 1: Frontend specialist (React, UI)
- Engineer 2: Backend/API specialist
- Engineer 3: UX designer
- Engineer 4: Generalist/research

Break this down into:
1. A set of todos with clear descriptions
2. Assignment of each todo to a specific engineer
3. Order of execution, priority, and dependencies
4. Estimated complexity

Provide a collaborative plan that can be executed systematically by the team.
```

## Examples
- `/plan "add voice transcription feature"`
- `/plan "implement user authentication"`
- `/plan "create analytics dashboard"`
- `/plan "optimize mobile performance"`

## Expected Behavior
1. Parse quoted task description
2. Invoke task-planner agent with context
3. Present collaborative plan with todos and assignments
4. Wait for user confirmation
5. When approved, automatically execute `/document "project plan for {task_description}"`
6. Add the documentation task as the first item in the execution sequence
7. Begin systematic execution starting with documentation, then proceeding with planned tasks