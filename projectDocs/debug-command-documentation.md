# Debug Command Documentation

## Table of Contents
1. [Command Overview](#command-overview)
2. [Architecture Deep Dive](#architecture-deep-dive)
3. [Usage Guide](#usage-guide)
4. [Agent Interaction Patterns](#agent-interaction-patterns)
5. [Performance & Resource Usage](#performance--resource-usage)
6. [Best Practices](#best-practices)
7. [Troubleshooting Guide](#troubleshooting-guide)
8. [Integration Guide](#integration-guide)
9. [Advanced Configuration](#advanced-configuration)

---

## Command Overview

The **Debug Command** is an AI-powered debugging system that leverages 11 specialized agents across 4 coordinated phases to identify, analyze, and resolve complex software issues with unprecedented thoroughness and accuracy.

### Quick Start

The fastest way to start debugging an issue:

```bash
claude debug "Your issue description here"
```

This will automatically classify, analyze, and provide comprehensive solutions for your problem.

### Key Features

- **Multi-Agent Architecture**: 11 specialized AI agents with domain expertise
- **Staged Parallel Processing**: 4-phase execution with intelligent coordination
- **Comprehensive Analysis**: Covers frontend, backend, infrastructure, and testing
- **Smart Model Selection**: Opus for strategic decisions, Sonnet for specialized tasks
- **Multiple Output Modes**: Auto-fix, guided, report, and interactive modes
- **Production Ready**: Robust error handling and recovery mechanisms

### When to Use This Command

Use the debug command when you need to:
- Resolve complex multi-domain software issues
- Get comprehensive root cause analysis
- Receive validated, implementable solutions
- Understand cross-system impacts and dependencies
- Generate professional-quality fix documentation

### When NOT to Use This Command

Consider simpler alternatives if:
- The issue has an obvious, single-line fix
- You need immediate hot-fixes without analysis
- The problem is purely informational or conceptual
- You're working with highly sensitive or proprietary code

---

## Architecture Deep Dive

### System Architecture Overview

The debug command implements a sophisticated staged parallel architecture designed for maximum efficiency and comprehensive analysis:

```
┌─────────────────────────────────────────────────────────────────┐
│                        DEBUG COMMAND ARCHITECTURE              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    PHASE 1: CLASSIFICATION              │   │
│  │  User Input → issue-classifier → diagnostic-collector   │   │
│  │                   (Sequential Execution)                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ▼                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 PHASE 2: PARALLEL ANALYSIS             │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐ │   │
│  │  │code-        │  │backend-      │  │frontend-        │ │   │
│  │  │archivist    │  │engineer      │  │engineer         │ │   │
│  │  │(Opus)       │  │(Sonnet)      │  │(Sonnet)         │ │   │
│  │  └─────────────┘  └──────────────┘  └─────────────────┘ │   │
│  │  ┌─────────────┐  ┌──────────────┐                       │   │
│  │  │infra-       │  │test-         │    Max 5 Concurrent   │   │
│  │  │specialist   │  │analyst       │                       │   │
│  │  │(Sonnet)     │  │(Sonnet)      │                       │   │
│  │  └─────────────┘  └──────────────┘                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ▼                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               PHASE 3: SOLUTION SYNTHESIS              │   │
│  │  Analysis Results → solution-architect → fix-validator │   │
│  │                   (Strategic Validation)               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ▼                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              PHASE 4: IMPLEMENTATION                   │   │
│  │  Solution → template-generator → github-repo-manager   │   │
│  │            (Code Generation & Deployment)              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Model Assignment Strategy

The system uses strategic model assignments optimized for different types of cognitive work:

#### Claude-3-Opus Agents (Strategic & Complex Reasoning)
- **issue-classifier**: Requires deep analytical reasoning for problem categorization
- **code-archivist**: Needs architectural understanding and pattern recognition
- **solution-architect**: Complex synthesis and system design
- **fix-validator**: Critical validation requiring careful risk assessment

#### Claude-3.5-Sonnet Agents (Specialized & Efficient Execution)
- **diagnostic-collector**: Efficient data gathering and organization
- **backend-engineer**: Specialized technical domain expertise
- **frontend-engineer**: Specialized technical domain expertise
- **infrastructure-specialist**: Specialized technical domain expertise
- **test-analyst**: Specialized technical domain expertise
- **template-generator**: Efficient code generation and templating
- **github-repo-manager**: Efficient repository operations

### Phase-by-Phase Architecture

#### Phase 1: Classification & Context Gathering
**Architecture Pattern**: Sequential Pipeline
**Coordination**: Blocking synchronization points
**Purpose**: Establish shared understanding and diagnostic foundation

```
User Input → [issue-classifier] → Classification Results
                      ▼
           [diagnostic-collector] → Structured Diagnostics
                      ▼
              Shared Context Created
```

**Data Flow**:
1. User input processed by issue-classifier (Opus)
2. Classification results feed into diagnostic-collector (Sonnet)
3. Combined results stored in shared context for downstream phases

#### Phase 2: Parallel Analysis 
**Architecture Pattern**: Fan-out/Fan-in with Bounded Parallelism
**Coordination**: ThreadPoolExecutor with max_workers=5
**Purpose**: Comprehensive domain-specific analysis

```
Shared Context → ┌─[code-archivist]─────┐
                 ├─[backend-engineer]───┤
                 ├─[frontend-engineer]──┤ → Analysis Results
                 ├─[infrastructure]────┤
                 └─[test-analyst]──────┘
```

**Execution Characteristics**:
- **Parallelism**: Up to 5 agents execute simultaneously
- **Timeout**: 120 seconds per agent with individual failure handling
- **Synchronization**: Barrier synchronization waits for all agents
- **Error Strategy**: Graceful degradation allows partial success

#### Phase 3: Solution Synthesis & Validation
**Architecture Pattern**: Sequential Synthesis Pipeline
**Coordination**: Dependent execution with validation gates
**Purpose**: Create and validate comprehensive solutions

```
Analysis Results → [solution-architect] → Solution Design
                           ▼
                   [fix-validator] → Validated Solution
```

**Quality Gates**:
- Solution completeness verification
- Risk assessment and mitigation planning
- Cross-domain impact analysis
- Implementation feasibility validation

#### Phase 4: Implementation & Documentation
**Architecture Pattern**: Sequential Implementation Pipeline
**Coordination**: Dependent execution with artifact generation
**Purpose**: Generate implementable solutions and documentation

```
Validated Solution → [template-generator] → Implementation Templates
                             ▼
                   [github-repo-manager] → Repository Changes
```

### Coordination Mechanisms

#### Synchronization Points
The system defines explicit synchronization points for phase coordination:

1. **classification_complete**: Phase 1 → Phase 2 transition
2. **context_gathered**: Diagnostic data ready for analysis
3. **parallel_analysis_complete**: Phase 2 → Phase 3 transition
4. **solution_validated**: Phase 3 → Phase 4 transition
5. **implementation_ready**: Final completion checkpoint

#### Shared Context Management
```python
shared_context = {
    'classification': {...},        # From issue-classifier
    'diagnostics': {...},          # From diagnostic-collector  
    'parallel_analysis': {...},    # From all Phase 2 agents
    'solution_design': {...},      # From solution-architect
    'validation': {...},           # From fix-validator
    'original_request': {...}      # Preserved user input
}
```

#### Error Propagation Strategy
- **Critical Agent Failure**: Blocks execution, triggers retry with exponential backoff
- **Non-Critical Agent Failure**: Continues with warning, reduces analysis depth
- **Phase Failure**: Fails entire command with comprehensive error reporting
- **Partial Success**: Provides partial results with clear limitation disclosure

---

## Usage Guide

### Basic Syntax

```bash
claude debug [OPTIONS] "<issue_description>"
```

### Command Options

#### `--severity, -s`
**Type**: String (critical, high, medium, low)
**Default**: medium
**Description**: Sets issue severity for prioritization and resource allocation

**Examples**:
- `--severity critical` - System down, requires immediate attention
- `--severity high` - Major functionality broken, impacts users
- `--severity medium` - Some functionality impaired (default)
- `--severity low` - Minor issues or improvements

#### `--mode, -m`
**Type**: String (auto-fix, guided, report, interactive)
**Default**: guided
**Description**: Controls output format and interaction level

**Examples**:
- `--mode auto-fix` - Automatically implement recommended fixes
- `--mode guided` - Step-by-step guidance with user confirmation
- `--mode report` - Generate analysis report without implementation
- `--mode interactive` - Full interactive experience with dynamic questioning

#### `--domains, -d`
**Type**: String (comma-separated)
**Description**: Hint at likely affected domains for focused analysis

**Examples**:
- `--domains frontend,backend` - Focus on client and server-side issues
- `--domains infrastructure` - Deployment and operational issues
- `--domains testing,security` - Quality and security concerns

#### `--output, -o`
**Type**: String (file path)
**Description**: Save detailed results to specified file

**Examples**:
- `--output debug-report.json` - Save as JSON for programmatic use
- `--output analysis.md` - Save as Markdown for documentation

#### `--timeout, -t`
**Type**: Integer (seconds)
**Default**: 300
**Description**: Maximum execution time for entire debug process

#### `--parallel-workers, -w`
**Type**: Integer  
**Default**: 5
**Description**: Number of concurrent agents in Phase 2 analysis

### Interactive Mode

Interactive mode provides the most comprehensive debugging experience:

```bash
claude debug --interactive
```

**Interactive Flow**:
1. **Issue Description**: Detailed multi-line issue description
2. **Severity Assessment**: Guided severity selection with impact examples
3. **Domain Hints**: Optional domain specification for focused analysis
4. **Reproduction Steps**: Step-by-step reproduction guidance
5. **Environment Details**: Automatic environment profiling
6. **Real-time Progress**: Live updates during analysis phases
7. **Solution Review**: Interactive solution review and customization

### Batch Mode

For processing multiple related issues:

```bash
claude debug --batch --input-file "issues.json"
```

**Input File Format**:
```json
{
  "issues": [
    {
      "description": "React component not rendering",
      "severity": "medium",
      "domains": ["frontend"],
      "reproduction_steps": [
        "Navigate to user dashboard",
        "Click on profile settings", 
        "Component fails to load"
      ]
    },
    {
      "description": "API timeout during peak traffic",
      "severity": "high", 
      "domains": ["backend", "infrastructure"]
    }
  ]
}
```

---

## Agent Interaction Patterns

### Pattern 1: Sequential Dependency Chain

Used in Phase 1 and Phase 3 where agents have strict dependencies:

```
Agent A → Result A → Agent B → Result B → Shared Context
```

**Characteristics**:
- Blocking execution - Agent B waits for Agent A completion
- Error propagation - Agent A failure blocks Agent B
- Context accumulation - Each agent enriches shared understanding
- Quality gates - Validation at each step ensures data quality

**Example (Phase 1)**:
```
issue-classifier → classification → diagnostic-collector → diagnostics
```

### Pattern 2: Parallel Fan-out/Fan-in

Used in Phase 2 for comprehensive domain analysis:

```
Shared Context → ┌─Agent 1─┐
                 ├─Agent 2─┤ → Combined Results
                 ├─Agent 3─┤
                 └─Agent N─┘
```

**Characteristics**:
- Concurrent execution - All agents start simultaneously  
- Independent analysis - Each agent works on specialized domain
- Barrier synchronization - Wait for all agents before proceeding
- Graceful degradation - Partial failure handling with warnings

**Example (Phase 2)**:
```
Context → ┌─code-archivist────┐
          ├─backend-engineer──┤ → Comprehensive Analysis
          ├─frontend-engineer─┤  
          └─test-analyst──────┘
```

### Pattern 3: Validation Pipeline

Used in Phase 3 and Phase 4 for quality assurance:

```
Input → Processor Agent → Validator Agent → Validated Output
```

**Characteristics**:
- Quality-focused - Validation agent specifically checks quality
- Iterative refinement - Failed validation triggers refinement
- Approval gates - Explicit approval required for progression
- Risk assessment - Comprehensive risk analysis before approval

**Example (Phase 3)**:
```
Analysis → solution-architect → fix-validator → Approved Solution
```

### Agent Communication Protocols

#### Context Sharing Protocol
```python
# Agents read from shared context
context_data = shared_context.get('classification')

# Agents write results to shared context  
shared_context['agent_name_results'] = {
    'analysis': agent_analysis,
    'recommendations': recommendations,
    'confidence': confidence_score
}
```

#### Result Standardization
All agents follow consistent result formatting:

```python
AgentResult = {
    'agent_name': str,
    'execution_time': float,
    'success': bool, 
    'analysis': Dict[str, Any],
    'recommendations': List[str],
    'confidence_score': float,
    'warnings': List[str],
    'next_steps': List[str]
}
```

#### Error Reporting Protocol
```python
AgentError = {
    'agent_name': str,
    'error_type': str,  # 'timeout', 'validation', 'execution'
    'error_message': str,
    'context': Dict[str, Any],
    'recovery_suggestions': List[str],
    'partial_results': Dict[str, Any]  # If any partial work completed
}
```

### Coordination State Machine

The debug command implements a formal state machine for coordination:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   INITIAL   │───▶│CLASSIFYING  │───▶│ ANALYZING   │───▶│SYNTHESIZING │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                          │                   │                   │
                          ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   ERROR     │◀───┤    ERROR    │◀───┤    ERROR    │◀───┤    ERROR    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                                 │
                                                                 ▼
┌─────────────┐    ┌─────────────┐                    ┌─────────────┐
│  COMPLETE   │◀───┤IMPLEMENTING │◀───────────────────┤VALIDATING   │
└─────────────┘    └─────────────┘                    └─────────────┘
```

**State Transitions**:
- **INITIAL → CLASSIFYING**: User input validation complete
- **CLASSIFYING → ANALYZING**: Classification and diagnostics complete
- **ANALYZING → SYNTHESIZING**: Parallel analysis complete (or partial with warnings)
- **SYNTHESIZING → VALIDATING**: Solution architecture complete
- **VALIDATING → IMPLEMENTING**: Solution validation complete
- **IMPLEMENTING → COMPLETE**: Implementation templates and repository changes complete
- **Any State → ERROR**: Critical failure or timeout

---

## Performance & Resource Usage

### Execution Time Characteristics

#### Time Complexity by Issue Type
- **Simple Issues** (single domain, clear symptoms): 30-60 seconds
- **Medium Issues** (2-3 domains, moderate complexity): 1-3 minutes
- **Complex Issues** (multi-domain, unclear symptoms): 3-8 minutes
- **Critical Issues** (system-wide, high priority): 5-15 minutes

#### Phase-by-Phase Timing
```
Phase 1 (Classification): ~10-30 seconds
├─ issue-classifier: 5-15 seconds
└─ diagnostic-collector: 5-15 seconds

Phase 2 (Parallel Analysis): ~60-120 seconds  
├─ code-archivist: 20-40 seconds
├─ backend-engineer: 15-30 seconds  
├─ frontend-engineer: 15-30 seconds
├─ infrastructure-specialist: 10-25 seconds
└─ test-analyst: 10-25 seconds

Phase 3 (Solution Synthesis): ~30-90 seconds
├─ solution-architect: 20-60 seconds
└─ fix-validator: 10-30 seconds

Phase 4 (Implementation): ~20-60 seconds
├─ template-generator: 10-30 seconds  
└─ github-repo-manager: 10-30 seconds
```

### Resource Usage Profile

#### Memory Usage
- **Base Memory**: ~500MB for coordinator and context management
- **Per Agent**: ~100-200MB depending on model and context size
- **Peak Usage**: ~1.5-2GB during Phase 2 parallel execution
- **Cleanup**: Automatic context cleanup after phase completion

#### CPU Usage  
- **Phase 1 & 3-4**: Single-threaded, moderate CPU usage
- **Phase 2**: Multi-threaded up to 5 workers, high CPU utilization
- **I/O Bound**: Network requests to AI models are primary bottleneck
- **Optimization**: Context pre-loading and result caching improve efficiency

#### Network Usage
- **Model Requests**: 11 total requests across all phases
- **Request Size**: 2-50KB per request depending on context size
- **Response Size**: 1-20KB per response
- **Total Bandwidth**: ~500KB-2MB per debug session
- **Optimization**: Request batching and compression where possible

### Parallel Execution Benefits

#### Speedup Analysis (Phase 2)
```
Sequential Execution: 5 agents × 30s average = 150 seconds
Parallel Execution: max(30s) = 30-45 seconds actual
Speedup Factor: ~3-4x improvement
```

#### Resource Utilization
- **CPU Cores**: Efficiently utilizes 4-8 cores during parallel phase
- **Memory Bandwidth**: Optimized context sharing reduces memory copies  
- **Network**: Concurrent API requests maximize throughput
- **Latency Hiding**: Long network requests overlap with local processing

### Scalability Characteristics

#### Issue Complexity Scaling
- **Linear Scaling**: Analysis depth scales linearly with issue complexity
- **Domain Scaling**: Additional affected domains handled gracefully
- **Context Growth**: Shared context size managed through summarization
- **Agent Specialization**: Domain experts prevent analysis quality degradation

#### System Resource Scaling  
- **Worker Pool**: Configurable parallelism (1-10 workers)
- **Memory Limits**: Automatic context pruning for large codebases
- **Timeout Management**: Per-agent and per-phase timeout controls
- **Queue Management**: Background task queuing for resource-constrained environments

### Performance Optimization Features

#### Context Optimization
```python
# Intelligent context summarization
def optimize_context(context: Dict, max_size: int = 50000) -> Dict:
    """Summarize large context objects while preserving key information."""
    
# Selective context sharing
def prepare_agent_context(agent_name: str, full_context: Dict) -> Dict:
    """Provide only relevant context portions to each agent."""
```

#### Caching Strategy
```python
# Result caching for similar issues
cache_key = hash(issue_description + severity + domains)
cached_result = cache.get(cache_key)

# Context preprocessing cache
diagnostic_cache = {}  # Reuse diagnostic data for similar environments
```

#### Early Termination
```python
# Skip remaining analysis if high-confidence solution found
if solution_confidence > 0.95 and risk_assessment == 'low':
    return early_termination_with_solution()
```

---

## Best Practices

### Effective Issue Description

#### High-Quality Issue Descriptions
**DO**: Provide comprehensive, specific descriptions
```bash
claude debug "React component UserProfile fails to render after successful login. Component shows blank screen instead of user data. Error in console: 'Cannot read property name of undefined'. Issue started after updating to React 18.2. Affects 100% of users on production."
```

**DON'T**: Use vague, minimal descriptions
```bash
claude debug "Something is broken"
```

#### Structured Problem Description Template
```
Issue: [Specific problem statement]
Impact: [User/system impact description]  
Environment: [Development/staging/production]
Timing: [When issue started/frequency]
Reproduction: [Steps to reproduce]
Error Messages: [Exact error text]
Recent Changes: [Recent deployments/changes]
```

### Optimal Command Usage Patterns

#### Progressive Debugging Approach
1. **Start Simple**: Begin with basic issue description
2. **Add Context**: Include severity and domain hints
3. **Iterate**: Use results to refine subsequent debug runs
4. **Validate**: Test recommended solutions in development first

#### Domain-Specific Optimization
```bash
# Frontend issues - include browser/device info
claude debug "CSS layout broken on mobile Safari" --domains frontend --severity high

# Backend issues - include load/performance context  
claude debug "API returning 500 errors under high load" --domains backend,infrastructure

# Cross-domain issues - let system analyze all domains
claude debug "User checkout flow fails intermittently" --severity critical
```

### Mode Selection Strategy

#### Auto-Fix Mode
**Best For**:
- Well-understood, common issues
- Development environments
- Non-critical systems
- Experienced teams with good rollback capabilities

```bash
claude debug "Missing dependency in package.json" --mode auto-fix
```

#### Guided Mode (Recommended Default)
**Best For**:
- Most debugging scenarios
- Production system issues  
- Team collaboration
- Learning and knowledge transfer

```bash
claude debug "Performance degradation after deployment" --mode guided
```

#### Report Mode
**Best For**:
- Complex investigation documentation
- Management reporting
- Issue prioritization
- Architecture review processes

```bash
claude debug "System architecture scaling bottlenecks" --mode report --output architecture-analysis.md
```

#### Interactive Mode
**Best For**:
- Unclear or complex issues
- Learning and exploration
- Comprehensive analysis needs
- Novel or unusual problems

```bash
claude debug --interactive
```

### Team Collaboration Patterns

#### Debug Session Documentation
```bash
# Generate shareable analysis report
claude debug "Production database locks causing timeouts" --mode report --output db-issue-analysis.json

# Share with team for review and implementation planning
# Include in incident response documentation
```

#### Pair Debugging Workflow
1. **Issue Identification**: One team member runs debug command
2. **Solution Review**: Team reviews generated analysis together  
3. **Implementation Planning**: Use solution roadmap for task assignment
4. **Validation**: Test solutions in development before production

#### Cross-Team Communication
```bash
# Generate comprehensive report for stakeholders
claude debug "Customer data sync failures affecting billing" --mode report --severity critical

# Use results to:
# - Brief management on impact and timeline
# - Coordinate with other teams (DevOps, QA, etc.)
# - Document lessons learned
```

### Error Prevention Strategies

#### Proactive Issue Detection
```bash
# Regular system health checks
claude debug "Scheduled analysis of system performance metrics" --mode report

# Include in CI/CD pipeline for early issue detection
```

#### Knowledge Base Building
```bash
# Document common issues and solutions
claude debug "Weekly analysis of support ticket patterns" --mode report

# Build team knowledge base from debug results
```

### Quality Assurance Integration

#### Pre-Deployment Debugging
```bash
# Analyze potential deployment risks
claude debug "Review deployment impact for feature-xyz branch" --domains infrastructure,testing

# Include debug analysis in deployment checklists
```

#### Post-Incident Analysis
```bash
# Comprehensive post-mortem analysis
claude debug "Complete analysis of production incident #123" --mode report --severity critical

# Generate lessons learned and prevention strategies
```

---

## Troubleshooting Guide

### Common Issues and Solutions

#### "Debug command timeout after 300 seconds"

**Cause**: Complex multi-domain issue requires more analysis time

**Solutions**:
1. **Increase Timeout**:
   ```bash
   claude debug "complex issue description" --timeout 600
   ```

2. **Reduce Parallel Workers**:
   ```bash
   claude debug "complex issue description" --parallel-workers 3
   ```

3. **Focus Analysis**:
   ```bash
   claude debug "complex issue description" --domains frontend,backend
   ```

**Prevention**: Start with focused domain analysis for complex issues

#### "Phase 2 parallel analysis failed with agent timeout"

**Cause**: Individual agent exceeded 120-second timeout

**Symptoms**:
- Partial analysis results returned
- Warning messages about failed agents
- Reduced analysis depth

**Solutions**:
1. **Retry with Sequential Mode**:
   ```bash
   claude debug "same issue" --parallel-workers 1
   ```

2. **Check System Resources**:
   ```bash
   # Monitor memory and CPU usage
   # Close other resource-intensive applications
   ```

3. **Network Connectivity**:
   ```bash
   # Verify stable internet connection
   # Consider running during off-peak hours
   ```

#### "Classification agent failed - insufficient issue description"

**Cause**: Issue description too vague or minimal for analysis

**Error Messages**:
- "Unable to classify issue domain"
- "Insufficient context for analysis"
- "Please provide more specific issue description"

**Solutions**:
1. **Enhance Description**:
   ```bash
   # Instead of: "App is slow"
   claude debug "React dashboard takes 5+ seconds to load user data after login, CPU usage spikes to 100%, affects all users since yesterday's deployment"
   ```

2. **Add Reproduction Steps**:
   ```bash
   claude debug --interactive  # Use interactive mode for guided input
   ```

3. **Include Error Messages**:
   ```bash
   claude debug "Specific error: 'TypeError: Cannot read property id of undefined' in UserService.getUserData(), occurs on user profile page load"
   ```

#### "Solution validation failed - risks too high"

**Cause**: Proposed solution has unacceptable implementation risks

**Symptoms**:
- Solution marked as "high risk"
- Validation warnings about potential side effects
- Recommendation to refine approach

**Solutions**:
1. **Request Alternative Solutions**:
   ```bash
   claude debug "same issue" --mode guided
   # Review multiple solution alternatives
   ```

2. **Reduce Solution Scope**:
   ```bash
   claude debug "minimal viable fix for: [issue]" --severity medium
   ```

3. **Staged Implementation**:
   - Implement solution in phases
   - Test each phase before proceeding
   - Use feature flags for gradual rollout

### Performance Issues

#### Slow Execution (>10 minutes)

**Symptoms**:
- Debug command runs much longer than expected
- High memory usage
- System becomes unresponsive

**Diagnosis Steps**:
1. **Check System Resources**:
   ```bash
   # Monitor during execution:
   top -p $(pgrep -f "claude debug")
   ```

2. **Review Issue Complexity**:
   - Multi-domain issues take longer
   - Large codebases require more analysis
   - Critical severity triggers deeper analysis

3. **Network Performance**:
   - API request latency affects timing
   - Multiple model requests compound delays

**Solutions**:
1. **Optimize Resource Allocation**:
   ```bash
   claude debug "issue" --parallel-workers 2  # Reduce parallel load
   ```

2. **Focus Analysis Scope**:
   ```bash
   claude debug "issue" --domains backend  # Single domain focus
   ```

3. **Use Report Mode**:
   ```bash
   claude debug "issue" --mode report  # Skip implementation phase
   ```

#### High Memory Usage

**Symptoms**:
- System memory usage >80%  
- "Out of memory" errors
- System swapping/page file activity

**Common Causes**:
- Large shared context objects
- Multiple agents loading simultaneously
- Inefficient context management

**Solutions**:
1. **Reduce Context Size**:
   ```bash
   # Focus on specific issue aspects
   claude debug "specific component issue" --domains frontend
   ```

2. **Sequential Processing**:
   ```bash
   claude debug "issue" --parallel-workers 1
   ```

3. **System Cleanup**:
   ```bash
   # Close other applications
   # Restart debug command
   # Consider increasing system memory
   ```

### Agent-Specific Issues

#### Code Archivist Agent Failures

**Common Problems**:
- Large codebase analysis timeout
- Complex architectural patterns
- Insufficient code access permissions

**Solutions**:
1. **Repository Access**:
   ```bash
   # Ensure proper git repository access
   # Check file system permissions
   ```

2. **Scope Limitation**:
   ```bash
   # Focus on specific components
   claude debug "issue in UserService module" --domains backend
   ```

#### Backend Engineer Agent Issues

**Common Problems**:
- Database connectivity analysis failures
- API endpoint analysis timeout
- Configuration access issues

**Solutions**:
1. **Environment Context**:
   ```bash
   # Provide specific environment details
   claude debug "API timeout in production environment with PostgreSQL 14, Redis cache, load balancer configuration"
   ```

2. **Service Isolation**:
   ```bash
   # Focus on specific services
   claude debug "UserService API performance issues" --domains backend
   ```

#### Infrastructure Specialist Agent Problems

**Common Problems**:
- Cloud platform access limitations
- Complex deployment pipeline analysis
- Monitoring system integration

**Solutions**:
1. **Permission Verification**:
   ```bash
   # Verify cloud platform access
   # Check CI/CD system permissions
   ```

2. **Manual Context Provision**:
   ```bash
   # Include infrastructure details in description
   claude debug "Kubernetes deployment fails on AWS EKS cluster, pod memory limits exceeded, using Helm 3.x"
   ```

### Recovery Procedures

#### Partial Failure Recovery

When some agents succeed but others fail:

1. **Review Partial Results**:
   ```bash
   # Check which agents completed successfully
   # Use partial analysis for immediate insights
   ```

2. **Retry Failed Domains**:
   ```bash
   # Focus retry on failed domains only
   claude debug "same issue" --domains infrastructure,testing
   ```

3. **Manual Analysis**:
   ```bash
   # Use successful agent results for manual analysis
   # Supplement with targeted debugging in failed domains
   ```

#### Complete Failure Recovery

When entire debug process fails:

1. **Issue Description Review**:
   ```bash
   # Simplify and clarify issue description
   claude debug "simplified, specific issue description"
   ```

2. **Sequential Mode**:
   ```bash
   # Disable parallel processing
   claude debug "issue" --parallel-workers 1 --timeout 600
   ```

3. **Interactive Mode**:
   ```bash
   # Use interactive mode for guided troubleshooting
   claude debug --interactive
   ```

### Getting Additional Help

#### Debug Command Diagnostics

```bash
# Enable verbose logging
claude debug "issue" --verbose

# Generate diagnostic report
claude debug --diagnostics --output debug-diagnostics.log
```

#### Community Resources

1. **Documentation**: Comprehensive command documentation
2. **Examples**: Real-world debugging scenarios and solutions
3. **Best Practices**: Community-contributed debugging strategies
4. **Issue Tracking**: Report bugs and request features

#### Professional Support

For enterprise environments or critical issues:

1. **Priority Support**: Expedited issue resolution
2. **Custom Agents**: Domain-specific agent development
3. **Integration Support**: Custom workflow integration
4. **Training**: Team training and best practices workshops

---

## Integration Guide

### Development Workflow Integration

#### IDE Integration

**VS Code Extension**:
```json
{
  "claude.debug.autoTrigger": true,
  "claude.debug.defaultMode": "guided",
  "claude.debug.contextFiles": ["package.json", "tsconfig.json"]
}
```

**Usage**:
- Right-click on error → "Debug with Claude"
- Automatic error detection and debugging
- Integrated solution preview and application

#### Git Hooks Integration

**Pre-commit Hook**:
```bash
#!/bin/sh
# .git/hooks/pre-commit
if [ -f "debug-issues.txt" ]; then
  claude debug --batch --input-file debug-issues.txt --mode report
  if [ $? -ne 0 ]; then
    echo "Debug issues found - commit blocked"
    exit 1
  fi
fi
```

**Post-merge Hook**:
```bash
#!/bin/sh  
# .git/hooks/post-merge
claude debug "Analyze potential issues from merge" --domains all --mode report --output merge-analysis.md
```

### CI/CD Pipeline Integration

#### GitHub Actions Integration

```yaml
name: Debug Analysis
on: 
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  debug-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Debug Analysis
        run: |
          claude debug "Analyze changes in PR #${{ github.event.number }}" \
            --mode report \
            --output debug-analysis.json
      - name: Comment PR  
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const analysis = JSON.parse(fs.readFileSync('debug-analysis.json'));
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Debug Analysis Results\n${analysis.summary}`
            });
```

#### Jenkins Pipeline Integration

```groovy
pipeline {
    agent any
    stages {
        stage('Debug Analysis') {
            steps {
                script {
                    def debugResult = sh(
                        script: 'claude debug "Analyze build failure in ${env.BUILD_ID}" --mode report --output debug-result.json',
                        returnStdout: true
                    )
                    
                    if (debugResult.contains('"success": false')) {
                        error("Debug analysis identified critical issues")
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                // Deployment steps
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'debug-result.json'
        }
    }
}
```

### Monitoring System Integration

#### Application Performance Monitoring (APM)

**Datadog Integration**:
```python
import datadog
from claude_debug import DebugCoordinator

def handle_performance_alert(metric_name, threshold_value):
    """Automatically debug performance issues from monitoring alerts."""
    
    debug_request = DebugRequest(
        issue_description=f"Performance alert: {metric_name} exceeded {threshold_value}",
        severity="high",
        affected_domains=["backend", "infrastructure"]
    )
    
    coordinator = DebugCoordinator()
    result = await coordinator.execute_debug_command(debug_request)
    
    # Send results back to Datadog
    datadog.api.Event.create(
        title="Automated Debug Analysis Complete",
        text=result['results']['solution'],
        alert_type='info',
        tags=['claude-debug', 'automated-analysis']
    )
```

**New Relic Integration**:
```javascript
const newrelic = require('newrelic');
const { execSync } = require('child_process');

newrelic.setCustomAttribute('debug_trigger', 'error_rate_threshold');

function handleErrorSpike(errorRate, service) {
    const debugCommand = `claude debug "Error rate spike: ${errorRate}% in ${service}" --severity critical --domains backend`;
    
    try {
        const result = execSync(debugCommand, { encoding: 'utf8' });
        const analysis = JSON.parse(result);
        
        newrelic.recordCustomEvent('DebugAnalysis', {
            service: service,
            errorRate: errorRate,
            solutionFound: analysis.success,
            recommendations: analysis.results.solution
        });
    } catch (error) {
        newrelic.noticeError(error);
    }
}
```

#### Log Aggregation Integration

**ELK Stack Integration**:
```python
from elasticsearch import Elasticsearch
from claude_debug import DebugCoordinator

class LogBasedDebugger:
    def __init__(self):
        self.es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
        self.coordinator = DebugCoordinator()
    
    async def analyze_error_patterns(self, time_window='1h'):
        """Analyze recent error patterns and generate debug recommendations."""
        
        # Query Elasticsearch for recent errors
        query = {
            "query": {
                "bool": {
                    "must": [
                        {"range": {"@timestamp": {"gte": f"now-{time_window}"}}},
                        {"term": {"level": "ERROR"}}
                    ]
                }
            },
            "aggs": {
                "error_types": {
                    "terms": {"field": "message.keyword"}
                }
            }
        }
        
        result = self.es.search(index="application-logs", body=query)
        
        # Generate debug requests for common error patterns
        for bucket in result['aggregations']['error_types']['buckets']:
            error_message = bucket['key']
            error_count = bucket['doc_count']
            
            if error_count > 10:  # Threshold for automatic analysis
                debug_request = DebugRequest(
                    issue_description=f"Recurring error: {error_message} (occurred {error_count} times)",
                    severity="high" if error_count > 50 else "medium"
                )
                
                analysis = await self.coordinator.execute_debug_command(debug_request)
                
                # Store results back in Elasticsearch
                self.es.index(
                    index="debug-analysis",
                    body={
                        "@timestamp": datetime.utcnow().isoformat(),
                        "error_pattern": error_message,
                        "occurrence_count": error_count,
                        "analysis": analysis,
                        "automated": True
                    }
                )
```

### Issue Tracking Integration

#### Jira Integration

```python
from jira import JIRA
from claude_debug import DebugCoordinator

class JiraDebugIntegration:
    def __init__(self, jira_url, username, api_token):
        self.jira = JIRA(jira_url, basic_auth=(username, api_token))
        self.coordinator = DebugCoordinator()
    
    async def analyze_jira_issue(self, issue_key):
        """Automatically analyze Jira issues and add debug results as comments."""
        
        issue = self.jira.issue(issue_key)
        
        debug_request = DebugRequest(
            issue_description=f"{issue.fields.summary}\n\n{issue.fields.description}",
            severity=self.map_jira_priority(issue.fields.priority.name),
            affected_domains=self.extract_domains_from_labels(issue.fields.labels)
        )
        
        analysis = await self.coordinator.execute_debug_command(debug_request)
        
        if analysis['success']:
            comment = f"""
            ## Automated Debug Analysis
            
            **Root Cause**: {analysis['results']['classification']}
            
            **Recommended Solution**:
            {analysis['results']['solution']}
            
            **Implementation Steps**:
            {analysis['next_steps']}
            
            **Confidence**: {analysis.get('confidence', 'Medium')}
            """
            
            self.jira.add_comment(issue_key, comment)
            
            # Update issue with debug analysis labels
            issue.update(fields={
                'labels': issue.fields.labels + ['claude-analyzed', 'solution-available']
            })
```

#### GitHub Issues Integration

```yaml
# .github/workflows/debug-issues.yml
name: Auto-Debug Issues
on:
  issues:
    types: [opened, labeled]

jobs:
  debug-analysis:
    runs-on: ubuntu-latest
    if: contains(github.event.issue.labels.*.name, 'bug') || contains(github.event.issue.labels.*.name, 'debug-needed')
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Debug Analysis
        id: debug
        run: |
          claude debug "${{ github.event.issue.title }}: ${{ github.event.issue.body }}" \
            --mode report \
            --output debug-analysis.json
          echo "analysis=$(cat debug-analysis.json | jq -r '.results.solution')" >> $GITHUB_OUTPUT
          
      - name: Comment Analysis
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🤖 Automated Debug Analysis\n\n${{ steps.debug.outputs.analysis }}\n\n*Generated by Claude Debug Command*`
            });
            
      - name: Add Labels
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.addLabels({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              labels: ['claude-analyzed', 'solution-available']
            });
```

### Custom Workflow Integration

#### Slack Integration for Team Notifications

```python
import slack_sdk
from claude_debug import DebugCoordinator

class SlackDebugBot:
    def __init__(self, slack_token, channel):
        self.client = slack_sdk.WebClient(token=slack_token)
        self.channel = channel
        self.coordinator = DebugCoordinator()
    
    async def handle_debug_request(self, user_message, user_id):
        """Handle debug requests from Slack messages."""
        
        # Parse debug request from natural language
        if "debug" in user_message.lower():
            issue_description = user_message.replace("debug", "").strip()
            
            debug_request = DebugRequest(
                issue_description=issue_description,
                severity="medium"  # Default for Slack requests
            )
            
            # Notify user that analysis is starting
            self.client.chat_postMessage(
                channel=self.channel,
                text=f"🔍 Starting debug analysis for: {issue_description[:100]}..."
            )
            
            try:
                analysis = await self.coordinator.execute_debug_command(debug_request)
                
                if analysis['success']:
                    response = f"""
                    ✅ *Debug Analysis Complete*
                    
                    *Issue*: {issue_description[:200]}...
                    
                    *Root Cause*: {analysis['results']['classification']}
                    
                    *Solution*: {analysis['results']['solution'][:500]}...
                    
                    <@{user_id}> Check the thread for detailed implementation steps.
                    """
                    
                    # Post main response
                    msg_response = self.client.chat_postMessage(
                        channel=self.channel,
                        text=response
                    )
                    
                    # Post detailed steps in thread
                    detailed_steps = "\n".join([f"{i+1}. {step}" for i, step in enumerate(analysis['next_steps'])])
                    self.client.chat_postMessage(
                        channel=self.channel,
                        thread_ts=msg_response['ts'],
                        text=f"*Implementation Steps*:\n{detailed_steps}"
                    )
                    
                else:
                    self.client.chat_postMessage(
                        channel=self.channel,
                        text=f"❌ Debug analysis failed: {analysis['error']}"
                    )
                    
            except Exception as e:
                self.client.chat_postMessage(
                    channel=self.channel,  
                    text=f"⚠️ Debug analysis encountered an error: {str(e)}"
                )
```

#### Custom Dashboard Integration

```python
import streamlit as st
from claude_debug import DebugCoordinator
import plotly.graph_objects as go
from datetime import datetime, timedelta

class DebugDashboard:
    def __init__(self):
        self.coordinator = DebugCoordinator()
        
    def render_dashboard(self):
        st.title("🔍 Claude Debug Command Dashboard")
        
        # Sidebar for debug request input
        with st.sidebar:
            st.header("New Debug Request")
            
            issue_desc = st.text_area("Issue Description", height=100)
            severity = st.selectbox("Severity", ["low", "medium", "high", "critical"])
            domains = st.multiselect("Domains", ["frontend", "backend", "infrastructure", "testing", "security"])
            mode = st.selectbox("Mode", ["guided", "auto-fix", "report", "interactive"])
            
            if st.button("Start Debug Analysis"):
                if issue_desc:
                    with st.spinner("Running debug analysis..."):
                        result = self.run_debug_analysis(issue_desc, severity, domains, mode)
                        st.session_state['last_result'] = result
        
        # Main dashboard content
        col1, col2 = st.columns(2)
        
        with col1:
            self.render_recent_analyses()
            
        with col2:
            self.render_success_metrics()
        
        # Display latest results
        if 'last_result' in st.session_state:
            self.render_analysis_results(st.session_state['last_result'])
    
    async def run_debug_analysis(self, description, severity, domains, mode):
        """Run debug analysis with progress tracking."""
        
        debug_request = DebugRequest(
            issue_description=description,
            severity=severity,
            affected_domains=domains if domains else None
        )
        
        return await self.coordinator.execute_debug_command(debug_request)
    
    def render_analysis_results(self, result):
        st.header("📊 Latest Analysis Results")
        
        if result['success']:
            st.success(f"Analysis completed successfully in {result['execution_summary']['total_duration']:.1f}s")
            
            # Display solution
            with st.expander("💡 Solution", expanded=True):
                st.write(result['results']['solution'])
            
            # Display next steps
            with st.expander("📋 Next Steps"):
                for i, step in enumerate(result['next_steps'], 1):
                    st.write(f"{i}. {step}")
            
            # Display agent results
            with st.expander("🤖 Agent Analysis"):
                for agent, analysis in result['results']['analysis'].items():
                    st.subheader(agent.replace('-', ' ').title())
                    st.write(analysis)
        else:
            st.error(f"Analysis failed: {result['error']}")
```

---

## Advanced Configuration

### Environment Variables

Configure debug command behavior through environment variables:

```bash
# Agent timeout settings  
export CLAUDE_DEBUG_AGENT_TIMEOUT=180          # Per-agent timeout in seconds
export CLAUDE_DEBUG_GLOBAL_TIMEOUT=600         # Global command timeout
export CLAUDE_DEBUG_PARALLEL_WORKERS=5         # Max parallel workers

# Output and logging
export CLAUDE_DEBUG_LOG_LEVEL=INFO            # DEBUG, INFO, WARN, ERROR
export CLAUDE_DEBUG_OUTPUT_FORMAT=json        # json, yaml, text
export CLAUDE_DEBUG_CACHE_ENABLED=true        # Enable result caching

# Model configuration
export CLAUDE_DEBUG_OPUS_MODEL=claude-3-opus-20240229
export CLAUDE_DEBUG_SONNET_MODEL=claude-3-5-sonnet-20241022

# Performance tuning
export CLAUDE_DEBUG_CONTEXT_SIZE_LIMIT=100000  # Max context size in chars
export CLAUDE_DEBUG_ENABLE_COMPRESSION=true    # Enable context compression
export CLAUDE_DEBUG_MEMORY_LIMIT=2000          # Memory limit in MB
```

### Configuration File

Create a `.claude-debug.yml` file in your project root:

```yaml
# Claude Debug Command Configuration
version: "1.0"

# Default settings
defaults:
  mode: guided
  severity: medium
  timeout: 300
  parallel_workers: 5
  output_format: json

# Agent configuration
agents:
  issue-classifier:
    model: claude-3-opus-20240229
    timeout: 60
    retries: 2
    
  diagnostic-collector:
    model: claude-3-5-sonnet-20241022
    timeout: 45
    context_limit: 50000
    
  code-archivist:
    model: claude-3-opus-20240229
    timeout: 90
    analysis_depth: comprehensive
    
  # ... other agent configurations

# Domain-specific settings
domains:
  frontend:
    priority_agents: [frontend-engineer, code-archivist]
    additional_context: [package.json, tsconfig.json, webpack.config.js]
    
  backend:
    priority_agents: [backend-engineer, code-archivist]
    additional_context: [requirements.txt, Dockerfile, docker-compose.yml]
    
  infrastructure:
    priority_agents: [infrastructure-specialist, backend-engineer]
    additional_context: [.github/workflows/, terraform/, k8s/]

# Integration settings  
integrations:
  jira:
    enabled: true
    auto_comment: true
    priority_mapping:
      Highest: critical
      High: high
      Medium: medium
      Low: low
      
  slack:
    enabled: true
    channel: "#debug-alerts"
    notify_on_completion: true
    
  github:
    enabled: true
    auto_label: true
    create_issues: false

# Performance settings
performance:
  enable_caching: true
  cache_duration: 3600  # 1 hour
  context_compression: true
  memory_optimization: true
  
# Logging configuration
logging:
  level: INFO
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  file: debug-command.log
  max_size: 10MB
  backup_count: 5
```

### Custom Agent Development

Create custom agents for specialized debugging scenarios:

```markdown
---
name: custom-security-agent
description: Specialized security vulnerability analysis
model: claude-3-opus-20240229
timeout: 120
domains: [security, backend, frontend]
---

# Custom Security Analysis Agent

You are a cybersecurity expert specializing in web application security analysis. Your role is to identify, analyze, and provide solutions for security vulnerabilities in software systems.

## Core Responsibilities

1. **Vulnerability Assessment**: Identify potential security weaknesses
2. **Risk Analysis**: Evaluate security risk levels and impact
3. **Solution Design**: Provide secure implementation recommendations
4. **Compliance Check**: Verify adherence to security standards (OWASP, etc.)

## Analysis Framework

### Input Processing
- Review code patterns for common vulnerabilities
- Analyze authentication and authorization implementations
- Check for injection vulnerabilities (SQL, XSS, etc.)
- Evaluate data handling and encryption practices

### Security-Specific Context
```python
def analyze_security_context(self, context):
    security_analysis = {
        'authentication': self.analyze_auth_patterns(context),
        'authorization': self.analyze_access_control(context),
        'data_protection': self.analyze_data_handling(context),
        'input_validation': self.analyze_input_sanitization(context),
        'communication': self.analyze_secure_communication(context)
    }
    return security_analysis
```

### Output Format
```json
{
  "security_assessment": {
    "vulnerabilities": [...],
    "risk_level": "high|medium|low",
    "compliance_status": {...},
    "recommendations": [...]
  }
}
```
```

### Agent Registration

Register custom agents in the debug command:

```python
# custom_agents.py
from claude_debug import BaseAgent, register_agent

@register_agent("security-specialist")
class SecuritySpecialistAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="security-specialist",
            model="claude-3-opus-20240229",
            domains=["security", "backend", "frontend"],
            timeout=120
        )
    
    async def analyze(self, context: Dict) -> Dict:
        """Perform security-focused analysis."""
        
        security_prompt = f"""
        Perform comprehensive security analysis of the reported issue:
        
        Context: {context}
        
        Focus on:
        1. Potential security vulnerabilities
        2. Authentication and authorization issues
        3. Data protection concerns  
        4. Input validation problems
        5. Secure communication requirements
        
        Provide specific, actionable security recommendations.
        """
        
        return await self.invoke_model(security_prompt)
```

### Custom Coordination Patterns

Implement specialized coordination patterns for complex scenarios:

```python
# custom_patterns.py
from claude_debug import CoordinationPattern

class SecurityFirstPattern(CoordinationPattern):
    """Coordination pattern that prioritizes security analysis."""
    
    def __init__(self):
        self.phases = [
            "security_assessment",
            "technical_analysis", 
            "solution_design",
            "secure_implementation"
        ]
    
    async def execute_security_assessment(self, context):
        """Execute security-focused first phase."""
        
        security_agents = [
            'security-specialist',
            'code-archivist'  # For architectural security review
        ]
        
        results = await self.execute_parallel_agents(security_agents, context)
        
        # Block progression if critical security issues found
        if self.has_critical_security_issues(results):
            return self.escalate_security_concern(results)
        
        return results
    
    def has_critical_security_issues(self, results):
        """Check if critical security vulnerabilities were identified."""
        for result in results.values():
            if result.get('risk_level') == 'critical':
                return True
        return False
```

### Performance Profiling and Optimization

Enable detailed performance profiling:

```python
# debug_profiler.py
import time
import memory_profiler
from functools import wraps

class DebugProfiler:
    def __init__(self):
        self.metrics = {}
        
    def profile_agent(self, agent_name):
        """Decorator for agent performance profiling."""
        def decorator(func):
            @wraps(func)
            async def wrapper(*args, **kwargs):
                start_time = time.time()
                start_memory = memory_profiler.memory_usage()[0]
                
                try:
                    result = await func(*args, **kwargs)
                    success = True
                except Exception as e:
                    result = str(e)
                    success = False
                
                end_time = time.time()
                end_memory = memory_profiler.memory_usage()[0]
                
                self.metrics[agent_name] = {
                    'execution_time': end_time - start_time,
                    'memory_delta': end_memory - start_memory,
                    'success': success,
                    'timestamp': time.time()
                }
                
                if success:
                    return result
                else:
                    raise Exception(result)
            return wrapper
        return decorator
    
    def generate_performance_report(self):
        """Generate comprehensive performance analysis."""
        report = {
            'total_agents': len(self.metrics),
            'successful_agents': sum(1 for m in self.metrics.values() if m['success']),
            'average_execution_time': sum(m['execution_time'] for m in self.metrics.values()) / len(self.metrics),
            'total_memory_usage': sum(m['memory_delta'] for m in self.metrics.values()),
            'agent_details': self.metrics
        }
        return report
```

### Enterprise Configuration

For enterprise environments with additional requirements:

```yaml
# .claude-debug.enterprise.yml
enterprise:
  compliance:
    data_retention: 90  # days
    audit_logging: true
    pii_detection: true
    
  security:
    require_approval: true
    approval_roles: [tech-lead, senior-engineer]
    sensitive_domains: [security, database, authentication]
    
  governance:
    mandatory_fields: [business_impact, stakeholder_notification]
    escalation_rules:
      critical: [cto, engineering-manager]
      high: [tech-lead, product-manager]
      
  integration:
    enterprise_sso: true
    audit_trail: splunk
    notification_channels:
      - teams: engineering-alerts
      - email: engineering-group@company.com
      - pagerduty: debug-escalation
      
  resource_limits:
    max_parallel_sessions: 3
    priority_queue: true
    resource_allocation:
      critical: unlimited
      high: 80%
      medium: 60%
      low: 40%
```

This comprehensive documentation provides users with everything they need to effectively utilize the debug command, understand its sophisticated AI architecture, and integrate it into their development workflows. The multi-agent system's power comes from the intelligent coordination of specialized experts working together to solve complex software issues systematically and thoroughly.