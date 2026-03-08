require('dotenv').config();
const AskMeBillAPI = require('../lib/api');

// Default sub-products mapping
const DEFAULT_SUB_PRODUCTS = [
  { productName: 'Thai Lotto', sub_product_id: '69660aa09fa351a717829995', name: 'W/L' },
  { productName: 'Super API', sub_product_id: '696531ae9fa351a717829615', name: 'W/L' },
  { productName: 'DIRect_API( สำหรับทดสอบเท่านั้น )', sub_product_id: '69ada047ebe111b410b1bd49', name: 'optest_api' },
  { productName: 'ระบบออโต้ Tiamut (PGSOFT)', sub_product_id: '68f758a6ae095015c6d719d5', name: 'Monthly Fee PG' },
  { productName: 'ระบบออโต้ (นอกเครือ)Fix rate', sub_product_id: '68f21b8c10ef5782405340df', name: 'Monthly Fee fix rate' },
  { productName: 'ระบบออโต้ (นอกเครือ)', sub_product_id: '689d8d7e28acc79c2e4a3f11', name: 'Monthly fee' },
  { productName: 'ระบบออโต้ (ในเครือ)', sub_product_id: '689308c59baa0e160653a941', name: 'MAINTENANCE' },
  { productName: 'SportbookV.2', sub_product_id: '67ebaf44062049f0aa79c77e', name: 'W/L' },
  { productName: 'ระบบออโต้ Tiamut (ในเครือ)', sub_product_id: '6893092d91fe851b25980825', name: 'MAINTENANCE' },
  { productName: 'ระบบออโต้ Tiamut (นอกเครือ)', sub_product_id: '68dcee606f1d1d5d2a8866d0', name: 'Monthly Fee fix rate' },
];

async function addSubProducts() {
  const api = new AskMeBillAPI();
  
  // Load token
  const token = require('fs').readFileSync('.token', 'utf-8').trim();
  if (!token) {
    console.error('❌ No token found. Please run login first: npm run login');
    process.exit(1);
  }
  api.setToken(token);

  // Load customer ID
  const customerId = requireFileSync('.customer_id', 'utf-8').trim('fs').read();
  if (!customerId) {
    console.error('❌ No customer ID found. Please run create-customer first');
    process.exit(1);
  }

  // Load customer products map
  const productMap = JSON.parse(require('fs').readFileSync('.customer_products.json', 'utf-8'));

  console.log(`Adding sub-products to customer: ${customerId}`);
  
  const results = [];
  for (let i = 0; i < DEFAULT_SUB_PRODUCTS.length; i++) {
    const subProduct = DEFAULT_SUB_PRODUCTS[i];
    const customerProductId = productMap[subProduct.productName];
    
    if (!customerProductId) {
      console.log(`❌ ${i + 1}. ${subProduct.name}: Customer product not found`);
      results.push({ index: i + 1, success: false, message: 'Customer product not found' });
      continue;
    }

    try {
      const result = await api.addSubProduct(customerId, customerProductId, subProduct.sub_product_id);
      if (result.code === 1001) {
        console.log(`✅ ${i + 1}. ${subProduct.name} added successfully`);
        results.push({ index: i + 1, success: true });
      } else {
        console.log(`❌ ${i + 1}. ${subProduct.name}: ${result.message}`);
        results.push({ index: i + 1, success: false, message: result.message });
      }
    } catch (error) {
      console.log(`❌ ${i + 1}. ${subProduct.name}: ${error.response?.data?.message || error.message}`);
      results.push({ index: i + 1, success: false, message: error.message });
    }
  }

  const successCount = results.filter(r => r.success).length;
  console.log(`\nTotal sub-products added: ${successCount}/${results.length}`);

  return results;
}

addSubProducts();
