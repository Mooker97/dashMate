---
name: create-command
description: An interactive meta-command that guides users through creating well-structured Claude Code commands. It analyzes requirements, suggests architecture patterns, and generates complete command files with proper documentation and functionality following Claude Code best practices.
agents:
  - name: command-architect
    role: Analyzes user requirements and designs optimal command architecture
    model: opus
  - name: template-generator
    role: Creates command templates and boilerplate code
    model: sonnet
  - name: documentation-writer
    role: Generates comprehensive command documentation
    model: sonnet
  - name: quality-reviewer
    role: Reviews generated commands for best practices compliance
    model: sonnet
---

# Create Command - Interactive Command Builder

A sophisticated meta-command that guides users through creating high-quality Claude Code commands using parallel agent architecture for optimal efficiency and thoroughness.

## Command Overview

This command orchestrates multiple specialized agents working in parallel to create comprehensive, well-documented commands that follow Claude Code conventions and best practices.

## Agent Architecture

### Parallel Agent Topology
```
User Requirements → Command Architect (Analysis & Design)
                 ↓
            [Parallel Execution]
                 ├── Template Generator (Code Generation)
                 ├── Documentation Writer (Docs Creation)
                 └── Quality Reviewer (Validation)
                 ↓
            [Coordination Point]
                 ↓
            Final Command Assembly
```

### Agent Specifications

#### 1. Command Architect Agent
**Role**: Requirement analysis and architectural design
**Model**: Opus (for complex reasoning)
**Responsibilities**:
- Interview user to understand command requirements
- Determine command type and complexity level
- Design optimal architecture (simple, agent-based, or parallel)
- Define agent roles and interactions if needed
- Create detailed specification document

#### 2. Template Generator Agent
**Role**: Code generation and structure creation
**Model**: Sonnet (for structured output)
**Responsibilities**:
- Generate command file structure based on architecture
- Create appropriate templates for command type
- Implement interactive flows and user prompts
- Generate agent definitions if required
- Handle error cases and edge scenarios

#### 3. Documentation Writer Agent
**Role**: Documentation and example creation
**Model**: Sonnet (for clear communication)
**Responsibilities**:
- Create comprehensive command documentation
- Generate usage examples and scenarios
- Write agent descriptions and interaction patterns
- Create troubleshooting guides
- Ensure documentation follows standards

#### 4. Quality Reviewer Agent
**Role**: Validation and best practices enforcement
**Model**: Sonnet (for systematic review)
**Responsibilities**:
- Review generated command for best practices
- Validate agent interactions and dependencies
- Check documentation completeness
- Ensure proper error handling
- Verify Claude Code conventions compliance

## Execution Flow

### Phase 1: Requirements Gathering
1. **Command Architect** initiates interactive interview:
   - What should the command do?
   - What type of tasks will it handle?
   - Should it be interactive or automated?
   - Does it need specialized agents?
   - What are the expected inputs/outputs?

### Phase 2: Architecture Design
1. **Command Architect** analyzes requirements and determines:
   - Command complexity level (Simple/Intermediate/Advanced)
   - Architecture pattern (Direct/Agent-based/Parallel)
   - Required agent specializations
   - Data flow and coordination points

### Phase 3: Parallel Generation
1. **Template Generator** creates:
   - Command file structure
   - Interactive prompts and flows
   - Agent definitions (if needed)
   - Error handling mechanisms

2. **Documentation Writer** produces:
   - Command overview and description
   - Usage examples and scenarios
   - Agent interaction documentation
   - Best practices guidance

3. **Quality Reviewer** validates:
   - Architecture soundness
   - Best practices compliance
   - Documentation completeness
   - Error handling robustness

### Phase 4: Assembly and Refinement
1. Combine all agent outputs
2. Resolve any conflicts or gaps
3. Final validation and testing
4. Generate complete command file(s)

## Command Types Supported

### 1. Simple Commands
- Direct automation tasks
- Single-purpose utilities
- Basic file operations
- Simple interactive prompts

### 2. Agent-Based Commands
- Commands requiring specialized expertise
- Multi-step workflows with domain knowledge
- Task delegation patterns
- Expertise-driven decision making

