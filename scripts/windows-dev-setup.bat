@echo off
REM Windows Development Setup Script for dashMate
REM This script helps set up the development environment on Windows

echo ====================================
echo  dashMate - Windows Dev Setup
echo ====================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from: https://nodejs.org/
    echo Recommended version: 18.x or 20.x
    pause
    exit /b 1
) else (
    echo ✅ Node.js is installed
    node --version
)

echo.
echo [2/5] Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available
    pause
    exit /b 1
) else (
    echo ✅ npm is available
    npm --version
)

echo.
echo [3/5] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
) else (
    echo ✅ Dependencies installed successfully
)

echo.
echo [4/5] Running type checking...
npm run typecheck
if %errorlevel% neq 0 (
    echo ⚠️  TypeScript errors found - build may fail
    echo Run 'npm run lint:fix' to auto-fix some issues
) else (
    echo ✅ No TypeScript errors
)

echo.
echo [5/5] Checking port 3000 availability...
npm run dev:check
if %errorlevel% neq 0 (
    echo ⚠️  Port 3000 is occupied
    echo Next.js will automatically use an available port
)

echo.
echo ====================================
echo  Setup Complete! 
echo ====================================
echo.
echo Available commands:
echo   npm run dev          - Start development server
echo   npm run dev:clean    - Clean build cache and start dev server
echo   npm run build        - Build for production
echo   npm run lint         - Check code quality
echo   npm run lint:fix     - Auto-fix linting issues
echo   npm run clean        - Clean build cache
echo   npm run typecheck    - Check TypeScript types
echo.
echo Ready to start development! Run: npm run dev
pause