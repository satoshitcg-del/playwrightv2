require('dotenv').config();
const AskMeBillAPI = require('../lib/api');

// Default products mapping (product_id -> default config)
const DEFAULT_PRODUCTS = [
  { product_id: '696531c79c898fce9f7c1702', prefixes: 'company', client_name: 'company', fiat_currency_id: '6761431c002bb9ff210abc4f', cryptocurrency_id: '6761431c002bb9ff210abc4f' }, // Thai Lotto
  { product_id: '696531a572da1252718d1ce9', prefixes: 'boatsuperapi', client_name: 'boatsuperapi', fiat_currency_id: '6761431c002bb9ff210abc4f', cryptocurrency_id: '6761431c002bb9ff210abc4f' }, // Super API
  { product_id: '691f256be479de4d15bf9c4e', prefixes: '', client_name: '', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' }, // DIRect_API
  { product_id: '68f74572ae095015c6d716f3', prefixes: 'PG88', client_name: '', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' }, // PGSOFT
  { product_id: '68f21b4e49423eabd805f7d8', prefixes: 'AMBGT', client_name: 'AMB_GAME', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' }, // Fix rate
  { product_id: '689d8d31c82e1edd8f4172bf', prefixes: 'JK444', client_name: 'JOKER', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' }, // นอกเครือ
  { product_id: '689308019baa0e160653a93f', prefixes: 'MLPG', client_name: 'AMB_GAME', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' }, // ในเครือ
  { product_id: '67ea587dcb2767a97df3fb07', prefixes: 'TEST', client_name: 'sportbook101', fiat_currency_id: '6761431c002bb9ff210abc4f', cryptocurrency_id: '6761431c002bb9ff210abc4f' }, // SportbookV.2
  { product_id: '67ea586acb2767a97df3fb05', prefixes: 'IDR', client_name: 'ambking', fiat_currency_id: '6761431c002bb9ff210abb7d', cryptocurrency_id: '6761431c002bb9ff210abc4f' }, // Tiamut ในเครือ
  { product_id: '67ea5855cb2767a97df3fb03', prefixes: 'AMBWIN', client_name: 'ambking', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' }, // Tiamut นอกเครือ
];

async function addProducts() {
  const api = new AskMeBillAPI();
  
  // Load token
  const token = require('fs').readFileSync('.token', 'utf-8').trim();
  if (!token) {
    console.error('❌ No token found. Please run login first: npm run login');
    process.exit(1);
  }
  api.setToken(token);

  // Load customer ID
  const customerId = require('fs').readFileSync('.customer_id', 'utf-8').trim();
  if (!customerId) {
    console.error('❌ No customer ID found. Please run create-customer first: npm run create-customer');
    process.exit(1);
  }

  console.log(`Adding products to customer: ${customerId}`);
  
  const results = [];
  for (let i = 0; i < DEFAULT_PRODUCTS.length; i++) {
    const product = DEFAULT_PRODUCTS[i];
    try {
      const result = await api.addProduct(customerId, product);
      if (result.code === 1001) {
        console.log(`✅ ${i + 1}. Product added successfully`);
        results.push({ index: i + 1, success: true });
      } else {
        console.log(`❌ ${i + 1}. Failed: ${result.message}`);
        results.push({ index: i + 1, success: false, message: result.message });
      }
    } catch (error) {
      console.log(`❌ ${i + 1}. Error: ${error.response?.data?.message || error.message}`);
      results.push({ index: i + 1, success: false, message: error.message });
    }
  }

  // Get and save customer products
  const productsResult = await api.getCustomerProducts(customerId);
  const products = productsResult.data;
  
  console.log(`\nTotal products added: ${products.length}`);
  
  // Save customer products map
  const productMap = {};
  products.forEach(p => {
    productMap[p.product_name] = p.customer_product_id;
  });
  require('fs').writeFileSync('.customer_products.json', JSON.stringify(productMap, null, 2));
  console.log('Product map saved to .customer_products.json');

  return results;
}

addProducts();