### 3. Parallel Commands
- Complex workflows with independent components
- Performance-critical operations
- Multi-domain tasks requiring diverse skills
- Sophisticated coordination requirements

## Interactive Interview Framework

The command architect uses a structured interview process:

### Core Questions
1. **Purpose**: "What should your command accomplish?"
2. **Scope**: "What types of tasks will it handle?"
3. **Interaction**: "Should it be interactive or automated?"
4. **Complexity**: "Does it require specialized knowledge domains?"
5. **Performance**: "Are there performance or efficiency requirements?"

### Follow-up Analysis
Based on initial responses, the architect may ask:
- "What specific expertise areas are needed?"
- "How should different components coordinate?"
- "What error scenarios should be handled?"
- "Are there security or permission considerations?"

## Template Library

### Simple Command Template
```markdown
---
name: [command-name]
description: [command-description]
---

# [Command Name]

[Command implementation with proper structure]
```

### Agent-Based Command Template
```markdown
---
name: [command-name]
description: [command-description]
agents:
  - name: [agent-name]
    role: [agent-role]
    model: [model-choice]
---

# [Command Name]

[Command implementation with agent coordination]
```

### Parallel Command Template
```markdown
---
name: [command-name]
description: [command-description]
agents:
  - name: [agent-1]
    role: [role-1]
    model: [model-1]
  - name: [agent-2]
    role: [role-2]
    model: [model-2]
coordination:
  sync_points: [coordination-points]
  data_flow: [data-flow-pattern]
---

# [Command Name]

[Command implementation with parallel architecture]
```

## Quality Standards

### Command Structure Requirements
- Clear, descriptive command names
- Comprehensive descriptions with examples
- Proper agent definitions with specific roles
- Error handling and edge case management
- Documentation following Claude Code standards

### Agent Design Requirements
- Single responsibility principle
- Clear role definitions
- Appropriate model selection (Opus for reasoning, Sonnet for generation)
- Well-defined coordination mechanisms
- Proper error recovery procedures

### Documentation Standards
- Command overview with purpose statement
- Clear usage examples and scenarios
- Agent interaction diagrams
- Troubleshooting guides
- Best practices recommendations

## Error Handling Strategy

### Validation Points
1. **Requirements Phase**: Ensure clear command purpose
2. **Architecture Phase**: Validate design decisions
3. **Generation Phase**: Check template compliance
4. **Assembly Phase**: Verify component integration
5. **Final Review**: Comprehensive quality check

### Recovery Mechanisms
- Iterative refinement based on validation failures
- Alternative architecture suggestions
- Template fallbacks for complex scenarios
- User clarification prompts for ambiguous requirements

## Performance Optimization

### Parallel Execution Benefits
- Simultaneous template generation and documentation creation
- Parallel validation of different command aspects
- Concurrent agent definition and example generation
- Independent quality reviews of separate components

### Efficiency Measures
- Reusable template components
- Cached common patterns
- Incremental validation
- Smart defaults based on command type

## Usage Examples

### Example 1: Simple Automation Command
```
User: "I want a command that formats all TypeScript files in my project"
Output: Simple command with direct formatting logic and error handling
```

### Example 2: Expert Knowledge Command
```
User: "I need a command for comprehensive code reviews"
Output: Agent-based command with code-review specialist agent
```

### Example 3: Complex Workflow Command
```
User: "Create a command that researches, writes, and fact-checks articles"
Output: Parallel command with research, writing, and validation agents
```

## Best Practices Integration

### Claude Code Conventions
- Follow established naming patterns
- Use appropriate model selection
- Implement proper error handling
- Include comprehensive documentation
- Ensure consistent file structure

### Agent Design Principles
- Clear separation of concerns
- Appropriate expertise matching
- Efficient coordination mechanisms
- Robust error recovery
- Performance optimization

### Documentation Excellence
- Clear command descriptions
- Practical usage examples
- Agent interaction explanations
- Troubleshooting guidance
- Best practices recommendations

This meta-command represents the pinnacle of Claude Code command creation, combining sophisticated architecture analysis with practical implementation generation to produce high-quality, maintainable commands that follow all established best practices and conventions.