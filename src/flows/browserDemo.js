require('dotenv').config();
const AskMeBillBrowser = require('../lib/browser');
const AskMeBillAPI = require('../lib/api');

async function runWithBrowser() {
  console.log('========================================');
  console.log('AskMeBill - Playwright + API Demo');
  console.log('========================================\n');

  // Option 1: Use Browser to capture requests, then use API
  const browser = new AskMeBillBrowser();
  
  console.log('📌 Starting browser...');
  await browser.init();
  
  console.log('📌 Logging in via browser...');
  await browser.login(
    process.env.EMAIL || 'admin_eiji',
    process.env.PASSWORD || '0897421942@Earth',
    process.env.TOTP || '999999'
  );
  
  console.log('✅ Logged in via browser!');
  
  // Get captured token from cookies
  const cookies = await browser.context.cookies();
  const token = cookies.find(c => c.name === 'token' || c.name === 'access_token');
  
  if (token) {
    console.log('📌 Got token from browser');
    
    // Use API with captured token
    const api = new AskMeBillAPI();
    api.setToken(token.value);
    
    // Do something with API
    const profile = await api.getProfile();
    console.log('Profile:', profile.data.username);
  }
  
  // Export captured requests for analysis
  const requests = browser.getApiRequests();
  console.log(`\n📊 Captured ${requests.length} API requests`);
  
  // Export to file
  browser.exportRequests('browser_captured.json');
  
  // Take screenshot
  await browser.screenshot('dashboard.png');
  
  await browser.close();
  
  console.log('\n✅ Done!');
}

runWithBrowser().catch(console.error);
