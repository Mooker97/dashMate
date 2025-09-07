---
name: debug
description: Intelligent debugging command with parallel agent architecture for comprehensive issue analysis and resolution
agents:
  issue-classifier:
    role: Issue triage and categorization specialist
    model: opus
    responsibilities: Parse issue descriptions, classify problem types, determine severity, route to appropriate analysis agents
  diagnostic-collector:
    role: Diagnostic information and context gathering specialist  
    model: sonnet
    responsibilities: Extract error logs, identify relevant files, collect environment data, create comprehensive diagnostic packages
  code-archivist:
    role: Codebase analysis and architectural pattern specialist
    model: opus
    responsibilities: Analyze code patterns, identify anti-patterns, map dependencies, detect structural root causes
  backend-engineer:
    role: Server-side logic and API analysis specialist
    model: sonnet
    responsibilities: Analyze APIs, business logic, database queries, authentication, error handling, performance bottlenecks
  frontend-engineer:
    role: UI/UX and client-side analysis specialist
    model: sonnet
    responsibilities: Component behavior, state management, event handling, responsive design, browser compatibility
  infrastructure-specialist:
    role: Configuration, deployment, and environment analysis specialist
    model: sonnet
    responsibilities: Configuration files, environment variables, dependencies, build processes, containerization, security
  test-analyst:
    role: Issue reproduction and validation testing specialist
    model: sonnet
    responsibilities: Create reproduction scenarios, design validation tests, execute automated testing, verify fix effectiveness
  solution-architect:
    role: Solution synthesis and strategic planning specialist
    model: opus
    responsibilities: Aggregate analysis, identify root causes, design comprehensive solutions, prioritize fixes, create roadmaps
  fix-validator:
    role: Solution validation and risk assessment specialist
    model: opus
    responsibilities: Review proposed fixes, identify side effects, validate standards compliance, ensure backwards compatibility
  template-generator:
    role: Code generation and fix template creation specialist
    model: sonnet
    responsibilities: Generate code patches, configuration updates, testing scripts, documentation, deployment packages
  github-repo-manager:
    role: Repository operations and commit management specialist
    model: sonnet
    responsibilities: Create branches, commit changes, generate pull requests, update documentation, coordinate CI/CD
coordination:
  pattern: staged-parallel-with-validation
  phases:
    - name: classification
      agents: [issue-classifier, diagnostic-collector]
      mode: sequential
    - name: analysis
      agents: [code-archivist, backend-engineer, frontend-engineer, infrastructure-specialist, test-analyst]
      mode: parallel
    - name: synthesis
      agents: [solution-architect, fix-validator]  
      mode: sequential
    - name: implementation
      agents: [template-generator, github-repo-manager]
      mode: sequential
  sync_points: [post-classification, analysis-complete, solution-validated, pre-commit]
  timeout: 300
  error_handling: graceful-degradation-with-recovery
---

# Debug Command - AI-Powered Intelligent Debugging

A sophisticated debugging command that uses 11 specialized AI agents in a 4-phase parallel architecture to provide comprehensive issue analysis, root cause identification, and automated or guided resolution.

## Command Usage

```bash
/debug [issue-description]
```

### Input Modes

**Quick Description**
```bash
/debug "API returning 500 errors for user authentication"
```

**Detailed Analysis**
```bash
/debug "Frontend component not updating state properly - users can't save preferences, seeing stale data in dashboard, no console errors visible"
```

**Interactive Mode**
```bash
/debug --interactive
# Prompts user through guided issue description process
```

## Architecture Overview

This command employs a **Staged Parallel with Validation** architecture across 4 phases:

### Phase 1: Classification & Context (Sequential)
```
User Input → Issue Classifier → Diagnostic Collector
```
- **Issue Classifier** (Opus): Categorizes problem type, severity, and routes to appropriate specialists
- **Diagnostic Collector** (Sonnet): Gathers logs, files, environment data, and reproduction context

### Phase 2: Parallel Analysis (Concurrent)
```
Parallel Execution:
├── Code Archivist (Opus) - Architectural analysis
├── Backend Engineer (Sonnet) - API/server-side analysis  
├── Frontend Engineer (Sonnet) - UI/client-side analysis
├── Infrastructure Specialist (Sonnet) - DevOps/config analysis
└── Test Analyst (Sonnet) - Reproduction and validation
```

### Phase 3: Solution Synthesis (Sequential)
```
Solution Architect (Opus) → Fix Validator (Opus)
```
- **Solution Architect**: Aggregates findings, designs comprehensive solutions
- **Fix Validator**: Validates solutions, identifies risks, ensures quality

### Phase 4: Implementation (Sequential)
```
Template Generator (Sonnet) → GitHub Repo Manager (Sonnet)
```
- **Template Generator**: Creates code fixes, patches, and documentation
- **GitHub Repo Manager**: Commits changes, creates PRs, manages repository

## Execution Flow

