require('dotenv').config();
const { chromium } = require('playwright');

/**
 * Simple Playwright Demo - เปิด browser และ login
 */
async function simpleDemo() {
  console.log('Starting Playwright...');
  
  // เปิด browser
  const browser = await chromium.launch({ 
    headless: false  // เปลี่ยนเป็น true ถ้าต้องการ run แบบ background
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  // ไปหน้า login
  const baseUrl = process.env.BASE_URL || 'https://bo-dev.askmebill.com';
  console.log(`Navigating to ${baseUrl}...`);
  await page.goto(baseUrl);
  
  // รอให้หน้าโหลด
  await page.waitForLoadState('networkidle');
  
  // ถ่าย screenshot
  await page.screenshot({ path: '01-login-page.png' });
  console.log('📸 Screenshot: 01-login-page.png');
  
  // ปิด browser
  await browser.close();
  
  console.log('✅ Done!');
}

// Run demo
simpleDemo().catch(console.error);
