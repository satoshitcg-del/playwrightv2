require('dotenv').config();
const AskMeBillAPI = require('../lib/api');

async function fullFlow() {
  const api = new AskMeBillAPI();
  
  const email = process.env.EMAIL || 'admin_eiji';
  const password = process.env.PASSWORD || '0897421942@Earth';
  const totp = process.env.TOTP || '999999';

  console.log('========================================');
  console.log('AskMeBill BO - Full Automation Flow');
  console.log('========================================\n');

  try {
    // Step 1: Login
    console.log('📌 Step 1: Login');
    const loginResult = await api.login(email, password, totp);
    console.log('✅ Login successful!\n');
    
    // Save token
    require('fs').writeFileSync('.token', loginResult.token);

    // Step 2: Create Customer
    console.log('📌 Step 2: Create Customer');
    const customerData = {
      username: process.env.CUSTOMER_USERNAME || 'test_auto_' + Date.now(),
      full_name: 'Test Auto User',
      email: 'testauto' + Date.now() + '@gmail.com',
      phone_number: '0888888888',
      telegram: 'testauto' + Date.now(),
      customer_group: 'INTERNAL',
      dial_code: '+66'
    };
    
    await api.createCustomer(customerData);
    const customer = await api.getCustomerByUsername(customerData.username);
    console.log('✅ Customer created:', customer.id);
    
    // Save customer ID
    require('fs').writeFileSync('.customer_id', customer.id);
    console.log('');

    // Step 3: Add Products
    console.log('📌 Step 3: Add Products');
    const products = [
      { product_id: '696531c79c898fce9f7c1702', prefixes: 'company', client_name: 'company', fiat_currency_id: '6761431c002bb9ff210abc4f', cryptocurrency_id: '6761431c002bb9ff210abc4f' },
      { product_id: '696531a572da1252718d1ce9', prefixes: 'boatsuperapi', client_name: 'boatsuperapi', fiat_currency_id: '6761431c002bb9ff210abc4f', cryptocurrency_id: '6761431c002bb9ff210abc4f' },
      { product_id: '691f256be479de4d15bf9c4e', prefixes: '', client_name: '', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' },
      { product_id: '68f74572ae095015c6d716f3', prefixes: 'PG88', client_name: '', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' },
      { product_id: '68f21b4e49423eabd805f7d8', prefixes: 'AMBGT', client_name: 'AMB_GAME', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' },
      { product_id: '689d8d31c82e1edd8f4172bf', prefixes: 'JK444', client_name: 'JOKER', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' },
      { product_id: '689308019baa0e160653a93f', prefixes: 'MLPG', client_name: 'AMB_GAME', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' },
      { product_id: '67ea587dcb2767a97df3fb07', prefixes: 'TEST', client_name: 'sportbook101', fiat_currency_id: '6761431c002bb9ff210abc4f', cryptocurrency_id: '6761431c002bb9ff210abc4f' },
      { product_id: '67ea586acb2767a97df3fb05', prefixes: 'IDR', client_name: 'ambking', fiat_currency_id: '6761431c002bb9ff210abb7d', cryptocurrency_id: '6761431c002bb9ff210abc4f' },
      { product_id: '67ea5855cb2767a97df3fb03', prefixes: 'AMBWIN', client_name: 'ambking', fiat_currency_id: '6761431c002bb9ff210abb02', cryptocurrency_id: '6761431c002bb9ff210abc4f' },
    ];

    for (const product of products) {
      await api.addProduct(customer.id, product);
    }
    console.log('✅ Products added: ' + products.length);
    console.log('');

    // Step 4: Add Sub-Products
    console.log('📌 Step 4: Add Sub-Products');
    
    // Get customer products
    const productsResult = await api.getCustomerProducts(customer.id);
    const customerProducts = productsResult.data;
    const productMap = {};
    customerProducts.forEach(p => {
      productMap[p.product_name] = p.customer_product_id;
    });

    const subProducts = [
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

    let subProductCount = 0;
    for (const sp of subProducts) {
      const cpid = productMap[sp.productName];
      if (cpid) {
        const result = await api.addSubProduct(customer.id, cpid, sp.sub_product_id);
        if (result.code === 1001) subProductCount++;
      }
    }
    console.log('✅ Sub-products added: ' + subProductCount);
    console.log('');

    // Summary
    console.log('========================================');
    console.log('✅ FULL FLOW COMPLETE!');
    console.log('========================================');
    console.log('Customer ID:', customer.id);
    console.log('Products:', products.length);
    console.log('Sub-Products:', subProductCount);
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

fullFlow();
