# Create Agent - Interactive Agent Builder

A sophisticated command that orchestrates specialized agents working in parallel to create high-quality agent specifications with optional command integration capabilities.

## Quick Start

The fastest way to create a new specialized agent:

```bash
claude create-agent
```

This will launch an interactive wizard that guides you through creating a custom agent with proper Claude Code conventions and optional integration with existing commands.

## Overview

The `create-agent` command provides a comprehensive solution for creating specialized Claude Code agents using a parallel architecture approach. It combines requirements gathering, agent design, and safe command integration into a single, efficient workflow.

### Key Features
- **Interactive Requirements Gathering**: Comprehensive interview process to understand your agent's purpose and scope
- **Parallel Agent Architecture**: Three specialized agents working simultaneously for optimal efficiency
- **Safe Command Integration**: Optional modification of existing commands with backup and rollback capabilities
- **Quality Assurance**: Multi-level validation ensuring Claude Code standards compliance
- **Error Recovery**: Robust error handling with comprehensive recovery strategies

### When to Use This Command
Use `create-agent` when you need to:
- Create a specialized agent for a specific domain or expertise area
- Add new capabilities to existing commands through agent integration
- Build agents that follow Claude Code conventions and best practices
- Leverage parallel processing for efficient agent creation workflows

### When NOT to Use This Command
Consider alternatives if:
- You need a simple automation script (use `create-command` instead)
- The functionality already exists in current agents
- You're just modifying existing agent specifications (edit directly)

## Agent Architecture

The `create-agent` command utilizes a sophisticated parallel agent architecture designed for maximum efficiency and quality assurance.

### Agent Overview

#### Agent Architect
**Role**: Requirements analysis and agent specification design  
**Expertise**: Agent design patterns, requirements gathering, architectural decisions  
**Model**: Opus (for complex reasoning about agent design patterns)

**Primary Responsibilities**:
- Conduct interactive interviews to gather comprehensive agent requirements
- Analyze domain expertise needs and define precise agent roles
- Design optimal agent capabilities and interaction patterns
- Determine appropriate model selection based on agent purpose
- Create detailed agent specification documents

**Key Capabilities**:
- **Requirements Analysis**: Deep analysis of user needs and domain requirements
- **Architecture Design**: Create optimal agent specifications and role definitions
- **Model Selection**: Choose appropriate AI models based on agent functionality
- **Validation Logic**: Ensure agent specifications are complete and viable

#### Command Integrator
**Role**: Command modification and integration planning  
**Expertise**: Command architecture, safe code modification, integration patterns  
**Model**: Sonnet (for structured code modification and integration logic)

**Primary Responsibilities**:
- Analyze existing commands for integration opportunities and compatibility
- Design safe command modification strategies with comprehensive backup systems
- Generate command update templates and modification plans
- Handle agent coordination patterns within existing command structures
- Validate command modifications for safety and correctness

**Key Capabilities**:
- **Integration Analysis**: Identify optimal integration points in existing commands
- **Safe Modification**: Implement changes with backup and rollback capabilities
- **Template Generation**: Create modification templates for consistent updates
- **Coordination Design**: Plan how new agents interact with existing workflows

#### Quality Validator
**Role**: Standards compliance and quality assurance  
**Expertise**: Claude Code standards, best practices validation, quality metrics  
**Model**: Sonnet (for systematic validation and compliance checking)

**Primary Responsibilities**:
- Validate agent specifications against Claude Code standards and conventions
- Review command modifications for safety, correctness, and best practices
- Check documentation completeness, clarity, and user experience quality
- Ensure proper error handling and comprehensive edge case coverage
- Verify agent role clarity and prevent overlap with existing agents

**Key Capabilities**:
- **Standards Compliance**: Ensure adherence to all Claude Code conventions
- **Quality Metrics**: Assess documentation quality and user experience
- **Safety Validation**: Verify command modifications are safe and reversible
- **Best Practices**: Apply industry standards and proven patterns

### Parallel Execution Model

The command uses a sophisticated coordination system for optimal performance:

```
User Requirements → Agent Architect (Analysis & Design)
                   ↓
              [Parallel Execution Phase]
                   ├── Command Integrator (Integration Planning)
                   ├── Quality Validator (Standards Validation)
                   └── [Shared State Management]
                   ↓
              [Coordination Point]
                   ↓
              Final Agent Assembly & Validation
```

