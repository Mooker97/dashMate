# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**dashMate** is an ADHD-friendly task management app with conversational AI coaching. The app provides gentle accountability, generous praise, and intelligent organization support through a conversational AI interface.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build production bundle with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

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
- please put all reviews like this into the projectDocs folder