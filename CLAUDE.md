# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**dashMate** is an ADHD-friendly task management app with conversational AI coaching. The app provides gentle accountability, generous praise, and intelligent organization support through a conversational AI interface.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run dev:turbo` - Start development server with Turbo mode enabled
- `npm run build` - Build production bundle with Turbopack
- `npm run build:standard` - Build with standard webpack (fallback)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run lint:fix` - Auto-fix linting issues
- `npm run typecheck` - Check TypeScript types without emitting files

### Windows-Specific Commands
- `npm run clean` - Clean .next and cache directories (Windows CMD syntax)
- `npm run clean:all` - Full clean: remove node_modules and reinstall
- `npm run dev:check` - Check development environment (port availability, Node.js, etc.)
- `npm run dev:clean` - Clean build cache and start development server
- `scripts\windows-dev-setup.bat` - Windows development environment setup
- `scripts\windows-troubleshoot.bat` - Troubleshoot common Windows development issues

### Environment Variables
- Set `WEBPACK_POLL=true` if experiencing file watching issues on Windows

## Architecture

**Framework Stack:**
- Next.js 15.5.2 with App Router
- TypeScript for type safety
- Tailwind CSS 4.0 for styling
- React 19.1.0 with hooks for state management

**Project Structure:**
- `src/app/` - App Router pages and layouts
- `src/app/page.tsx` - Main landing page with microphone interface and task list
- `src/app/layout.tsx` - Root layout with Geist font configuration
- Path aliases: `@/*` maps to `./src/*`

**Core Features:**
- Large microphone button as primary interaction point (toggles listening state)
- Interactive task list with priority color coding (high/medium/low)
- ADHD-friendly visual design with generous whitespace and calming gradients
- Responsive mobile-first design with accessibility considerations

**Key Design Patterns:**
- Client components (`'use client'`) for interactive features
- React hooks for state management (tasks, listening state)
- Tailwind utility classes with conditional styling based on state
- Priority-based color coding system (red/yellow/green for high/medium/low)

**Task Data Structure:**
```typescript
interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}
```

The app is designed to eventually integrate with OpenAI API for conversational AI coaching, with the current microphone interface serving as the foundation for voice interaction.

## Windows Development Setup

This project is fully compatible with Windows development environments.

### Quick Start for Windows
1. **First-time setup:** Run `scripts\windows-dev-setup.bat` 
2. **Daily development:** Use `npm run dev` to start the server
3. **Troubleshooting:** Run `scripts\windows-troubleshoot.bat`

### Common Windows Issues & Solutions

**EPERM Errors (File Permission Issues):**
```cmd
npm run clean
npm run dev
```

**Port 3000 Already in Use:**
```cmd
npm run dev:check  # Shows what's using the port
# Next.js will automatically use port 3001, 3002, etc.
```

**File Watching Issues:**
```cmd
set WEBPACK_POLL=true
npm run dev
```

**Build Cache Issues:**
```cmd
npm run clean:all  # Nuclear option: full reset
```

**TypeScript/Linting Issues:**
```cmd
npm run typecheck  # Check for TypeScript errors
npm run lint:fix   # Auto-fix many issues
```

### Windows-Specific Optimizations
- **Turbopack:** Enabled by default for faster builds on Windows
- **File Watching:** Optimized webpack configuration for Windows file system
- **Path Resolution:** Windows-friendly module resolution in Next.js config
- **Cache Management:** Windows CMD-compatible clean scripts

### Development Environment Notes
- **Node.js:** Recommended versions 18.x or 20.x
- **Terminal:** Works with Command Prompt, PowerShell, or Git Bash
- **Port Management:** Automatic port detection if 3000 is occupied
- **File Permissions:** Handles Windows NTFS permissions correctly

## Important Instructions
- please put all reviews like this into the projectDocs folder
- please stop creating dev servers, I will have the project running on port 3000, let me know if it is not running and i will start it myself
- I am developing on windows and as such will need the project to be able to run on windows for dev purposes