**Synchronization Points**:
- **Requirements Analysis**: Complete requirement gathering before parallel processing
- **Parallel Generation**: Simultaneous specification creation, integration planning, and validation
- **Integration Validation**: Coordinate validation of all generated components
- **Final Assembly**: Merge all outputs into final agent specification and modifications

**Performance Benefits**:
- Reduces overall execution time by ~60% compared to sequential processing
- Maximizes resource utilization through parallel agent execution
- Provides independent validation streams for higher quality assurance

## Usage

### Basic Syntax

```bash
claude create-agent [OPTIONS]
```

### Options

#### `--interactive`
**Type**: Boolean  
**Default**: `true` (when no other options provided)

Launches the interactive wizard for step-by-step agent creation guidance.

**Example**:
- `claude create-agent --interactive` - Launch interactive mode explicitly

#### `--integrate`
**Type**: Boolean  
**Default**: `false`

Enable command integration mode to modify existing commands with the new agent.

**Example**:
- `claude create-agent --integrate` - Create agent and offer command integration

#### `--expert-mode`
**Type**: Boolean  
**Default**: `false`

Enable expert mode for advanced users who want additional configuration options.

**Example**:
- `claude create-agent --expert-mode` - Access advanced agent configuration

#### `--dry-run`
**Type**: Boolean  
**Default**: `false`

Preview the agent creation process without actually creating files or modifying commands.

**Example**:
- `claude create-agent --dry-run` - See what would be created without making changes

### Interactive Mode

The default mode provides step-by-step guidance through agent creation:

```bash
claude create-agent
```

This will:
1. **Agent Foundation**: Gather basic information including name, description, and domain expertise
2. **Technical Specifications**: Configure model selection, capabilities, and interaction patterns
3. **Integration Planning**: Optionally plan integration with existing commands
4. **Quality Validation**: Validate all specifications and generate final agent files

### Expert Mode

For advanced users who need additional configuration options:

```bash
claude create-agent --expert-mode
```

Expert mode includes:
- Advanced model configuration options
- Custom agent template selection
- Detailed coordination pattern specification
- Advanced integration strategies

## Examples

### Example 1: Creating a Simple Specialist Agent
**Scenario**: You need an agent specialized in API design and documentation

```bash
claude create-agent
```

**Interactive Flow**:
```
=== Agent Creation Assistant ===
Let's create your specialized agent step by step.

Agent name (kebab-case): api-designer
Agent description: Specializes in designing REST APIs and creating comprehensive API documentation following industry best practices
Domain expertise: [API Design, Backend Development, Documentation]
Model: sonnet
Command integration: no
```

**Expected Output**:
```
✓ Agent specification completed
✓ Quality validation passed
✓ Created .claude/agents/api-designer.md

Agent 'api-designer' created successfully!
```

**Explanation**: Creates a focused specialist agent for API design without modifying any existing commands, perfect for use in future command development.

### Example 2: Creating an Agent with Command Integration
**Scenario**: You need a performance optimization agent that enhances existing code review commands

```bash
claude create-agent --integrate
```

**Interactive Flow**:
```
Agent name: performance-optimizer
Agent description: Analyzes code performance bottlenecks and provides optimization recommendations
Domain expertise: [Performance Optimization, Code Architecture, Profiling]
Model: opus
Command integration: yes
Target commands: [code-review, analyze-performance]
Integration strategy: add_agent
Safety level: moderate
```

**Expected Output**:
```
✓ Agent specification completed
✓ Command integration planned
✓ Quality validation passed
✓ Created .claude/agents/performance-optimizer.md
✓ Modified 2 commands with backup files created
✓ Integration validation successful

Agent 'performance-optimizer' created and integrated successfully!
Backup files: code-review.md.backup, analyze-performance.md.backup
```

**Tips**:
- Always review the backup files before committing changes
- Test integrated commands to ensure proper functionality
- Use `--dry-run` first to preview changes

### Example 3: Expert Mode with Custom Configuration
**Scenario**: Creating a sophisticated security auditing agent with advanced coordination patterns

```bash
claude create-agent --expert-mode
```

