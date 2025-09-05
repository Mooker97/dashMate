# Document Command

## Overview
The `/document` command helps create, update, and manage project documentation. It leverages the code-archivist agent to maintain comprehensive, human-readable records and documentation.

## Usage
```
/document "description of what needs to be documented"
```

## Implementation
When this command is invoked, Claude should:

1. Extract the description from the quoted string
2. Use the Task tool with the following parameters:
   - `subagent_type`: "code-archivist"
   - `description`: "Document changes or create documentation"
   - `prompt`: A formatted prompt that includes:
     - The user's description of what needs to be documented
     - Current project context (dashMate - ADHD-friendly task management app)
     - Request to check ROADMAP.md for applicable items
     - Request for appropriate documentation creation or updates

3. The code-archivist will:
   - Check ROADMAP.md for any related roadmap items that may be affected
   - Analyze what type of documentation is needed and create/update appropriate files
   - Update roadmap status if documented item represents completion of a roadmap feature
   - Cross-reference roadmap items in the documentation
4. Documentation will be saved to the appropriate location based on the archivist's analysis
5. Check and update ROADMAP.md if the documented item relates to or completes a roadmap feature
6. Relevant indexes, changelogs, or cross-references will be updated as needed

## Documentation Approach
The code-archivist agent will automatically determine the appropriate documentation based on your description:

**Changelog Updates** - For new features, changes, fixes, or removals
**API Documentation** - For new endpoints, modified interfaces, or data structures  
**Feature Documentation** - For new components, user-facing features, or functionality
**Technical Documentation** - For architecture changes, system modifications, or technical decisions
**Setup/Configuration** - For environment, build, or deployment related changes
**Roadmap Integration** - Check ROADMAP.md for related items and update status if features are completed

## Example Prompt Template
```
Please analyze and document the following: "{user_description}"

Project Context: dashMate - ADHD-friendly task management app with React/Next.js, TypeScript, Tailwind CSS.

As the code-archivist, determine what type of documentation is needed based on the description and:
- Check ROADMAP.md for any related roadmap items that may be affected by this documentation
- Create or update appropriate documentation files
- Follow your documentation standards for clear, accessible language
- Update changelogs if this represents a change or new feature
- Update roadmap status if this documentation represents completion of a roadmap feature
- Ensure proper markdown formatting and project consistency
- Cross-reference related documentation and roadmap items as needed

Provide comprehensive documentation that maintains project records and helps future development.
```

## Examples
- `/document "new priority filter component for tasks"`
- `/document "refactored authentication system with JWT"`
- `/document "added dark mode theme support"`
- `/document "API endpoint for user preferences"`
- `/document "database migration for task categories"`

## Expected Behavior
1. Parse the description of what needs to be documented
2. Invoke code-archivist agent with the description and project context
3. Code-archivist checks ROADMAP.md for applicable or related items
4. Determines appropriate documentation type and location
5. Creates or updates relevant documentation files (changelog, feature docs, API docs, etc.)
6. Updates roadmap status if documented item represents completion of a roadmap feature
7. Ensures proper formatting, cross-references, and project consistency
8. Confirms successful documentation with details of what was created/updated and any roadmap changes

## File Organization
The code-archivist maintains documentation following project standards:
- `CHANGELOG.md` - Version history and change records
- `ROADMAP.md` - Project roadmap with feature status updates
- `/docs/` - Comprehensive project documentation
- `README.md` - Project overview and quick start
- Component/API specific docs as needed
- Cross-references between related documentation and roadmap items
