---
name: modify-command
description: Optimize and enhance existing Claude Code commands for maximum speed and efficiency through parallel agent analysis
agents:
  - name: command-architect
    role: Analyze command structure and workflow optimization opportunities
    model: sonnet
  - name: claude-code-optimizer
    role: Review Claude usage patterns and tool efficiency optimizations
    model: sonnet
coordination:
  sync_points: ["parallel_analysis", "synthesis", "implementation"]
  data_flow: "parallel → synthesis → coordinated_implementation"
---

# Modify Command - Advanced Command Optimization Engine

A sophisticated meta-command that analyzes and optimizes existing Claude Code commands through parallel agent review, focusing on execution speed, efficiency, and performance improvements.

## Command Overview

This command orchestrates two specialized agents working in parallel to comprehensively analyze an existing command, identify optimization opportunities, and implement performance enhancements while maintaining functionality and reliability.

## Agent Architecture

### Parallel Analysis Topology
```
Existing Command → [Parallel Analysis Phase]
                     ├── Command Architect (Workflow & Structure)
                     └── Claude Code Optimizer (Tool Usage & Efficiency)
                     ↓
                [Synthesis & Coordination Point]
                     ↓
                Implementation & Optimization
                     ↓
                Enhanced Command Output
```

### Agent Specifications

#### 1. Command Architect Agent
**Role**: Structural and workflow optimization analysis
**Model**: Sonnet (for systematic analysis)
**Focus Areas**:
- Command structure and organization
- Agent coordination efficiency
- Workflow bottlenecks identification
- Parallel execution opportunities
- Error handling optimization
- User experience improvements

**Analysis Framework**:
- **Structural Review**: Command organization, agent definitions, coordination patterns
- **Workflow Analysis**: Sequential vs parallel execution opportunities
- **Bottleneck Identification**: Performance limiting factors in current design
- **Architecture Recommendations**: Structural improvements for better efficiency

#### 2. Claude Code Optimizer Agent
**Role**: Claude usage patterns and tool efficiency analysis
**Model**: Sonnet (for technical optimization)
**Focus Areas**:
- Tool usage efficiency and batching opportunities
- Model selection optimization
- Context usage minimization
- Prompt engineering improvements
- Resource utilization analysis
- Performance measurement strategies

**Analysis Framework**:
- **Tool Usage Patterns**: Identify inefficient tool calls and batching opportunities
- **Model Selection**: Optimize agent model choices for performance vs quality
- **Context Management**: Minimize token usage while maintaining effectiveness
- **Claude Integration**: Leverage Claude Code features more effectively

## Execution Flow

### Phase 1: Command Analysis Preparation
1. **Load existing command** for analysis
2. **Parse command structure** including agents, coordination, and implementation
3. **Identify command complexity** and current architecture pattern
4. **Prepare analysis contexts** for both specialist agents

### Phase 2: Parallel Analysis Phase
**Concurrent Execution** of both agents:

#### Command Architect Analysis:
- Evaluate current command structure and organization
- Identify workflow bottlenecks and sequential dependencies
- Analyze agent coordination efficiency
- Assess error handling and recovery mechanisms
- Determine opportunities for parallel execution
- Review user interaction patterns

#### Claude Code Optimizer Analysis:
- Review tool usage patterns and identify batching opportunities
- Analyze model selection and resource allocation
- Evaluate context usage and token efficiency
- Assess prompt engineering and interaction patterns
- Identify Claude Code feature utilization gaps
- Review performance measurement approaches

### Phase 3: Synthesis and Coordination
1. **Aggregate findings** from both parallel analyses
2. **Identify overlapping recommendations** and consolidate improvements
3. **Prioritize optimizations** based on impact and implementation complexity
4. **Resolve conflicts** between different optimization approaches
5. **Create unified optimization plan** with specific implementation steps

### Phase 4: Implementation and Enhancement
1. **Apply structural optimizations** from command architect recommendations
2. **Implement tool efficiency improvements** from Claude optimizer suggestions
3. **Enhance agent coordination** and parallel execution patterns
4. **Optimize resource usage** and context management
5. **Add performance monitoring** and measurement capabilities
6. **Update documentation** to reflect optimizations

## Interactive Command Interface

### Command Invocation
```bash
/modify-command [command-name] [--analysis-only] [--implement-all] [--focus=area]
```

### Parameters
- `command-name`: Name of the existing command to optimize
- `--analysis-only`: Perform analysis without implementing changes
- `--implement-all`: Auto-implement all recommended optimizations
- `--focus=area`: Focus on specific optimization area (structure, tools, performance)

### Interactive Workflow
1. **Command Selection**: Choose existing command to optimize
2. **Analysis Scope**: Confirm optimization focus areas
3. **Review Findings**: Present parallel analysis results
4. **Implementation Choice**: Select which optimizations to apply
5. **Validation**: Test optimized command functionality

## Optimization Categories

### 1. Structural Optimizations
- **Agent Coordination**: Improve parallel execution patterns
- **Workflow Streamlining**: Remove unnecessary sequential dependencies
- **Error Handling**: Enhance recovery mechanisms and user feedback
- **Code Organization**: Improve command structure and readability

### 2. Tool Efficiency Optimizations
- **Batch Operations**: Combine multiple tool calls into single operations
- **Tool Selection**: Choose most appropriate tools for specific tasks
- **Context Management**: Minimize token usage through efficient prompting
- **Caching Strategies**: Implement result caching for repeated operations

