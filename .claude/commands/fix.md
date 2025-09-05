# Fix Command

## Overview
The `/fix` command handles issue resolution through a structured workflow involving technical analysis, delegation, testing, and documentation. It ensures issues are properly analyzed by the tech lead, delegated to the appropriate engineer, tested for validation, and documented by the archivist.

## Usage
```
/fix "description of the issue or bug to fix"
```

## Implementation
When this command is invoked, Claude should:

1. Extract the issue description from the quoted string
2. Use the Task tool with the following parameters:
   - `subagent_type`: "tech-lead-decision-maker"
   - `description`: "Analyze and delegate bug fix"
   - `prompt`: A formatted prompt that includes:
     - The user's issue description
     - Current project context (dashMate - ADHD-friendly task management app)
     - Request for technical analysis and delegation strategy

3. Tech lead analyzes the issue and determines:
   - Root cause analysis
   - Whether it's a frontend or backend issue
   - Appropriate engineer assignment (frontend-component-engineer or backend-engineer)
   - Testing strategy and requirements

4. Create a structured fix plan including:
   - Issue analysis and root cause
   - Assigned engineer for the fix
   - Testing requirements and assigned tester

5. Ask for confirmation before proceeding with execution
6. Once approved, execute the fix workflow:
   - Delegate to appropriate engineer
   - Assign testing validation
   - Record the fix in documentation using `/document "bug fix for {issue_description}"`

## Example Prompt Template
```
Please analyze and create a fix plan for the following issue: "{issue_description}"

Project Context: dashMate - ADHD-friendly task management app with React/Next.js, TypeScript, Tailwind CSS.

Available engineers:
- frontend-component-engineer: UI components, React issues, styling problems
- backend-engineer: API endpoints, server logic, database issues
- ux-playwright-reviewer: Testing validation and user experience verification

As tech lead, provide:
1. Root cause analysis of the issue
2. Determination of whether this is frontend/backend/full-stack
3. Assignment to appropriate engineer
4. Testing strategy and validation requirements
5. Priority level and impact assessment

Create a structured fix plan that ensures proper resolution and validation.
```

## Examples
- `/fix "login button not responding on mobile devices"`
- `/fix "API returning 500 errors for task creation"`
- `/fix "dark mode toggle not persisting user preference"`
- `/fix "task filters showing incorrect results"`
- `/fix "page layout breaking on small screens"`

## Expected Behavior
1. Parse issue description from quoted string
2. Invoke tech-lead-decision-maker agent for analysis
3. Present structured fix plan with assignments and testing strategy
4. Wait for user confirmation
5. When approved, execute fix workflow in sequence:
   - Delegate fix implementation to assigned engineer
   - Assign testing validation to ux-playwright-reviewer
   - Execute `/document "bug fix for {issue_description}"` for changelog
6. Monitor progress through each phase of the fix workflow

## Fix Workflow Phases
**Phase 1: Analysis** - Tech lead analyzes issue and creates fix plan
**Phase 2: Implementation** - Assigned engineer implements the fix
**Phase 3: Testing** - Tester validates the solution works as expected
**Phase 4: Documentation** - Archivist records the fix in changelog and relevant docs

## Quality Assurance
- Each fix includes proper testing validation
- All fixes are documented for future reference
- Root cause analysis prevents similar issues
- Structured workflow ensures nothing is missed