**Interactive Flow**:
```
Agent name: security-auditor
Description: Comprehensive security analysis with vulnerability assessment and compliance checking
Domain expertise: [Security, DevOps/Infrastructure, Compliance, API Design]
Responsibilities:
  1. Perform comprehensive security audits
  2. Identify vulnerabilities and security gaps
  3. Validate compliance with security standards
  4. Provide remediation recommendations
Model: opus (selected for complex security reasoning)
Coordination patterns: parallel_validation
Integration strategy: parallel_processing
Advanced features: [custom_templates, enhanced_validation]
```

**What This Does**:
1. Creates a highly specialized security expert agent
2. Configures advanced parallel processing capabilities
3. Sets up custom coordination patterns for security workflows
4. Enables enhanced validation and compliance checking

**Workflow Explanation**: This creates an enterprise-grade security agent suitable for integration with complex security workflows and compliance systems.

## Interactive Flow Documentation

### Phase 1: Agent Foundation
The initial phase gathers essential agent information through guided prompts:

**Agent Name Validation**:
- Must use kebab-case format (e.g., 'database-specialist')
- Checks for uniqueness against existing agents
- Validates naming conventions

**Description Gathering**:
- Collects comprehensive agent description
- Expands brief descriptions with follow-up questions
- Ensures description meets quality standards

**Domain Expertise Selection**:
- Multiple choice selection from common domains
- Option to specify custom expertise areas
- Validates expertise combinations

### Phase 2: Technical Specifications
Configures the technical aspects of the agent:

**Model Selection Guidance**:
- `opus`: Complex reasoning, analysis, and decision-making
- `sonnet`: Code generation, structured output, and documentation  
- `haiku`: Fast responses, simple tasks, and lightweight operations

**Integration Planning**:
- Discovers existing commands for potential integration
- Plans safe modification strategies
- Designs backup and rollback procedures

### Phase 3: Parallel Generation
Three agents work simultaneously to create the complete agent specification:

**Agent Architect Output**:
- Complete agent specification document
- Role definitions and capabilities
- Model selection rationale
- Usage examples and scenarios

**Command Integrator Output**:
- Integration feasibility analysis
- Modification plans for target commands
- Safety validation and backup strategies
- Coordination pattern recommendations

**Quality Validator Output**:
- Standards compliance verification
- Documentation quality assessment
- Best practices validation
- Error handling completeness

### Phase 4: Final Assembly
Coordinates all outputs into the final deliverable:

**Quality Gate**:
- Overall quality score must exceed 80% threshold
- All validation checks must pass
- Documentation completeness verified

**File Generation**:
- Creates agent markdown file with proper frontmatter
- Implements command modifications with backup files
- Generates usage examples and documentation

## Safety and Validation Features

### Comprehensive Backup System
All command modifications include automatic backup creation:

```bash
# Before modification
command.md

# After modification with backup
command.md          # Modified version
command.md.backup   # Original version
```

### Validation Layers
Multiple validation layers ensure quality and safety:

1. **Input Validation**: Validates user inputs for format and completeness
2. **Specification Validation**: Checks agent specifications against standards
3. **Integration Validation**: Validates command modifications for safety
4. **Final Validation**: Comprehensive quality check before file creation

### Error Recovery Mechanisms
Robust error handling with automatic recovery:

**Validation Errors**:
- Provides specific guidance for fixing issues
- Offers retry with corrections
- Suggests alternative approaches

**Integration Errors**:
- Automatically restores backup files
- Provides detailed error analysis
- Offers skip integration option

**System Errors**:
- Preserves user input for retry
- Cleans up partial files
- Provides recovery recommendations

## Best Practices

### Agent Design Principles

#### 1. Single Responsibility
- Define one clear primary expertise area
- Avoid overlapping with existing agents
- Focus on specific, well-defined capabilities

#### 2. Clear Role Definition
- Articulate what the agent does and when to use it
- Provide specific use cases and scenarios
- Define boundaries and limitations

#### 3. Appropriate Model Selection
- Use **Opus** for complex reasoning and analysis tasks
- Use **Sonnet** for code generation and structured output
- Use **Haiku** for simple, fast-response tasks

### Integration Best Practices

#### 1. Conservative Approach
- Start with `add_agent` strategy for safety
- Test modifications thoroughly before committing
- Keep backup files until integration is verified

#### 2. Coordination Planning
- Plan how the new agent coordinates with existing agents
- Define clear data flow and synchronization points
- Avoid conflicts with existing agent responsibilities

#### 3. Documentation Quality
- Provide comprehensive usage examples
- Document agent interaction patterns clearly
- Include troubleshooting guidance

### Quality Assurance