### 3. Performance Optimizations
- **Parallel Execution**: Maximize concurrent agent operations
- **Resource Utilization**: Optimize model selection and usage patterns
- **Response Time**: Minimize user waiting time through efficient workflows
- **Scalability**: Ensure command performs well with varying complexity

### 4. Claude Code Integration Optimizations
- **Feature Utilization**: Leverage advanced Claude Code capabilities
- **Best Practices**: Apply latest Claude Code conventions and patterns
- **Integration Efficiency**: Optimize Claude-specific tool usage
- **User Experience**: Improve interaction patterns and feedback

## Analysis Report Structure

### Executive Summary
- Current command performance assessment
- Key optimization opportunities identified
- Expected performance improvements
- Implementation complexity evaluation

### Detailed Findings

#### Command Architect Analysis
```markdown
## Structural Analysis
- Current Architecture: [assessment]
- Workflow Bottlenecks: [identified issues]
- Coordination Efficiency: [current state]
- Recommended Improvements: [specific suggestions]

## Performance Impact
- Execution Time: [current vs projected]
- User Experience: [improvement areas]
- Reliability: [enhancement opportunities]
```

#### Claude Code Optimizer Analysis
```markdown
## Tool Usage Analysis
- Current Patterns: [assessment]
- Efficiency Opportunities: [batching, selection]
- Context Optimization: [token usage improvements]
- Claude Integration: [feature utilization gaps]

## Technical Optimizations
- Model Selection: [optimization recommendations]
- Resource Usage: [efficiency improvements]
- Performance Monitoring: [measurement strategies]
```

### Implementation Plan
- **Priority 1**: Critical performance optimizations
- **Priority 2**: Structural improvements
- **Priority 3**: Enhanced features and user experience
- **Timeline**: Estimated implementation effort
- **Risk Assessment**: Potential issues and mitigation strategies

## Quality Assurance Framework

### Optimization Validation
1. **Functional Testing**: Ensure optimized command maintains all original functionality
2. **Performance Measurement**: Quantify speed and efficiency improvements
3. **Regression Testing**: Verify no existing features are broken
4. **User Experience Testing**: Confirm improved interaction patterns

### Success Metrics
- **Execution Speed**: Measurable reduction in command completion time
- **Resource Efficiency**: Reduced token usage and improved tool utilization
- **User Satisfaction**: Enhanced interaction patterns and feedback quality
- **Reliability**: Maintained or improved error handling and recovery

## Advanced Features

### Optimization Profiles
- **Speed Focused**: Maximum performance improvements
- **Efficiency Focused**: Resource usage optimization
- **Reliability Focused**: Enhanced error handling and robustness
- **User Experience Focused**: Improved interaction and feedback patterns

### Continuous Optimization
- **Performance Monitoring**: Track command performance over time
- **Usage Analytics**: Identify optimization opportunities from real usage
- **Automated Suggestions**: Proactive optimization recommendations
- **Version Tracking**: Maintain optimization history and rollback capabilities

## Integration with Existing Commands

### Command Discovery
- Automatically scan `.claude/commands/` directory
- Parse existing command structures and metadata
- Identify optimization candidates based on complexity and usage

### Optimization History
- Track applied optimizations and their impact
- Maintain version history for rollback capabilities
- Store performance benchmarks and improvement metrics

### Best Practices Integration
- Apply latest Claude Code conventions automatically
- Suggest modern patterns and architectural improvements
- Ensure compliance with current best practices

## Usage Examples

### Example 1: Optimizing a Simple Command
```bash
/modify-command format-code --focus=tools
```
**Analysis**: Identifies batching opportunities for file operations
**Optimization**: Combines multiple file reads into parallel operations
**Result**: 60% reduction in execution time

### Example 2: Enhancing Complex Workflow
```bash
/modify-command comprehensive-review --implement-all
```
**Analysis**: Reviews multi-agent coordination and tool usage
**Optimization**: Implements parallel agent execution and tool batching
**Result**: 45% faster execution with improved error handling

### Example 3: Analysis-Only Mode
```bash
/modify-command deploy-pipeline --analysis-only
```
**Output**: Detailed optimization report without making changes
**Usage**: Planning optimization strategy before implementation

## Error Handling and Recovery

### Analysis Phase Errors
- **Command Not Found**: Guide user to correct command location
- **Parse Errors**: Provide specific feedback on command structure issues
- **Analysis Failures**: Fallback to partial analysis with user guidance

### Implementation Phase Errors
- **Optimization Conflicts**: Present user choices for resolution
- **Implementation Failures**: Maintain original command as backup
- **Testing Failures**: Provide detailed error analysis and rollback options

### Recovery Mechanisms
- **Automatic Backup**: Save original command before modifications
- **Incremental Implementation**: Apply optimizations in stages
- **Rollback Capability**: Restore previous version if issues arise
- **Validation Checkpoints**: Verify functionality at each optimization step

## Performance Benchmarking

### Metrics Collection
- **Execution Time**: Before and after optimization measurements
- **Resource Usage**: Token consumption and tool call efficiency
- **Success Rate**: Command completion and error rate tracking
- **User Feedback**: Interaction quality and satisfaction metrics

### Reporting
- **Performance Dashboard**: Visual representation of improvements
- **Optimization History**: Track changes and their impact over time
- **Comparative Analysis**: Benchmark against similar commands
- **Recommendations**: Suggest further optimization opportunities

This advanced meta-command represents the pinnacle of Claude Code command optimization, providing comprehensive analysis and implementation capabilities to maximize the performance and efficiency of existing commands through sophisticated parallel agent coordination and evidence-based optimization strategies.