### 1. Issue Classification
```python
# Parse and classify the user's issue description
classification_result = await issue_classifier.analyze({
    'description': issue_description,
    'context': current_workspace_context,
    'urgency': 'auto-detect'
})

# Gather comprehensive diagnostic information
diagnostic_package = await diagnostic_collector.collect({
    'classification': classification_result,
    'include_logs': True,
    'include_config': True,
    'include_dependencies': True
})
```

### 2. Parallel Analysis
```python
# Execute analysis agents in parallel for maximum efficiency
analysis_tasks = [
    code_archivist.analyze(diagnostic_package),
    backend_engineer.analyze(diagnostic_package), 
    frontend_engineer.analyze(diagnostic_package),
    infrastructure_specialist.analyze(diagnostic_package),
    test_analyst.analyze(diagnostic_package)
]

analysis_results = await asyncio.gather(*analysis_tasks)
```

### 3. Solution Synthesis
```python
# Synthesize comprehensive solution from all analysis
solution_plan = await solution_architect.synthesize({
    'analyses': analysis_results,
    'classification': classification_result,
    'constraints': project_constraints
})

# Validate solution for correctness and safety
validated_solution = await fix_validator.validate({
    'solution': solution_plan,
    'impact_assessment': True,
    'regression_check': True
})
```

### 4. Implementation
```python
# Generate fixes and documentation
implementation = await template_generator.generate({
    'solution': validated_solution,
    'format': 'auto-detect',
    'include_tests': True
})

# Commit changes to repository
commit_result = await github_repo_manager.commit({
    'changes': implementation,
    'create_pr': user_preferences.auto_pr,
    'run_ci': True
})
```

## Output Modes

### Auto-Fix Mode (Default for Simple Issues)
```
🔧 Issue Detected: API Authentication Error
📊 Root Cause: Missing JWT token validation in middleware
✅ Auto-Fix Applied: Updated auth middleware with proper validation
📝 Commit: 7a3b9c2 - "Fix JWT validation in auth middleware"
⚡ Tests: All passing (12/12)
```

### Guided Fix Mode (Complex Issues)
```
🔍 Analysis Complete: Frontend State Management Issue

📋 Root Causes Identified:
1. Component re-rendering without state updates (Priority: High)
2. Missing useCallback optimization (Priority: Medium)  
3. Stale closure in event handler (Priority: High)

🛠 Recommended Actions:
Step 1: Update component to use useReducer instead of useState
Step 2: Add useCallback to prevent unnecessary re-renders
Step 3: Fix event handler closure issue

💡 Would you like me to implement these fixes automatically? (y/n)
```

### Analysis Report Mode (--report flag)
```
📊 Comprehensive Debug Analysis Report

🎯 Issue Classification:
- Type: Frontend State Management
- Severity: Medium
- Complexity: Moderate
- Estimated Fix Time: 15-30 minutes

🔍 Analysis Summary:
✓ Code Architecture: 3 issues found in state management patterns
✓ Backend Services: No issues detected
✓ Frontend Components: 2 critical issues, 1 optimization opportunity  
✓ Infrastructure: Configuration optimal
✓ Test Coverage: Validation tests needed for state transitions

🚀 Solution Strategy:
1. Refactor state management (15 min)
2. Add optimization hooks (10 min)
3. Implement state validation tests (15 min)

📁 Files Affected: 
- src/components/UserDashboard.tsx
- src/hooks/useUserPreferences.ts
- src/tests/userDashboard.test.tsx
```

## Error Handling & Recovery

### Graceful Degradation
- **Agent Failure**: Continue with available agents, mark gaps in analysis
- **Timeout Handling**: Partial results with clear indication of incomplete analysis  
- **Context Limitations**: Request user clarification for missing information
- **Fix Validation Failure**: Return to analysis phase with feedback

### Recovery Mechanisms
```python
# Example error recovery flow
try:
    analysis_result = await parallel_analysis()
except AgentTimeoutError as e:
    # Continue with partial results
    partial_results = e.partial_results
    missing_analyses = e.failed_agents
    
    user_message = f"Analysis completed with {len(partial_results)} of {total_agents} agents. "
    user_message += f"Missing: {', '.join(missing_analyses)}. Continue with available analysis?"
    
    if await user_confirm(user_message):
        return synthesize_partial_solution(partial_results)
    else:
        return retry_failed_agents(missing_analyses)
```

## Performance Characteristics

### Execution Time by Phase
- **Phase 1 (Classification)**: 3-8 seconds
- **Phase 2 (Parallel Analysis)**: 15-45 seconds (varies by issue complexity)
- **Phase 3 (Solution Synthesis)**: 8-20 seconds  
- **Phase 4 (Implementation)**: 5-15 seconds

**Total Time**: 30-90 seconds depending on issue complexity

### Resource Usage
- **Memory**: 200-500MB during parallel analysis phase
- **CPU**: Utilizes 3-5 cores during parallel execution
- **Network**: Minimal (only for repository operations)

