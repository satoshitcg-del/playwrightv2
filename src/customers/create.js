require('dotenv').config();
const AskMeBillAPI = require('../lib/api');

async function createCustomer() {
  const api = new AskMeBillAPI();
  
  // Load token from file
  const token = require('fs').readFileSync('.token', 'utf-8').trim();
  if (!token) {
    console.error('❌ No token found. Please run login first: npm run login');
    process.exit(1);
  }
  
  api.setToken(token);

  // Customer data - can be passed as arguments or use defaults
  const customerData = {
    username: process.env.CUSTOMER_USERNAME || 'test_playwright_001',
    full_name: process.env.CUSTOMER_FULL_NAME || 'Test Playwright User',
    email: process.env.CUSTOMER_EMAIL || 'testplaywright@gmail.com',
    phone_number: process.env.CUSTOMER_PHONE || '0888888888',
    telegram: process.env.CUSTOMER_TELEGRAM || 'testplaywright',
    customer_group: process.env.CUSTOMER_GROUP || 'INTERNAL',
    dial_code: '+66'
  };

  try {
    console.log('Creating customer:', customerData.username);
    
    const result = await api.createCustomer(customerData);
    
    if (result.code === 1001) {
      console.log('✅ Customer created successfully!');
      
      // Find the customer to get ID
      const customer = await api.getCustomerByUsername(customerData.username);
      console.log('Customer ID:', customer.id);
      
      // Save customer ID
      require('fs').writeFileSync('.customer_id', customer.id);
      console.log('Customer ID saved to .customer_id file');
      
      return customer;
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
