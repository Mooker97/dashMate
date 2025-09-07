---
name: ux-review
description: Comprehensive UX analysis with automated testing and actionable recommendations
agents:
  - name: ux-analyst
    role: Senior UX Analyst specializing in automated testing and heuristic evaluation
    model: sonnet
---

# UX Review Command

Performs comprehensive UX analysis of the dashMate application using automated testing, heuristic evaluation, and accessibility assessment.

## Agent Architecture

### UX Analyst Agent
**Role**: Senior UX Analyst specializing in automated testing and heuristic evaluation
**Model**: Sonnet - Provides expert-level UX analysis and strategic recommendations
**Expertise**: Nielsen's heuristics, WCAG accessibility, ADHD-specific design patterns

**Responsibilities**:
- Coordinate automated browser testing via ux-playwright-reviewer agent
- Analyze screenshots and interaction flows
- Apply UX heuristics and accessibility standards
- Generate priority-based action plan
- Create structured reports for development team

## Implementation Flow

### Phase 1: Environment Setup
```python
def setup_ux_review_environment():
    """Prepare environment for UX analysis."""
    # Check if development server is running
    server_status = check_dev_server()
    
    if not server_status.running:
        print("Development server not detected. Starting server...")
        start_dev_server()
        wait_for_server_ready()
    
    # Ensure project docs directory exists
    ensure_directory_exists("projectDocs")
    ensure_directory_exists("projectDocs/screenshots")
    
    return {
        'server_url': 'http://localhost:3000',
        'output_dir': 'projectDocs',
        'screenshots_dir': 'projectDocs/screenshots'
    }
```

### Phase 2: Automated Testing Delegation
```python
def delegate_automated_testing():
    """Delegate browser automation to ux-playwright-reviewer agent."""
    task_prompt = """
    Perform comprehensive UX analysis of the dashMate ADHD task management app:
    
    1. Navigate to http://localhost:3000
    2. Capture screenshots of key states:
       - Initial page load
       - Microphone button states (idle, listening)
       - Task list with various priorities
       - Mobile responsive views
    3. Test interaction flows:
       - Microphone button click
       - Task completion toggles
       - Priority level changes
       - Keyboard navigation
    4. Analyze accessibility:
       - Focus indicators
       - Color contrast ratios
       - Screen reader compatibility
       - WCAG 2.1 compliance
    5. Document findings with timestamps
    
    Focus areas for ADHD-friendly design:
    - Visual clarity and generous whitespace
    - Clear interaction feedback
    - Distraction-free interface
    - Intuitive task organization
    """
    
    # Use Task tool to invoke ux-playwright-reviewer agent
    automation_results = invoke_task_agent('ux-playwright-reviewer', task_prompt)
    return process_automation_results(automation_results)
```

### Phase 3: Heuristic Analysis
```python
def perform_heuristic_analysis(automation_data):
    """Apply UX heuristics to automation findings."""
    heuristics_checklist = {
        'visibility_of_system_status': analyze_feedback_systems(automation_data),
        'match_real_world': analyze_mental_models(automation_data),
        'user_control_freedom': analyze_undo_redo_capabilities(automation_data),
        'consistency_standards': analyze_design_consistency(automation_data),
        'error_prevention': analyze_error_handling(automation_data),
        'recognition_vs_recall': analyze_cognitive_load(automation_data),
        'flexibility_efficiency': analyze_shortcuts_customization(automation_data),
        'aesthetic_minimalist': analyze_visual_hierarchy(automation_data),
        'help_error_recovery': analyze_error_messages(automation_data),
        'documentation': analyze_onboarding_help(automation_data)
    }
    
    # ADHD-specific heuristics
    adhd_analysis = {
        'attention_management': analyze_distraction_factors(automation_data),
        'executive_function': analyze_task_organization(automation_data),
        'working_memory': analyze_cognitive_complexity(automation_data),
        'hyperfocus_accommodation': analyze_flow_state_support(automation_data),
        'reward_systems': analyze_motivation_features(automation_data)
    }
    
    return combine_analyses(heuristics_checklist, adhd_analysis)
```

### Phase 4: Priority Classification
```python
def classify_findings_by_priority(analysis_results):
    """Classify UX issues by impact and urgency."""
    priority_matrix = {
        'critical': [],  # Blocking user tasks, accessibility violations
        'high': [],      # Significant usability issues, missing feedback
        'medium': [],    # Enhancement opportunities, nice-to-haves
        'low': []        # Polish items, future considerations
    }
    
    for finding in analysis_results:
        impact_score = calculate_impact_score(finding)
        urgency_score = calculate_urgency_score(finding)
        
        if impact_score >= 8 or urgency_score >= 8:
            priority_matrix['critical'].append(finding)
        elif impact_score >= 6 or urgency_score >= 6:
            priority_matrix['high'].append(finding)
        elif impact_score >= 4 or urgency_score >= 4:
            priority_matrix['medium'].append(finding)
        else:
            priority_matrix['low'].append(finding)
    
    return priority_matrix
```