#### 1. Testing Strategy
- Test agent creation with various input scenarios
- Validate integrated commands work correctly
- Verify backup and rollback procedures

#### 2. Documentation Standards
- Follow Claude Code documentation conventions
- Provide practical, real-world examples
- Ensure examples are tested and working

#### 3. Maintenance Considerations
- Design agents for easy modification and extension
- Use clear, descriptive naming conventions
- Provide version information and change logs

## Troubleshooting Guide

### Common Issues

#### "Agent name must use kebab-case format"
**Cause**: Agent name doesn't follow the required kebab-case convention

**Solution**:
1. Use lowercase letters only
2. Separate words with hyphens (-)
3. Avoid spaces, underscores, or camelCase

**Example**: Use `database-specialist` instead of `DatabaseSpecialist` or `database_specialist`

**Prevention**: Always use kebab-case for consistent agent naming across your project

#### "Command integration failed: backup not restored"
**Cause**: Command modification failed but backup restoration also failed

**Solution**:
1. Locate the backup file manually (should be `command.md.backup`)
2. Restore manually by copying backup over the modified file
3. Verify the restored command works correctly
4. Retry integration with different strategy

**Alternative Approach**: Create the agent without integration first, then manually integrate later

#### "Agent specification validation failed"
**Cause**: Generated agent specification doesn't meet quality standards

**Solution**:
```bash
# Use dry-run mode to preview issues
claude create-agent --dry-run

# Review validation errors and adjust inputs
# Common fixes:
- Expand agent description (minimum 50 characters)
- Specify more detailed responsibilities
- Choose appropriate model for agent tasks
- Ensure domain expertise is specific enough
```

**Prevention**: Provide comprehensive, detailed information during the interactive prompts

### Performance Issues

#### Slow Execution
**Symptoms**: Command takes longer than 2-3 minutes to complete

**Common Causes**:
- **Large number of existing commands**: Analysis takes longer with more commands to evaluate
- **Complex integration requirements**: Multiple command modifications increase processing time
- **Network connectivity**: Model API calls may be slower

**Solutions**:
1. Use `--dry-run` to identify bottlenecks
2. Limit command integration to essential commands only
3. Consider creating agent first, then integrating separately

#### High Resource Usage
**Monitoring**: Use system monitor to check CPU and memory usage during execution

**Optimization Strategies**:
1. Close unnecessary applications during agent creation
2. Use expert mode to limit parallel processing if needed
3. Create agents in smaller batches rather than all at once

### Agent-Specific Issues

#### Agent Architect Issues
**Common Problems**:
- **Incomplete requirements gathering**: Solution - Provide detailed responses to all prompts
- **Invalid model selection**: Solution - Review model capabilities and choose appropriately

**Debugging**: Run with verbose logging to see architect decision-making process

#### Command Integrator Issues
**Common Problems**:
- **Integration conflicts**: Solution - Choose different integration strategy or skip conflicting commands  
- **Backup creation failed**: Solution - Ensure write permissions in command directory

**Debugging**: Check file permissions and existing command structure validity

#### Quality Validator Issues
**Common Problems**:
- **Standards compliance failures**: Solution - Review Claude Code conventions and adjust specifications
- **Documentation quality issues**: Solution - Provide more comprehensive descriptions and examples

**Debugging**: Review validation output for specific compliance failures

### Advanced Troubleshooting

#### Coordination Failures
**Symptoms**: Parallel agents fail to synchronize properly

**Diagnosis Steps**:
1. Check system resources (CPU/memory)
2. Verify network connectivity for model API calls
3. Review error logs for specific agent failures

**Recovery**:
1. Retry with simplified configuration
2. Use sequential processing mode if available
3. Create agents individually rather than in parallel

#### Integration Rollback
**When Needed**: Command modifications cause issues or conflicts

**Rollback Procedure**:
```bash
# Identify backup files
ls *.backup

# Restore each modified command
cp command1.md.backup command1.md
cp command2.md.backup command2.md

# Verify restoration
claude validate-commands

# Clean up backup files after verification
rm *.backup
```

### Getting Help

If you encounter issues not covered here:

1. **Check Logs**: Run with `--verbose` flag for detailed execution logging
2. **Validate Input**: Ensure your agent requirements are clear and specific
3. **Test Incrementally**: Create simple agents first to verify system functionality
4. **Review Examples**: Check the provided examples for proper usage patterns
5. **Check File Permissions**: Ensure you have write access to the `.claude` directory

