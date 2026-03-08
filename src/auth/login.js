require('dotenv').config();
const AskMeBillAPI = require('../lib/api');

async function login() {
  const api = new AskMeBillAPI();
  
  const email = process.env.EMAIL || 'admin_eiji';
  const password = process.env.PASSWORD || '0897421942@Earth';
  const totp = process.env.TOTP || '999999';

  try {
    console.log('Logging in...');
    const result = await api.login(email, password, totp);
    
    console.log('✅ Login successful!');
    console.log('Token:', result.token.substring(0, 50) + '...');
    
    // Save token to file for other scripts
    require('fs').writeFileSync('.token', result.token);
    console.log('Token saved to .token file');
    
    return result;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

login();
