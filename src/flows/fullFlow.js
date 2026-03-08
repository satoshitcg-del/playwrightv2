require('dotenv').config({ path: `.env.${process.env.ENV || 'dev'}` });
const AskMeBillAPI = require('../lib/api');
const config = require('../../config');

async function fullFlow() {
  const api = new AskMeBillAPI();
  
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const totp = process.env.TOTP;

  console.log('========================================');
  console.log('AskMeBill BO - Full Automation Flow');
  console.log('========================================\n');

  try {
    // Step 1: Login
    console.log('📌 Step 1: Login');
    const loginResult = await api.login(email, password, totp);
    api.setToken(loginResult.token);
    console.log('✅ Login successful!');
    console.log('');

    // Step 2: Create Customer
    console.log('📌 Step 2: Create Customer');
    const randomSuffix = Date.now().toString().slice(-6);
    const customerUsername = `test_${randomSuffix}`;
    const customerData = {
      username: customerUsername,
      full_name: `Test ${process.env.ENV || 'dev'} User ${randomSuffix}`,
      email: `test${randomSuffix}@gmail.com`,
      phone_number: '08' + Math.floor(Math.random() * 90000000 + 10000000).toString(),
      telegram: `test${randomSuffix}`,
      customer_group: process.env.CUSTOMER_GROUP || 'INTERNAL',
      dial_code: '+66'
    };
    console.log('  Creating:', customerUsername);
    await api.createCustomer(customerData);
    console.log('✅ Customer created!');
    
    // Try to get customer ID
    let customerId = null;
    try {
      const customer = await api.getCustomerByUsername(customerUsername);
      customerId = customer?.id;
    } catch (e) {
      console.log('  Note: Could not get customer ID:', e.message);
    }
    console.log('  Customer ID:', customerId || 'not found');
    console.log('');

    // Step 3: Add Products
    console.log('📌 Step 3: Add Products (10 products)');
    const products = [
      { product_id: config.products['Thai Lotto'], prefixes: 'company', client_name: 'company', fiat_currency_id: config.currencies.fiat['THB'], cryptocurrency_id: config.currencies.crypto['USDT'] },
      { product_id: config.products['Super API'], prefixes: 'boatsuperapi', client_name: 'boatsuperapi', fiat_currency_id: config.currencies.crypto['USDT'], cryptocurrency_id: config.currencies.crypto['USDT'] },
      { product_id: config.products['DIRect_API'], prefixes: '', client_name: '', fiat_currency_id: config.currencies.fiat['THB'], cryptocurrency_id: config.currencies.crypto['USDT'] },
      { product_id: config.products['PGSOFT'], prefixes: 'PG88', client_name: '', fiat_currency_id: config.currencies.fiat['THB'], cryptocurrency_id: config.currencies.crypto['USDT'] },
      { product_id: config.products['Fix rate'], prefixes: 'AMBGT', client_name: 'AMB_GAME', fiat_currency_id: config.currencies.fiat['THB'], cryptocurrency_id: config.currencies.crypto['USDT'] },
      { product_id: config.products['นอกเครือ'], prefixes: 'JK444', client_name: 'JOKER', fiat_currency_id: config.currencies.fiat['THB'], cryptocurrency_id: config.currencies.crypto['USDT'] },
      { product_id: config.products['ในเครือ'], prefixes: 'MLPG', client_name: 'AMB_GAME', fiat_currency_id: config.currencies.fiat['THB'], cryptocurrency_id: config.currencies.crypto['USDT'] },
      { product_id: config.products['SportbookV.2'], prefixes: 'TEST', client_name: 'sportbook101', fiat_currency_id: config.currencies.crypto['USDT'], cryptocurrency_id: config.currencies.crypto['USDT'] },
      { product_id: config.products['Tiamut ในเครือ'], prefixes: 'IDR', client_name: 'ambking', fiat_currency_id: config.currencies.fiat['IDR'], cryptocurrency_id: config.currencies.crypto['USDT'] },
      { product_id: config.products['Tiamut นอกเครือ'], prefixes: 'AMBWIN', client_name: 'ambking', fiat_currency_id: config.currencies.fiat['THB'], cryptocurrency_id: config.currencies.crypto['USDT'] },
    ];

    for (const product of products) {
      await api.addProduct(customerId, product);
    }
    console.log('✅ Products added: ' + products.length);
    console.log('');

    // Step 4: Add Sub-Products
    console.log('📌 Step 4: Add Sub-Products');
    
    // Get customer products
    const productsResult = await api.getCustomerProducts(customerUsername);
    const customerProducts = productsResult.data;
    const productMap = {};
    customerProducts.forEach(p => {
      productMap[p.product_name] = p.customer_product_id;
    });

    const subProducts = [
      { productName: 'Thai Lotto', sub_product_id: config.subProducts['Thai Lotto']['W/L'] },
      { productName: 'Super API', sub_product_id: config.subProducts['Super API']['W/L'] },
      { productName: 'DIRect_API( สำหรับทดสอบเท่านั้น )', sub_product_id: config.subProducts['DIRect_API']['optest_api'] },
      { productName: 'ระบบออโต้ Tiamut (PGSOFT)', sub_product_id: config.subProducts['PGSOFT']['Monthly Fee PG'] },
      { productName: 'ระบบออโต้ (นอกเครือ)Fix rate', sub_product_id: config.subProducts['Fix rate']['Monthly Fee fix rate'] },
      { productName: 'ระบบออโต้ (นอกเครือ)', sub_product_id: config.subProducts['นอกเครือ']['Monthly fee'] },
      { productName: 'ระบบออโต้ (ในเครือ)', sub_product_id: config.subProducts['ในเครือ']['MAINTENANCE'] },
      { productName: 'SportbookV.2', sub_product_id: config.subProducts['SportbookV.2']['W/L'] },
      { productName: 'ระบบออโต้ Tiamut (ในเครือ)', sub_product_id: config.subProducts['Tiamut ในเครือ']['MAINTENANCE'] },
      { productName: 'ระบบออโต้ Tiamut (นอกเครือ)', sub_product_id: config.subProducts['Tiamut นอกเครือ']['Monthly Fee fix rate'] },
    ];

    let subProductCount = 0;
    for (const sp of subProducts) {
      const cpid = productMap[sp.productName];
      if (cpid) {
        try {
          const result = await api.addSubProduct(customerUsername, cpid, sp.sub_product_id);
          if (result.code === 1001) subProductCount++;
        } catch (e) {
          // Skip if already exists
        }
      }
    }
    console.log('✅ Sub-products added: ' + subProductCount);
    console.log('');

    // Step 5: Get W/L
    console.log('📌 Step 5: Get W/L');
    const month = '2';
    const year = '2026';
    
    try {
      const wlResult = await api.getWinLose(config.products['Thai Lotto'], month, year);
      console.log('  W/L result:', wlResult.code === 1001 ? 'Success' : wlResult.message);
    } catch (e) {
      console.log('  W/L check:', e.message);
    }
    console.log('');

    // Summary
    console.log('========================================');
    console.log('✅ FULL FLOW COMPLETE!');
    console.log('========================================');
    console.log('Customer:', customerUsername);
    console.log('Products:', products.length);
    console.log('Sub-Products:', subProductCount);
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

fullFlow();
