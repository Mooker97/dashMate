---
name: qa
description: Execute comprehensive Quality Assurance pipeline with parallel UI testing, code quality review, and performance analysis
---

# Quality Assurance Pipeline

Orchestrates a comprehensive QA pipeline using parallel agent execution to deliver thorough analysis across UI testing, code quality, and performance optimization with automated documentation and PR creation.

## Command Usage

```bash
# Full QA analysis (default)
claude qa

# Scope-focused analysis
claude qa ui                # UI testing and accessibility
claude qa code             # Code quality and architecture  
claude qa performance      # Performance and optimization
claude qa quick           # Essential checks only
claude qa accessibility   # ADHD-specific accessibility focus

# Interactive mode
claude qa --interactive
```

## Agent Architecture

### Coordination Flow
```
User Input → task-delegator (scope analysis) →
├── ux-playwright-reviewer (UI testing)
├── code-archivist (code quality review)  
└── backend-engineer (performance checks)
→ documentation-writer (report synthesis) → github-repo-manager (PR creation)
```

### Agent Definitions

**task-delegator**: Central coordinator
- Scope analysis and validation
- Parallel execution orchestration
- Result aggregation and synthesis
- Cross-stream correlation analysis

**ux-playwright-reviewer**: UI testing stream
- Browser automation and screenshot capture
- Accessibility audits and WCAG compliance
- ADHD-friendly UX analysis
- Interactive element testing

**code-archivist**: Code quality stream  
- TypeScript/React code quality analysis
- Architecture pattern validation
- Documentation completeness review
- Technical debt assessment

**backend-engineer**: Performance stream
- Performance bottleneck identification
- Next.js optimization opportunities
- Database and API performance analysis
- Scalability assessment

**documentation-writer**: Report generation
- Multi-stream finding synthesis
- Comprehensive QA report creation
- Executive summary generation
- Actionable improvement roadmap

**github-repo-manager**: Integration management
- Feature branch creation
- QA findings commit and PR creation
- Repository workflow integration
- Result artifact management

## Execution Flow

### Phase 1: Scope Analysis & Planning
The task-delegator analyzes the provided scope and creates an execution plan:

```prompt
I need to execute a comprehensive QA analysis. Let me start by understanding the scope and current project state.

Scope parameter: {scope}
Available scopes: full, ui, code, performance, quick, accessibility

First, let me analyze the project structure and determine which QA streams should be activated based on the scope.

*Analyzes project structure, validates scope, checks prerequisites*

Based on the scope "{scope}", I'll coordinate the following QA streams:
- UI Testing: {ui_enabled}
- Code Quality: {code_enabled}  
- Performance: {performance_enabled}

Let me now orchestrate the parallel execution of these QA streams.
```

### Phase 2: Parallel QA Stream Execution
Three specialized agents execute simultaneously with scope-specific focus:

#### UI Testing Stream (ux-playwright-reviewer)
```prompt
I'm executing UI testing and accessibility analysis for the dashMate ADHD task management app.

Scope focus: {ui_scope_details}

Key areas to analyze:
- Microphone button accessibility and interaction patterns
- Task list visual hierarchy and cognitive load
- Color contrast for priority indicators (high/medium/low)  
- ADHD-specific UX considerations (attention management, visual clarity)
- Mobile responsiveness and touch targets
- Screen reader compatibility

Let me start by launching the development server and capturing the current UI state, then perform comprehensive accessibility testing.

*Performs browser automation, screenshot capture, and accessibility audits*

Findings Summary:
- UI Issues Found: {ui_issue_count}
- Accessibility Violations: {a11y_violation_count}
- ADHD-Specific Recommendations: {adhd_recommendation_count}

Detailed findings:
{ui_findings_detailed}
```

#### Code Quality Stream (code-archivist)
```prompt
I'm analyzing code quality and architectural patterns for the dashMate application.

Scope focus: {code_scope_details}

Key areas to review:
- TypeScript usage and type safety
- React component patterns and hook usage
- Next.js App Router implementation
- Tailwind CSS organization and utility usage
- Code organization and separation of concerns
- Documentation completeness

Let me examine the codebase structure and analyze code quality metrics.

*Analyzes source code, documentation, and architectural patterns*

Findings Summary:
- Code Quality Issues: {code_issue_count}
- Architecture Improvements: {arch_improvement_count}
- Documentation Gaps: {doc_gap_count}

Detailed findings:
{code_findings_detailed}
```