### Performance Optimization
```python
# Bounded concurrency to prevent resource exhaustion
semaphore = asyncio.Semaphore(4)  # Max 4 concurrent analysis agents

# Timeout handling per agent
async def bounded_analysis(agent, diagnostic_package):
    async with semaphore:
        return await asyncio.wait_for(
            agent.analyze(diagnostic_package), 
            timeout=60.0
        )
```

## Advanced Usage

### Custom Analysis Focus
```bash
/debug "Performance issue in dashboard" --focus=performance
/debug "UI broken on mobile" --focus=frontend --include-screenshots
/debug "Database queries slow" --focus=backend --include-profiling
```

### Integration with Monitoring
```bash
/debug --from-alert="datadog:alert-12345"
/debug --from-logs="error.log:2023-12-07T10:30:00Z"
```

### Team Collaboration
```bash
/debug "Deployment failing" --assign=devops-team --create-ticket
/debug "Critical bug in prod" --priority=high --notify=oncall
```

## Configuration Options

### User Preferences
```yaml
# .claude/settings.local.json
debug_preferences:
  default_mode: "guided"  # auto-fix, guided, report
  auto_commit: false
  create_pr: true
  run_tests: true
  parallel_limit: 4
  timeout_seconds: 300
  notification_channels: ["slack", "email"]
```

### Project Configuration
```yaml
# .claude/project.json
debug_config:
  exclude_paths: ["node_modules", ".git", "dist"]
  priority_files: ["src/**/*.tsx", "src/**/*.ts"]
  test_commands: ["npm test", "npm run e2e"]
  deployment_check: "npm run build"
```

## Integration Examples

### CI/CD Pipeline Integration
```yaml
# .github/workflows/debug-on-failure.yml
name: Auto Debug on Failure
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]
    
jobs:
  debug:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    steps:
      - uses: actions/checkout@v3
      - name: Auto Debug Failed CI
        run: claude debug "CI pipeline failed with errors" --mode=report
```

### Monitoring Integration
```python
# Datadog webhook integration
@app.route('/webhook/datadog', methods=['POST'])
def datadog_alert():
    alert_data = request.json
    if alert_data['alert_type'] == 'error_rate_high':
        subprocess.run([
            'claude', 'debug', 
            f"High error rate detected: {alert_data['message']}",
            '--priority=high',
            '--from-monitoring=datadog'
        ])
```

## Best Practices

### 1. Effective Issue Descriptions
✅ **Good**: "Users can't save profile changes - form submits but data doesn't persist, seeing old values on page refresh"
❌ **Poor**: "Something is broken"

### 2. Progressive Debugging
1. Start with specific symptoms
2. Include reproduction steps if known
3. Mention recent changes or deployments
4. Specify affected user segments or environments

### 3. Team Workflow Integration
- Use `--create-ticket` for issues requiring team collaboration
- Set up automated debugging for critical alerts
- Configure notification channels for high-priority issues
- Establish fix validation processes before production deployment

### 4. Continuous Improvement
- Review debug reports to identify recurring patterns
- Update configuration based on project evolution
- Train team on effective issue description practices
- Monitor command performance and optimize as needed

## Troubleshooting

### Common Issues

**"Analysis timed out"**
- Increase timeout in configuration: `timeout_seconds: 600`
- Focus analysis: `--focus=frontend` or `--focus=backend`
- Reduce parallel limit: `parallel_limit: 2`

**"Insufficient context"**
- Provide more detailed issue description
- Include reproduction steps
- Add relevant error logs or screenshots
- Use interactive mode: `--interactive`

**"Fix validation failed"**
- Review proposed changes manually
- Run in report mode first: `--mode=report`
- Check for conflicting changes in repository
- Verify project configuration is up to date

**"Agent coordination errors"**
- Clear agent cache: `claude debug --clear-cache`
- Check network connectivity
- Verify Claude Code version compatibility
- Restart command with `--verbose` for detailed logs

## Examples & Use Cases

### Frontend Debugging
```bash
# React component not updating
/debug "UserProfile component shows stale data after prop changes"

# Performance issues  
/debug "Dashboard loads slowly on mobile devices" --include-performance-metrics

# State management problems
/debug "Shopping cart loses items on page refresh" --focus=state-management
```

### Backend Debugging  
```bash
# API errors
/debug "POST /api/users returns 500 error for valid payloads"

# Database performance
/debug "User queries taking 5+ seconds in production" --include-db-profiling

# Authentication issues
/debug "JWT tokens expiring unexpectedly for some users"
```

### Infrastructure Debugging
```bash
# Deployment issues
/debug "Docker builds failing after dependency update"

# Configuration problems  
/debug "Environment variables not loading in production"

# Performance bottlenecks
/debug "High memory usage in production containers"
```

### Cross-Domain Issues
```bash
# Complex system issues
/debug "Users experiencing intermittent logout across all platforms"

# Integration problems
/debug "Third-party API integration failing with rate limiting errors"

# Data consistency issues  
/debug "User data sync problems between mobile app and web dashboard"
```

This debug command represents a breakthrough in AI-powered development tools, providing unprecedented depth of analysis while maintaining practical usability for real-world debugging scenarios.