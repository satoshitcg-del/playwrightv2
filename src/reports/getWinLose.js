require('dotenv').config();
const AskMeBillAPI = require('../lib/api');

// Product ID mapping
const PRODUCTS = {
  'Thai Lotto': '696531c79c898fce9f7c1702',
  'Super API': '696531a572da1252718d1ce9',
  'DIRect_API': '691f256be479de4d15bf9c4e',
  'PGSOFT': '68f74572ae095015c6d716f3',
  'Fix rate': '68f21b4e49423eabd805f7d8',
  'นอกเครือ': '689d8d31c82e1edd8f4172bf',
  'ในเครือ': '689308019baa0e160653a93f',
  'SportbookV.2': '67ea587dcb2767a97df3fb07',
  'Tiamut ในเครือ': '67ea586acb2767a97df3fb05',
  'Tiamut นอกเครือ': '67ea5855cb2767a97df3fb03',
};

async function getWinLose() {
  const api = new AskMeBillAPI();
  
  // Load token
  const token = require('fs').readFileSync('.token', 'utf-8').trim();
  if (!token) {
    console.error('❌ No token found. Please run login first: npm run login');
    process.exit(1);
  }
  api.setToken(token);

  // Get month/year from args or use current
  const args = process.argv.slice(2);
  const month = args[0] || '2';
  const year = args[1] || '2026';

  console.log(`Getting W/L for ${month}/${year}`);
  console.log('='.repeat(50));

  // Get W/L for each product type
  const results = [];

  // Method 1: POST /v1/pm/confirm-wl
  const confirmWlProducts = [
    'Thai Lotto', 'Super API', 'SportbookV.2', 
    'Tiamut ในเครือ', 'Tiamut นอกเครือ', 'PGSOFT'
  ];

  for (const name of confirmWlProducts) {
    const productId = PRODUCTS[name];
    try {
      const result = await api.getWinLose(productId, month, year);
      results.push({ product: name, method: 'confirm-wl', data: result });
      console.log(`✅ ${name}: ${JSON.stringify(result).substring(0, 100)}`);
    } catch (error) {
      console.log(`❌ ${name}: ${error.message}`);
    }
  }

  // Method 2: GET /v1/autoplay/winlose
  const autoplayProducts = ['Fix rate', 'นอกเครือ', 'ในเครือ'];

  for (const name of autoplayProducts) {
    const productId = PRODUCTS[name];
    try {
      const result = await api.getAutoPlayWinLose(productId, month, year);
      results.push({ product: name, method: 'autoplay', data: result });
      console.log(`✅ ${name}: ${JSON.stringify(result).substring(0, 100)}`);
    } catch (error) {
      console.log(`❌ ${name}: ${error.message}`);
    }
  }

  // Method 3: POST /v1/direct-api (DIRect_API)
  try {
    const result = await api.client.post('/v1/direct-api', {
      billing_cycle: `${year}-${month.padStart(2, '0')}-15T16:58:53.366Z`,
      month: month.padStart(2, '0'),
      year: year,
      data: []
    });
    results.push({ product: 'DIRect_API', method: 'direct-api', data: result.data });
    console.log(`✅ DIRect_API: ${JSON.stringify(result.data).substring(0, 100)}`);
  } catch (error) {
    console.log(`❌ DIRect_API: ${error.message}`);
  }

  console.log('='.repeat(50));
  console.log(`Total: ${results.length} products`);

  return results;
}

getWinLose().catch(console.error);
