require('dotenv').config();
const { chromium } = require('playwright');

/**
 * Browser automation utilities for AskMeBill BO
 * This captures network requests for analysis
 */
class AskMeBillBrowser {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.capturedRequests = [];
  }

  /**
   * Initialize browser with network capture
   */
  async init() {
    this.browser = await chromium.launch({ 
      headless: false,
      args: ['--disable-blink-features=AutomationControlled']
    });
    
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    
    this.page = await this.context.newPage();
    
    // Capture network requests
    await this.page.route('**/*', async route => {
      const request = route.request();
      const response = await route.continue();
      
      let responseBody = null;
      try {
        if (response.status() < 400) {
          responseBody = await response.text();
        }
      } catch (e) {
        // Ignore
      }
      
      this.capturedRequests.push({
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData(),
        status: response.status(),
        response: responseBody
      });
    });
    
    return this;
  }

  /**
   * Navigate to URL
   */
  async navigate(url) {
    await this.page.goto(url);
    return this;
  }

  /**
   * Click element by selector
   */
  async click(selector) {
    await this.page.click(selector);
    return this;
  }

  /**
   * Fill input
   */
  async fill(selector, value) {
    await this.page.fill(selector, value);
    return this;
  }

  /**
   * Wait for selector
   */
  async waitFor(selector, options = {}) {
    await this.page.waitForSelector(selector, options);
    return this;
  }

  /**
   * Get captured requests
   */
  getRequests() {
    return this.capturedRequests;
  }

  /**
   * Get API requests only
   */
  getApiRequests() {
    return this.capturedRequests.filter(r => r.url.includes('apixint-dev.askmebill.com'));
  }

  /**
   * Export requests to JSON
   */
  exportRequests(filename = 'captured_requests.json') {
    const fs = require('fs');
    fs.writeFileSync(filename, JSON.stringify(this.capturedRequests, null, 2));
    console.log(`Exported ${this.capturedRequests.length} requests to ${filename}`);
  }

  /**
   * Close browser
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  /**
   * Take screenshot
   */
  async screenshot(path = 'screenshot.png') {
    await this.page.screenshot({ path });
    console.log(`Screenshot saved to ${path}`);
  }

  /**
   * Login to AskMeBill BO
   */
  async login(email, password, totp) {
    await this.navigate(process.env.BASE_URL || 'https://bo-dev.askmebill.com');
    
    // Wait for login form
    await this.waitFor('input[type="text"], input[name="email"]', { timeout: 10000 });
    
    // Fill credentials (adjust selectors as needed)
    await this.fill('input[name="email"], input[type="text"]', email);
    await this.fill('input[type="password"]', password);
    
    // Click login
    await this.click('button[type="submit"], button:has-text("Login"), button:has-text("เข้าสู่ระบบ")');
    
    // Wait for 2FA if needed
    await this.page.waitForTimeout(2000);
    
    // If TOTP input appears
    const totpInput = await this.page.$('input[name="totp"], input[placeholder*="OTP"], input[placeholder*="2FA"]');
    if (totpInput) {
      await this.fill('input[name="totp"], input[placeholder*="OTP"], input[placeholder*="2FA"]', totp);
      await this.click('button[type="submit"], button:has-text("Verify"), button:has-text("ยืนยัน")');
    }
    
    // Wait for dashboard
    await this.page.waitForTimeout(3000);
    
    return this;
  }
}

module.exports = AskMeBillBrowser;
