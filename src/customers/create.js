require('dotenv').config({ path: `.env.${process.env.ENV || 'dev'}` });
const AskMeBillAPI = require('../lib/api');

function generateRandomSuffix() {
  return Math.random().toString(36).substring(2, 8);
}

async function createCustomer() {
  const api = new AskMeBillAPI();
  
  // Load token from file
  const token = require('fs').readFileSync('.token', 'utf-8').trim();
  if (!token) {
    console.error('❌ No token found. Please run login first: npm run login');
    process.exit(1);
  }
  
  api.setToken(token);

  // Generate random suffix
  const randomSuffix = Date.now().toString().slice(-6);
  
  // Customer data - use env or generate random
  const customerData = {
    username: process.env.CUSTOMER_USERNAME || `test_${randomSuffix}`,
    full_name: process.env.CUSTOMER_FULL_NAME || `Test ${process.env.ENV || 'dev'} User`,
    email: process.env.CUSTOMER_EMAIL || `test${randomSuffix}@gmail.com`,
    phone_number: process.env.CUSTOMER_PHONE || '08' + Math.floor(Math.random() * 90000000 + 10000000).toString(),
    telegram: process.env.CUSTOMER_TELEGRAM || `test${randomSuffix}`,
    customer_group: process.env.CUSTOMER_GROUP || 'INTERNAL',
    dial_code: '+66'
  };

  console.log('Creating customer:', customerData.username);

  try {
    const result = await api.createCustomer(customerData);
    
    if (result.code === 1001) {
      console.log('✅ Customer created successfully!');
      console.log('Username:', customerData.username);
      
      // Save customer info
      const customerInfo = {
        username: customerData.username,
        email: customerData.email,
        telegram: customerData.telegram,
        created_at: new Date().toISOString()
      };
      require('fs').writeFileSync('.customer_info.json', JSON.stringify(customerInfo, null, 2));
      console.log('Customer info saved to .customer_info.json');
      
      return customerInfo;
    } else {
      console.error('❌ Failed:', result.message);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

createCustomer();
