require('dotenv').config();
const AskMeBillAPI = require('../lib/api');

async function getDirctApiWinLose() {
  const api = new AskMeBillAPI();
  
  // Load token
  const token = require('fs').readFileSync('.token', 'utf-8').trim();
  if (!token) {
    console.error('❌ No token found. Please run login first: npm run login');
    process.exit(1);
  }
  api.setToken(token);

  // Get month/year from args or use default
  const args = process.argv.slice(2);
  const month = args[0] || '2';
  const year = args[1] || '2026';

  console.log(`Getting DIRect_API W/L for ${month}/${year}`);
  console.log('='.repeat(50));

  // Build billing_cycle
  const billingCycle = `${year}-${month.padStart(2, '0')}-15T16:58:53.366Z`;

  try {
    const result = await api.getDirectApiWinLose(billingCycle, month, year, []);
    console.log('✅ Result:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

getDirctApiWinLose();