#### Performance Stream (backend-engineer)
```prompt
I'm conducting performance analysis and optimization assessment for the dashMate application.

Scope focus: {performance_scope_details}

Key areas to analyze:
- Next.js build performance and bundle optimization
- Client-side rendering performance
- Component re-render optimization opportunities
- Asset loading and optimization
- Development server performance
- Mobile performance characteristics

Let me analyze the current performance profile and identify optimization opportunities.

*Analyzes performance metrics, bundle size, and optimization opportunities*

Findings Summary:  
- Performance Issues: {perf_issue_count}
- Optimization Opportunities: {optimization_count}
- Bundle Analysis: {bundle_insights}

Detailed findings:
{performance_findings_detailed}
```

### Phase 3: Result Aggregation & Synthesis
The task-delegator collects and correlates findings from all active streams:

```prompt
I've completed the parallel QA analysis across all requested streams. Let me now aggregate and synthesize the findings to identify cross-stream insights and prioritize recommendations.

Stream Results Summary:
- UI Testing: {ui_summary}
- Code Quality: {code_summary}
- Performance: {performance_summary}

Cross-Stream Correlations Identified:
{cross_stream_insights}

Priority Matrix (Impact vs Effort):
- Critical Issues: {critical_issues}
- High Priority: {high_priority_issues}
- Quick Wins: {quick_wins}
- Long-term Improvements: {long_term_improvements}

Synthesized Recommendations:
{synthesized_recommendations}

Now passing aggregated results to documentation-writer for comprehensive report generation.
```

### Phase 4: Documentation & Integration
Sequential execution for report generation and PR creation:

#### Report Generation (documentation-writer)
```prompt
I'm generating a comprehensive QA report from the aggregated findings across UI, code quality, and performance streams.

Input Data:
- Total Findings: {total_findings}
- Streams Analyzed: {analyzed_streams}
- Cross-Stream Correlations: {correlations}

Creating structured QA report with:
1. Executive Summary
2. Stream-Specific Findings
3. Cross-Stream Analysis  
4. Priority Matrix
5. Implementation Roadmap
6. ADHD-Specific Recommendations

*Generates comprehensive documentation with actionable insights*

QA Report Generated:
- Report File: qa-report-{timestamp}.md
- Executive Summary: {exec_summary}
- Total Recommendations: {total_recommendations}
- Estimated Implementation Effort: {effort_estimate}

Passing to github-repo-manager for PR creation.
```

#### PR Creation (github-repo-manager)
```prompt  
I'm creating a pull request with the comprehensive QA analysis findings and recommendations.

QA Analysis Results:
- Findings Count: {findings_count}
- Priority Distribution: {priority_distribution}
- Estimated Impact: {impact_assessment}

Creating feature branch and PR with:
- QA report documentation
- Screenshot artifacts (if applicable)
- Implementation checklist
- Priority-based improvement roadmap

*Creates feature branch, commits artifacts, and generates PR*

Pull Request Created:
- Branch: qa-analysis-{timestamp}
- PR Title: "QA Analysis: {scope} - {findings_count} findings identified"
- PR URL: {pr_url}

QA pipeline execution completed successfully.
```

## Scope Parameter Details

### Full Analysis (`full`)
- **Duration**: 4-6 minutes
- **Coverage**: All QA streams with comprehensive analysis
- **Agents**: All 6 agents activated
- **Output**: Complete QA report + PR with all findings

### UI Focus (`ui`)  
- **Duration**: 2-3 minutes
- **Coverage**: UI testing, accessibility, ADHD-specific UX
- **Agents**: task-delegator, ux-playwright-reviewer, documentation-writer, github-repo-manager
- **Output**: UI-focused report with screenshots and accessibility audit

### Code Quality (`code`)
- **Duration**: 2-3 minutes  
- **Coverage**: Code quality, architecture, documentation
- **Agents**: task-delegator, code-archivist, documentation-writer, github-repo-manager
- **Output**: Code quality report with architectural recommendations

### Performance (`performance`)
- **Duration**: 2-3 minutes
- **Coverage**: Performance analysis, optimization opportunities  
- **Agents**: task-delegator, backend-engineer, documentation-writer, github-repo-manager
- **Output**: Performance report with optimization roadmap

### Quick Check (`quick`)
- **Duration**: 90 seconds
- **Coverage**: Essential checks across all streams
- **Agents**: All agents with reduced analysis depth
- **Output**: Summary report with critical findings only

