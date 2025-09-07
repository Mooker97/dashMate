const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Desktop view
    console.log('Capturing desktop view...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'desktop-view.png', fullPage: true });
    
    // Tablet view
    console.log('Capturing tablet view...');
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'tablet-view.png', fullPage: true });
    
    // Mobile view
    console.log('Capturing mobile view...');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'mobile-view.png', fullPage: true });
    
    console.log('Screenshots captured successfully!');
  } catch (error) {
    console.error('Error capturing screenshots:', error.message);
  } finally {
    await browser.close();
  }
})();