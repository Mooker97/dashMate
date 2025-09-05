# dashMate - Local Setup Guide

## Prerequisites

Before setting up dashMate locally, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **A code editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

## Step-by-Step Setup Instructions

### 1. Clone the Repository

```bash
# If you already have the project, skip this step
git clone [your-repository-url]
cd dashMate/dashmate
```

### 2. Install Dependencies

```bash
# Install all required packages
npm install

# Or if using yarn
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# OpenAI API (Optional - for AI features)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here

# Supabase (Optional - for cloud sync)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=dashMate
```

**Note**: The app works without these environment variables using local storage and mock AI responses.

### 4. Database Setup (Optional)

If you want to use Supabase for cloud sync:

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the SQL schema from `supabase-schema.sql` in the Supabase SQL editor:
   
```sql
-- Run the contents of supabase-schema.sql in your Supabase SQL editor
```

4. Copy your project URL and anon key to `.env.local`

### 5. Start the Development Server

```bash
# Start the development server
npm run dev

# Or if using yarn
yarn dev
```

The app will be available at:
- **http://localhost:3000** (or next available port like 3001, 3002, etc.)

### 6. Clear Browser Cache (If Needed)

If you experience issues:

1. Open Developer Tools (F12)
2. Go to Application/Storage tab
3. Clear Local Storage for localhost
4. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

## Troubleshooting Common Issues

### Port Already in Use

If port 3000 is in use, the app will automatically use the next available port (3001, 3002, etc.)

```bash
# To use a specific port
npm run dev -- -p 3005
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Cache Issues

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### TypeScript Errors

```bash
# Check for TypeScript issues
npx tsc --noEmit

# Auto-fix formatting issues
npm run lint -- --fix
```

## Features Overview

Once running, you'll have access to:

- 🎤 **Voice AI Coach**: Click the microphone to speak with your ADHD coach
- ⚡ **Energy Tracker**: Monitor your energy levels throughout the day
- 🔥 **Habit Tracker**: Build and maintain positive habits
- 🎯 **Focus Sessions**: Pomodoro timer with ADHD-friendly intervals
- 🔔 **Smart Notifications**: Contextual reminders based on your patterns
- 🎨 **Color Customization**: 8 neutral color palettes to reduce overwhelm
- 📊 **Analytics**: Track your productivity patterns
- ⚙️ **Settings**: Extensive customization options

## Quick Start Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript

# Testing
npm run test         # Run tests (when configured)
```

## Data Storage

By default, dashMate stores all data locally in your browser using localStorage. This means:

- ✅ Your data is private and secure
- ✅ Works offline
- ✅ No account required
- ⚠️ Data is tied to your browser (won't sync across devices)

To enable cloud sync, configure Supabase in your environment variables.

## Browser Requirements

dashMate works best on modern browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Getting Help

- Check the `/docs` folder for additional documentation
- Review `CHANGELOG.md` for recent updates
- Open an issue on GitHub for bugs or feature requests

## Next Steps

1. Start the app with `npm run dev`
2. Open http://localhost:3000 in your browser
3. Click the microphone to start interacting with your AI coach
4. Explore the features using the navigation buttons
5. Customize your experience in Settings

Happy productivity! 🚀