### Phase 5: Report Generation
```python
def generate_ux_review_report(prioritized_findings, screenshots_dir):
    """Generate structured UX review report."""
    report_structure = {
        'header': create_report_header(),
        'critical_fixes': format_priority_section(prioritized_findings['critical']),
        'high_priority': format_priority_section(prioritized_findings['high']),
        'medium_priority': format_priority_section(prioritized_findings['medium']),
        'adhd_specific': format_adhd_recommendations(prioritized_findings),
        'implementation_checklist': generate_implementation_timeline(prioritized_findings),
        'quick_wins': identify_quick_wins(prioritized_findings),
        'testing_requirements': generate_testing_checklist(),
        'success_metrics': define_success_criteria()
    }
    
    # Ensure report stays within 100-line limit
    formatted_report = format_concise_report(report_structure)
    
    # Save to projectDocs/UX-REVIEW.md
    save_report('projectDocs/UX-REVIEW.md', formatted_report)
    
    return {
        'report_path': 'projectDocs/UX-REVIEW.md',
        'screenshots_path': screenshots_dir,
        'findings_count': count_total_findings(prioritized_findings)
    }
```

## Error Handling Strategy

### Server Management
```python
def handle_server_errors():
    """Handle development server issues gracefully."""
    try:
        if not check_server_health():
            restart_dev_server()
            wait_for_server_ready(timeout=60)
    except ServerStartupError as e:
        return {
            'error': 'Failed to start development server',
            'suggestion': 'Please run `npm run dev` manually and try again',
            'details': str(e)
        }
```

### Automation Failures
```python
def handle_automation_failures(error):
    """Handle browser automation issues."""
    error_recovery = {
        'browser_launch': 'Try running: npx playwright install',
        'navigation_timeout': 'Check if server is accessible at localhost:3000',
        'screenshot_failure': 'Ensure adequate disk space and permissions',
        'accessibility_scan': 'Continue with manual heuristic analysis'
    }
    
    error_type = classify_automation_error(error)
    recovery_action = error_recovery.get(error_type, 'unknown_error')
    
    return execute_fallback_strategy(recovery_action, error)
```

## Usage Examples

### Example 1: Complete UX Review
```bash
claude ux-review
```
Performs full analysis with automated testing, generates UX-REVIEW.md with prioritized findings

### Example 2: Targeted System Review
```bash
claude ux-review --system accessibility
```
Focuses specifically on accessibility compliance and WCAG violations

### Example 3: Mobile-First Review
```bash
claude ux-review --system mobile
```
Analyzes mobile responsiveness and touch interaction patterns

### Example 4: ADHD-Focused Analysis
```bash
claude ux-review --system adhd
```
Concentrates on ADHD-specific design patterns and cognitive load factors

## Output Structure

```
projectDocs/
├── UX-REVIEW.md (Exactly 100 lines or less)
│   ├── Critical Fixes (Do Today)
│   ├── High Priority (This Week)
│   ├── Medium Priority (Next Sprint)
│   ├── ADHD-Specific Features
│   ├── Implementation Checklist
│   ├── Quick Wins
│   ├── Testing Requirements
│   └── Success Metrics
└── screenshots/ (Timestamped screenshots)
    ├── initial-load-{timestamp}.png
    ├── microphone-states-{timestamp}.png
    ├── task-interactions-{timestamp}.png
    └── mobile-views-{timestamp}.png
```

## Integration with Existing Tools

The command leverages:
- **ux-playwright-reviewer agent**: Handles all browser automation and screenshot capture
- **Task tool**: Coordinates agent delegation and result processing
- **Project structure**: Integrates with existing projectDocs folder organization
- **Development workflow**: Works with existing npm scripts and dev server

## Performance Characteristics

- **Analysis Duration**: 2-3 minutes for complete review
- **Screenshot Count**: 8-12 key interaction states
- **Report Size**: Exactly 100 lines (concise, actionable format)
- **Resource Usage**: Minimal - leverages existing development environment

## Notes

- Automatically detects and starts development server if not running
- Integrates seamlessly with existing dashMate project structure
- Generates reports compatible with development workflow
- Prioritizes actionable findings over comprehensive documentation
- Maintains focus on ADHD-specific UX considerations
- Uses existing ux-playwright-reviewer agent for all browser automation
- Preserves screenshot organization with timestamps for reference