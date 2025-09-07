---
name: implement
description: Implement recommended changes from review files, pasted recommendations, or search documentation for specific improvements
---

# Implement - Smart Recommendation Processor

Intelligently processes and implements recommendations from review files, pasted content, or searches documentation to find and apply suggested changes.

## Usage

```bash
/implement [source]
```

Where `[source]` can be:
- **File path**: `/implement projectDocs/review-file.md` - Process specific review file
- **Description**: `/implement "add error handling to API calls"` - Search docs and implement
- **No args**: Interactive mode to paste recommendations or select from recent reviews

## Implementation

I'll help you implement recommendations efficiently using smart processing:

### Step 1: Determine Source Type
First, I'll identify what type of input you've provided:

**If file path provided:**
<function_calls>
<invoke name="Read">
<parameter name="file_path">{file_path}</parameter>
</invoke>
</function_calls>

**If description provided:**
<function_calls>
<invoke name="Glob">
<parameter name="pattern">projectDocs/**/*.md</parameter>
</invoke>
</function_calls>

**If no args (interactive mode):**
I'll ask you to either:
- Paste recommendations directly
- Select from recent review files
- Provide a description to search for

### Step 2: Extract Actionable Recommendations
<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Parse and categorize recommendations", "status": "in_progress", "activeForm": "Parsing and categorizing recommendations"}, {"content": "Identify files and code sections to modify", "status": "pending", "activeForm": "Identifying files and code sections to modify"}, {"content": "Apply changes systematically", "status": "pending", "activeForm": "Applying changes systematically"}, {"content": "Verify implementation", "status": "pending", "activeForm": "Verifying implementation"}]</parameter>
</invoke>
</function_calls>

I'll analyze the recommendations and categorize them:
- **Code Changes**: Specific file modifications needed
- **New Features**: Files/components to create  
- **Refactoring**: Structural improvements to apply
- **Dependencies**: Packages to install/update

### Step 3: Systematic Implementation
For each recommendation, I'll:

1. **Locate Target Files**:
<function_calls>
<invoke name="Grep">
<parameter name="pattern">{search_term}</parameter>
<parameter name="output_mode">files_with_matches</parameter>
</invoke>
</function_calls>

2. **Read Current Implementation**:
<function_calls>
<invoke name="Read">
<parameter name="file_path">{target_file}</parameter>
</invoke>
</function_calls>

3. **Apply Changes**:
<function_calls>
<invoke name="Edit">
<parameter name="file_path">{target_file}</parameter>
<parameter name="old_string">{current_code}</parameter>
<parameter name="new_string">{improved_code}</parameter>
</invoke>
</function_calls>

### Step 4: Validation & Quality Checks
<function_calls>
<invoke name="Bash">
<parameter name="command">npm run lint</parameter>
<parameter name="description">Run linting to check code quality</parameter>
</invoke>
</function_calls>

<function_calls>
<invoke name="Bash">
<parameter name="command">npm run build</parameter>
<parameter name="description">Verify build passes after changes</parameter>
</invoke>
</function_calls>

## Usage Examples

### Example 1: Implement from Review File
```bash
/implement projectDocs/ux-review-recommendations.md
```
**What happens:**
- Reads the review file completely
- Extracts specific UI/UX improvements  
- Implements component changes systematically
- Runs quality checks and validation

### Example 2: Implement from Description
```bash
/implement "add error handling to all API calls"
```
**What happens:**
- Searches for API call patterns in codebase
- Identifies files needing error handling
- Implements try-catch blocks and error states
- Verifies implementation with build checks

### Example 3: Interactive Mode
```bash
/implement
```
**What happens:**
- Prompts for recommendation source
- Offers to scan recent review files
- Accepts pasted recommendations
- Processes and implements systematically

### Example 4: Pasted Recommendations
```bash
/implement "1. Add loading states to buttons 2. Implement dark mode toggle 3. Fix mobile responsive issues"
```

## Smart Processing Features

### Recommendation Types Handled
- **Code Reviews**: Security, performance, style improvements
- **UX Reviews**: Interface enhancements, accessibility fixes  
- **Architecture Reviews**: Structural improvements, refactoring
- **QA Reviews**: Bug fixes, edge case handling

### Intelligent Search
- Automatically finds relevant files using patterns
- Understands component relationships and dependencies
- Prioritizes high-impact changes first
- Handles complex refactoring across multiple files

### Quality Assurance
- Always runs linting after changes
- Verifies build passes before completion
- Maintains existing code style and conventions
- Preserves functionality while implementing improvements

## Error Handling

### Common Issues and Solutions
- **File not found**: Falls back to interactive search
- **Ambiguous recommendations**: Asks for clarification
- **Build failures**: Shows specific errors and suggests fixes
- **Lint errors**: Automatically attempts to fix style issues

### Graceful Degradation
- Partial implementation if some changes fail
- Clear progress tracking throughout process
- Detailed error messages with suggested fixes
- Option to continue with remaining recommendations