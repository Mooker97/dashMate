---
name: claude-review
description: Comprehensive review of Claude Code usage in the current project
---

# Claude Code Review Command

Trigger the claude-code-optimizer agent to perform a comprehensive review of your project's Claude Code usage, configuration, and best practices compliance.

## Usage

Basic usage (full review):
```
/claude-review
```

Focused review with specific prompt:
```
/claude-review "Focus on API integration and error handling patterns"
/claude-review "Review the agent architecture and command structure"
/claude-review "Check accessibility and documentation quality"
```

The command automatically:
1. Analyzes your current project
2. Generates a comprehensive report
3. Saves the report to `projectDocs/claude-code-review-[timestamp].md`
4. Provides actionable recommendations ready for implementation

## What It Reviews

The claude-code-optimizer agent will analyze:

1. **CLAUDE.md File**
   - Structure and completeness
   - Content quality and clarity
   - Coverage of project specifics
   - Adherence to best practices

2. **Command Definitions**
   - .claude/commands/ directory structure
   - Command architecture patterns
   - Agent configurations and roles
   - Naming conventions

3. **Project Integration**
   - How well Claude understands your codebase
   - Development workflow documentation
   - Path configurations and aliases
   - Dependencies and tools

4. **Best Practices**
   - Documentation standards
   - Security considerations
   - Performance optimizations
   - Accessibility and clarity

5. **Enhancement Opportunities**
   - Unutilized Claude Code features
   - Suggested commands for your project type
   - Workflow automation possibilities
   - Documentation improvements

## Output

The command generates a comprehensive report including:
- Executive summary with overall score
- Detailed findings organized by category
- Prioritized recommendations with examples
- Implementation code snippets
- Clear next steps

## Example Output Structure

```markdown
# Claude Code Review Report

## Executive Summary
[Overview and score]

## Current State Analysis
- ✅ Strengths
- ⚠️ Areas for Improvement  
- ❌ Critical Issues

## Detailed Findings
[Category-by-category analysis]

## Recommendations
- Immediate Actions (High Priority)
- Short-term Improvements (Medium Priority)
- Long-term Enhancements (Low Priority)

## Score Card
- Documentation Quality: [A-F]
- Command Architecture: [A-F]
- Best Practices: [A-F]
- Overall: [A-F]
```

## When to Use

Run this command when you want to:
- Optimize your Claude Code setup
- Ensure best practices compliance
- Discover new Claude Code features
- Improve project documentation
- Get actionable improvement suggestions

## Implementation

When you run `/claude-review [optional focus prompt]`, it will:

1. Automatically invoke the claude-code-optimizer agent
2. Parse any provided focus prompt to guide the analysis
3. The agent will analyze your project setup (with special attention to focus areas if specified)
4. Generate a comprehensive review report with actionable recommendations
5. Include code examples and templates ready for immediate implementation
6. **Save the report to `projectDocs/claude-code-review-[timestamp].md`**
7. Display the report and confirm the saved location

### Focus Prompt Handling

If you provide a focus prompt, the agent will:
- Still perform the full review for context
- Give special attention and deeper analysis to the specified areas
- Prioritize recommendations related to your focus areas
- Include more detailed examples for the focused topics

### Output Management

The command will:
- Create `projectDocs/` directory if it doesn't exist
- Save report with timestamp format: `claude-code-review-YYYY-MM-DD-HH-MM.md`
- Make all recommendations immediately actionable with:
  - Copy-paste ready code snippets
  - Exact file paths for changes
  - Step-by-step implementation instructions
  - Priority ordering for execution

### Actionable Output Format

All recommendations in the report will be structured for immediate action:

```markdown
## Recommendation: [Specific Action]
**Priority**: High/Medium/Low
**Effort**: Quick Fix (5 min) / Minor (30 min) / Major (2+ hours)

### Implementation Steps:
1. Open file: `path/to/file.ext`
2. Replace/Add this code:
   ```language
   [Ready-to-paste code]
   ```
3. Run validation: `npm run test` (or relevant command)

### Expected Result:
[What should happen after implementation]
```

The command handles missing files gracefully and provides templates and guidance even if your Claude Code setup is minimal.