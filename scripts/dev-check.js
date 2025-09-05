#!/usr/bin/env node

/**
 * Development Environment Checker
 * Validates that the development environment is ready for `npm run dev`
 */

const { execSync } = require('child_process');
const net = require('net');

const DEFAULT_PORT = 3000;

function checkPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(false);
    });
  });
}

async function getPortProcess(port) {
  try {
    // Windows command to find process using port
    const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf-8' });
    const lines = result.split('\n').filter(line => line.includes('LISTENING'));
    
    if (lines.length > 0) {
      const pidMatch = lines[0].match(/\s+(\d+)$/);
      if (pidMatch) {
        const pid = pidMatch[1];
        try {
          const processInfo = execSync(`tasklist | findstr ${pid}`, { encoding: 'utf-8' });
          return { pid, process: processInfo.trim() };
        } catch (e) {
          return { pid, process: 'Unknown process' };
        }
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function main() {
  console.log('🔍 Checking development environment...\n');
  
  // Check if port 3000 is available
  const portAvailable = await checkPortAvailable(DEFAULT_PORT);
  
  if (!portAvailable) {
    console.log('❌ Port 3000 is occupied');
    
    const processInfo = await getPortProcess(DEFAULT_PORT);
    if (processInfo) {
      console.log(`   Process: ${processInfo.process}`);
      console.log(`   PID: ${processInfo.pid}`);
      console.log('\n💡 To free port 3000, run:');
      console.log(`   taskkill //PID ${processInfo.pid} //F`);
    }
    
    console.log('\n⚠️  Next.js will use an alternative port (likely 3001, 3002, etc.)');
    process.exit(1);
  } else {
    console.log('✅ Port 3000 is available');
  }
  
  // Check Node.js version
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
  
  // Check if dependencies are installed
  try {
    execSync('npm list next', { stdio: 'ignore' });
    console.log('✅ Dependencies are installed');
  } catch (error) {
    console.log('❌ Dependencies may not be installed. Run: npm install');
    process.exit(1);
  }
  
  console.log('\n🚀 Environment ready! You can run: npm run dev');
}

main().catch(error => {
  console.error('Error checking environment:', error.message);
  process.exit(1);
});