### Accessibility Focus (`accessibility`)
- **Duration**: 3-4 minutes
- **Coverage**: ADHD-specific accessibility and UX considerations
- **Agents**: Enhanced focus on accessibility across all streams
- **Output**: Accessibility-focused report with ADHD-specific recommendations

## Error Handling

### Stream Isolation
Each QA stream operates independently to prevent cascade failures:

```prompt
Error detected in {stream_name} stream: {error_details}

Implementing error recovery strategy:
- Isolating failed stream from parallel execution
- Continuing with remaining active streams  
- Generating partial results with failure notation
- Including recovery recommendations in final report

Execution continuing with reduced scope: {remaining_streams}
```

### Graceful Degradation
```prompt
Resource constraint detected: {constraint_details}

Implementing graceful degradation:
- Reducing analysis depth for performance optimization
- Prioritizing critical findings over comprehensive coverage
- Adjusting parallel execution to sequential if needed
- Maintaining result quality with reduced scope

Modified execution plan: {degraded_plan}
```

### Recovery Strategies
```prompt
Pipeline failure detected at {failure_point}: {failure_reason}

Available recovery options:
1. Retry with reduced scope
2. Continue with partial results  
3. Generate failure analysis report
4. Provide manual recovery steps

Recommended action: {recovery_recommendation}

Would you like me to:
- Implement automatic recovery
- Generate diagnostic report
- Provide manual troubleshooting steps
```

## Interactive Mode

When executed with `--interactive`, the command provides guided setup:

```prompt
Welcome to the dashMate QA Pipeline! 

I'll help you configure a comprehensive quality assurance analysis tailored to your current needs.

Current Project: dashMate ADHD Task Management App
Detected Components: Next.js 15, React 19, TypeScript, Tailwind CSS

What type of QA analysis would you like to run?

1. 🔍 Full Analysis - Comprehensive review across all areas (4-6 min)
2. 🎨 UI Focus - Interface and accessibility analysis (2-3 min)  
3. ⚡ Code Quality - Architecture and code review (2-3 min)
4. 🚀 Performance - Speed and optimization analysis (2-3 min)
5. ⚡ Quick Check - Essential findings only (90 sec)
6. ♿ Accessibility - ADHD-specific UX review (3-4 min)
7. 🛠️ Custom Scope - Define specific areas to analyze

Please enter your choice (1-7): {user_input}

{scope_specific_questions_based_on_choice}

Perfect! I'll execute a {selected_scope} analysis. This will involve:
{execution_plan}

Ready to start? (Y/n): {confirmation}

Initiating QA pipeline with {final_scope} scope...
```

## Output Artifacts

### QA Report Structure
```markdown
# QA Analysis Report - {timestamp}

## Executive Summary
- **Analysis Scope**: {scope}
- **Total Findings**: {count} 
- **Critical Issues**: {critical_count}
- **Estimated Fix Effort**: {effort}

## Stream Results

### UI Testing Results
{ui_findings}

### Code Quality Results  
{code_findings}

### Performance Results
{performance_findings}

## Cross-Stream Analysis
{correlations}

## Priority Matrix
{priority_breakdown}

## Implementation Roadmap
{roadmap}

## ADHD-Specific Considerations
{adhd_recommendations}
```

### PR Template
```markdown
# QA Analysis: {scope} - {findings_count} findings identified

## Summary
Comprehensive QA analysis completed for dashMate ADHD task management application.

**Analysis Scope**: {scope}
**Findings**: {findings_breakdown}
**Priority Distribution**: {priority_stats}

## Key Findings

### 🚨 Critical Issues
{critical_issues}

### ⚡ Quick Wins  
{quick_wins}

### 🎯 High Impact Improvements
{high_impact_items}

## Files Changed
- `qa-report-{timestamp}.md` - Comprehensive QA analysis report
- `qa-screenshots/` - UI testing artifacts (if applicable)
- `performance-metrics.json` - Performance analysis data (if applicable)

## Next Steps
1. Review critical issues for immediate attention
2. Prioritize quick wins for next sprint
3. Plan high impact improvements for upcoming releases
4. Monitor accessibility improvements for ADHD users

## Testing
- [x] UI accessibility validation
- [x] Code quality metrics
- [x] Performance baseline established
- [x] Cross-stream correlation analysis

🤖 Generated with Claude Code QA Pipeline
```

This comprehensive QA pipeline provides thorough analysis capabilities while maintaining efficiency through parallel execution and intelligent coordination. The command adapts to different scope requirements while ensuring consistent quality and actionable insights for the dashMate ADHD task management application.