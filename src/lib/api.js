require('dotenv').config({ path: `.env.${process.env.ENV || 'dev'}` });

const config = require('../../config');

class AskMeBillAPI {
  constructor() {
    this.token = null;
    this.axios = require('axios');
    const API_URL = config.apiUrl || process.env.API_URL || 'https://apixint-dev.askmebill.com';
    this.client = this.axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
      }
    });
  }

  /**
   * Login step 1: Verify (captcha)
   */
  async verify(email, password, captcha = '1234') {
    const response = await this.client.post('/v1/auth/verify', {
      email,
      password,
      captcha
    });
    return response.data;
  }

  /**
   * Login step 2: Sign in
   */
  async signIn(email, password) {
    const response = await this.client.post('/v1/auth/sign-in', {
      email,
      password
    });
    return response.data;
  }

  /**
   * Login step 3: Verify TOTP
   */
  async verifyTOTP(tempToken, totpKey) {
    const response = await this.client.post('/v1/auth/verify/totp', 
      { totp_key: totpKey, generate_token: true },
      { headers: { 'Authorization': `Bearer ${tempToken}` } }
    );
    return response.data;
  }

  /**
   * Full login flow
   */
  async login(email, password, totp = '999999') {
    const captcha = '1234';
    
    // Step 1: Verify
    console.log('  Step 1: Verify...');
    const verifyResult = await this.client.post('/v1/auth/verify', {
      email,
      password,
      captcha
    });
    console.log('  Verify result:', verifyResult.data.code);
    
    // Step 2: Sign in
    console.log('  Step 2: Sign in...');
    const signInResult = await this.client.post('/v1/auth/sign-in', {
      email,
      password
    });
    console.log('  Sign in code:', signInResult.data.code);
    const tempToken = signInResult.data.data?.token || signInResult.data.token;
    console.log('  Temp token:', tempToken ? tempToken.substring(0, 50) + '...' : 'null');
    
    // Step 3: Verify TOTP
    console.log('  Step 3: Verify TOTP...');
    const totpResult = await this.verifyTOTP(tempToken, totp);
    this.token = totpResult.data.token;
    
    return {
      success: true,
      token: this.token,
      refreshToken: totpResult.data.refresh_token
    };
  }

  /**
   * Set authorization token
   */
  setToken(token) {
    this.token = token;
    this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Create customer
   */
  async createCustomer(customerData) {
    const data = {
      username: customerData.username,
      full_name: customerData.full_name || customerData.username,
      customer_group: customerData.customer_group || 'INTERNAL',
      email: customerData.email,
      phone_number: customerData.phone_number || '',
      telegram: customerData.telegram || '',
      line_id: customerData.line_id || '',
      what_app: customerData.what_app || '',
      note: customerData.note || '',
      dial_code: customerData.dial_code || '+66',
      contact_name: customerData.contact_name || '',
      contact_telegram: customerData.contact_telegram || ''
    };

    console.log('  API createCustomer called with:', JSON.stringify(data).substring(0, 100));
    const response = await this.client.post('/v1/customer/create', data);
    console.log('  API response:', JSON.stringify(response.data).substring(0, 200));
    return response.data;
  }

  /**
   * Get customer by username
   */
  async getCustomerByUsername(username) {
    const response = await this.client.get(`/v1/customer/search?username=${username}`);
    const customers = response.data.data.customers;
    return customers.find(c => c.username === username) || null;
  }

  /**
   * Get all customers
   */
  async getAllCustomers() {
    const response = await this.client.get('/v1/customer/list');
    return response.data.data;
  }

  /**
   * Get customer products
   */
  async getCustomerProducts(customerId) {
    const response = await this.client.get(`/v1/customer-product/all?customer_id=${customerId}&page=1&limit=50`);
    return response.data;
  }

  /**
   * Add product to customer
   */
  async addProduct(customerId, productData) {
    const payload = {
      customer_id: customerId,
      products: [{
        product_id: productData.product_id,
        prefixes: productData.prefixes || '',
        client_name: productData.client_name || '',
        agent_id: productData.agent_id || '',
        fiat_currency_id: productData.fiat_currency_id,
        cryptocurrency_id: productData.cryptocurrency_id,
        deposit: productData.deposit || 0,
        opening_date: productData.opening_date || '2024-03-18',
        closing_date: productData.closing_date || '',
        note: productData.note || '',
        sync_loading: productData.sync_loading || false,
        is_sync_status: productData.is_sync_status !== false,
        is_sync_icon: productData.is_sync_icon !== false,
        deposit_currency: productData.deposit_currency || 'USDT',
        auto_product: productData.auto_product || '',
        is_fix_currency: productData.is_fix_currency !== false,
        type: productData.type || 'AUTO'
      }]
    };

    const response = await this.client.post('/v1/customer-product/add', payload);
    return response.data;
  }

  /**
   * Delete customer product
   */
  async deleteProduct(customerId, productId) {
    const response = await this.client.delete(`/v1/customer-product/${customerId}/${productId}`);
    return response.data;
  }

  /**
   * Get available products
   */
  async getProductList() {
    const response = await this.client.get('/v1/product/list?page=1&limit=100');
    return response.data;
  }

  /**
   * Get sub-products for a product
   */
  async getSubProducts(productId) {
    const response = await this.client.get(`/v1/sub-product/list/${productId}`);
    return response.data;
  }

  /**
   * Add sub-product to customer product
   */
  async addSubProduct(customerId, customerProductId, subProductId, subProductData = {}) {
    const payload = {
      active: subProductData.active !== false,
      customer_id: customerId,
      customer_product_id: customerProductId,
      sub_product_id: subProductId,
      quantity: subProductData.quantity || 1,
      price: subProductData.price || 10000,
      pricing_type: subProductData.pricing_type || 'CUSTOM',
      pricing_group_id: subProductData.pricing_group_id || '',
      discounts: subProductData.discounts || [],
      fiat_id: subProductData.fiat_id || '6761431c002bb9ff210abb02',
      crypto_id: subProductData.crypto_id || '6761431c002bb9ff210abc4f',
      product_links: subProductData.product_links || []
    };

    const response = await this.client.post('/v1/customer-sub-product/add', payload);
    return response.data;
  }

  /**
   * Get W/L (Win/Lose) for a product
   */
  async getWinLose(productId, month, year) {
    const payload = {
      product_id: productId,
      month: String(month),
      year: String(year)
    };

    const response = await this.client.post('/v1/pm/confirm-wl', payload);
    return response.data;
  }

  /**
   * Get AutoPlay W/L (alternative endpoint - GET)
   */
  async getAutoPlayWinLose(productId, month, year) {
    const response = await this.client.get('/v1/autoplay/winlose', {
      params: { product_id: productId, month, year }
    });
    return response.data;
  }

  /**
   * Get DIRect_API W/L
   */
  async getDirectApiWinLose(billingCycle, month, year, data = []) {
    const payload = {
      billing_cycle: billingCycle,
      month: String(month).padStart(2, '0'),
      year: String(year),
      data: data
    };

    const response = await this.client.post('/v1/direct-api', payload);
    return response.data;
  }

  /**
   * Update DIRect_API status
   */
  async updateDirectApiStatus(directId, status, oldStatus, note = '') {
    const payload = {
      direct_id: directId,
      status: status,
      old_status: oldStatus,
      note: note
    };

    const response = await this.client.post('/v1/direct-api/update-status', payload);
    return response.data;
  }

  /**
   * Get currencies
   */
  async getFiatCurrencies() {
    const response = await this.client.get('/v1/currency/fiat');
    return response.data;
  }

  async getCryptoCurrencies() {
    const response = await this.client.get('/v1/currency/crypto');
    return response.data;
  }

  /**
   * Get user profile
   */
  async getProfile() {
    const response = await this.client.get('/v1/user/profile');
    return response.data;
  }

  /**
   * Get product ID by name
   */
  getProductId(productName) {
    return config.products[productName] || null;
  }

  /**
   * Get sub-product ID by name
   */
  getSubProductId(productName, subProductName) {
    const subProducts = config.subProducts[productName];
    return subProducts ? subProducts[subProductName] : null;
  }

  /**
   * Get currency ID
   */
  getCurrencyId(type, currency) {
    return config.currencies[type]?.[currency] || null;
  }

  /**
   * Get all products
   */
  getAllProducts() {
    return config.products;
  }

  /**
   * Get config
   */
  getConfig() {
    return config;
  }
}

module.exports = AskMeBillAPI;