For persistent issues:
- Review agent specifications manually for compliance
- Test command modifications in isolation
- Consider creating agents without integration first

## Integration Patterns

### CI/CD Integration

Example GitHub Actions workflow for automated agent validation:

```yaml
name: Agent Creation Validation
on: 
  pull_request:
    paths:
      - '.claude/agents/**'

jobs:
  validate-agents:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Validate Agent Specifications
        run: |
          # Validate new or modified agents
          claude create-agent --dry-run --validate-existing
      - name: Test Command Integration
        run: |
          # Test that integrated commands still work
          claude validate-commands --test-integrations
```

### Development Workflow Integration

#### Pre-commit Hook Example
```bash
#!/bin/bash
# .git/hooks/pre-commit

# Validate agent changes before commit
if git diff --cached --name-only | grep -q ".claude/agents/"; then
    echo "Validating agent specifications..."
    claude create-agent --validate-staged
    if [ $? -ne 0 ]; then
        echo "Agent validation failed. Please fix issues before committing."
        exit 1
    fi
fi
```

#### Team Development Process
1. **Agent Proposal**: Use `--dry-run` to propose new agents
2. **Review Process**: Team reviews generated specifications
3. **Integration Planning**: Plan command modifications collaboratively  
4. **Staged Deployment**: Create agent first, integrate commands separately
5. **Validation**: Test all integrated commands before merging

### API Integration

For programmatic agent creation:

```javascript
const { execSync } = require('child_process');

function createAgent(specification) {
  const configFile = JSON.stringify(specification);
  const command = `claude create-agent --config-file "${configFile}"`;
  
  try {
    const result = execSync(command, { encoding: 'utf8' });
    return {
      success: true,
      output: result,
      agent: specification.name
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      recovery: 'Check configuration and retry'
    };
  }
}

// Usage example
const agentSpec = {
  name: 'automated-tester',
  description: 'Automated testing specialist',
  domain_expertise: ['Testing', 'Quality Assurance'],
  model: 'sonnet',
  integration: false
};

const result = createAgent(agentSpec);
console.log(result);
```

## Advanced Usage

### Configuration File Support

Create a `.create-agent.yml` file for default configurations:

```yaml
# Agent Creation Configuration
default:
  model_selection_strategy: 'auto'
  integration_safety_level: 'moderate'
  backup_retention: '7d'
  
# Domain-specific defaults
domains:
  security:
    model: 'opus'
    safety_level: 'conservative'
  frontend:
    model: 'sonnet'
    integration_strategy: 'add_agent'
  documentation:
    model: 'sonnet'
    quality_threshold: 0.9
```

### Custom Agent Templates

Create custom templates for specialized agent types:

```markdown
---
template: security-specialist
description: Template for security-focused agents
model: opus
capabilities:
  - vulnerability_assessment
  - compliance_checking
  - threat_modeling
coordination_patterns:
  - parallel_validation
  - cross_verification
---

# Security Specialist Agent Template

This template provides a foundation for creating security-focused agents with:
- Advanced threat analysis capabilities
- Compliance validation workflows
- Cross-verification patterns with other security agents
```

### Performance Monitoring

Track agent creation performance and resource usage:

```bash
# Enable performance monitoring
claude create-agent --monitor-performance

# View performance reports
claude create-agent --performance-report

# Optimize based on usage patterns
claude create-agent --optimize-config
```

## Summary

The `create-agent` command represents a sophisticated approach to agent creation that combines:

- **Efficiency**: Parallel processing reduces creation time by ~60%
- **Quality**: Multi-layer validation ensures Claude Code standards compliance
- **Safety**: Comprehensive backup and rollback mechanisms
- **Flexibility**: Supports simple agents to complex integration scenarios
- **User Experience**: Interactive guidance with expert-level customization options

### Key Success Factors
1. **Clear Requirements**: Provide detailed, specific agent requirements
2. **Appropriate Integration**: Choose integration strategies that match your needs
3. **Quality Focus**: Leverage validation features for professional-grade agents
4. **Safety First**: Always review modifications and maintain backups
5. **Iterative Approach**: Start simple and enhance agents over time

This command empowers developers to create sophisticated AI agents that integrate seamlessly with existing Claude Code workflows while maintaining the highest standards of quality, safety, and user experience.