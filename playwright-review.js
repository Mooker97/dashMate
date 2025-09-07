const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const browser = await chromium.launch({ headless: false });
  
  // Test different viewport sizes
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 }
  ];

  for (const viewport of viewports) {
    console.log(`Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
    
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    
    const page = await context.newPage();
    
    try {
      // Navigate to the app
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      
      // Wait for any dynamic content to load
      await page.waitForTimeout(2000);
      
      // Take initial screenshot
      await page.screenshot({ 
        path: `${screenshotsDir}/${viewport.name}-initial.png`,
        fullPage: true 
      });
      
      // Test microphone button interactions
      const micButton = page.locator('button').filter({ hasText: /microphone|mic/i }).first();
      if (await micButton.count() > 0) {
        // Screenshot before click
        await page.screenshot({ 
          path: `${screenshotsDir}/${viewport.name}-mic-before.png`,
          fullPage: true 
        });
        
        // Click microphone button
        await micButton.click();
        await page.waitForTimeout(1000);
        
        // Screenshot after click (listening state)
        await page.screenshot({ 
          path: `${screenshotsDir}/${viewport.name}-mic-active.png`,
          fullPage: true 
        });
        
        // Click again to toggle off
        await micButton.click();
        await page.waitForTimeout(1000);
      }
      
      // Test task list interactions
      const taskItems = page.locator('[data-testid="task-item"], .task-item, li');
      const taskCount = await taskItems.count();
      console.log(`Found ${taskCount} task items on ${viewport.name}`);
      
      if (taskCount > 0) {
        // Screenshot with task interactions
        await taskItems.first().hover();
        await page.waitForTimeout(500);
        await page.screenshot({ 
          path: `${screenshotsDir}/${viewport.name}-task-hover.png`,
          fullPage: true 
        });
        
        // Try to click first task if it has checkbox
        const firstTaskCheckbox = taskItems.first().locator('input[type="checkbox"], button').first();
        if (await firstTaskCheckbox.count() > 0) {
          await firstTaskCheckbox.click();
          await page.waitForTimeout(1000);
          await page.screenshot({ 
            path: `${screenshotsDir}/${viewport.name}-task-completed.png`,
            fullPage: true 
          });
        }
      }
      
      // Test keyboard navigation
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: `${screenshotsDir}/${viewport.name}-keyboard-focus.png`,
        fullPage: true 
      });
      
      // Test zoom at 200% (accessibility requirement)
      await page.setViewportSize({ 
        width: Math.floor(viewport.width * 0.5), 
        height: Math.floor(viewport.height * 0.5) 
      });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: `${screenshotsDir}/${viewport.name}-zoom-200.png`,
        fullPage: true 
      });
      
    } catch (error) {
      console.error(`Error testing ${viewport.name}:`, error.message);
    }
    
    await context.close();
  }
  
  await browser.close();
  console.log('Review complete! Screenshots saved to ./screenshots/');
})();