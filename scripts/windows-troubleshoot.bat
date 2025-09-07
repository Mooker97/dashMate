@echo off
REM Windows Troubleshooting Script for dashMate
REM Helps diagnose and fix common Windows development issues

echo ====================================
echo  dashMate - Windows Troubleshoot
echo ====================================
echo.

echo [INFO] Checking system information...
echo OS: %OS%
echo Architecture: %PROCESSOR_ARCHITECTURE%
echo Node.js: 
node --version 2>nul || echo   Not installed or not in PATH
echo npm: 
npm --version 2>nul || echo   Not available
echo.

echo [1] Checking for zombie Node.js processes...
tasklist | findstr node.exe > nul
if %errorlevel% equ 0 (
    echo ⚠️  Found running Node.js processes:
    tasklist | findstr node.exe
    echo.
    echo To kill all Node processes, run: taskkill /f /im node.exe
    echo (Warning: This will stop ALL Node.js applications)
    echo.
) else (
    echo ✅ No Node.js processes running
)

echo [2] Checking port usage...
echo Checking common ports used by dashMate:
netstat -ano | findstr ":3000 " > nul && echo   Port 3000: OCCUPIED || echo   Port 3000: Available
netstat -ano | findstr ":3001 " > nul && echo   Port 3001: OCCUPIED || echo   Port 3001: Available
netstat -ano | findstr ":3002 " > nul && echo   Port 3002: OCCUPIED || echo   Port 3002: Available
echo.

echo [3] Checking file locks on .next directory...
if exist ".next" (
    echo ⚠️  .next directory exists
    echo Attempting to access .next directory...
    dir .next > nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ .next directory may be locked
        echo Try running: npm run clean
    ) else (
        echo ✅ .next directory accessible
    )
) else (
    echo ✅ No .next directory (clean state)
)
echo.

echo [4] Checking disk space...
echo Available disk space on current drive:
dir /-c | findstr "bytes free"
echo.

echo [5] Environment variables check...
echo NODE_ENV: %NODE_ENV%
echo PATH contains Node.js: 
echo %PATH% | findstr node > nul && echo   ✅ Found || echo   ❌ Not found
echo.

echo ====================================
echo  Common Solutions
echo ====================================
echo.
echo Problem: "EPERM: operation not permitted"
echo Solution: npm run clean
echo.
echo Problem: "Port 3000 is in use"  
echo Solution: npm run dev:check (shows what's using the port)
echo.
echo Problem: Build errors/TypeScript issues
echo Solution: npm run typecheck && npm run lint:fix
echo.
echo Problem: Dependencies out of sync
echo Solution: npm run clean:all
echo.
echo Problem: Complete reset needed
echo Solution: Delete node_modules folder, run npm install
echo.

echo For more help, check the README.md file
pause