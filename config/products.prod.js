module.exports = {
  // API URLs
  baseUrl: 'https://bo.askmebill.com',
  apiUrl: 'https://apixint.askmebill.com',
  
  // Product IDs - PROD (Update these!)
  products: {
    'Thai Lotto': 'PROD_PRODUCT_ID',
    'Super API': 'PROD_PRODUCT_ID',
    'DIRect_API': 'PROD_PRODUCT_ID',
    'PGSOFT': 'PROD_PRODUCT_ID',
    'Fix rate': 'PROD_PRODUCT_ID',
    'นอกเครือ': 'PROD_PRODUCT_ID',
    'ในเครือ': 'PROD_PRODUCT_ID',
    'SportbookV.2': 'PROD_PRODUCT_ID',
    'Tiamut ในเครือ': 'PROD_PRODUCT_ID',
    'Tiamut นอกเครือ': 'PROD_PRODUCT_ID',
  },
  
  // Sub-Products (Update these!)
  subProducts: {
    'Thai Lotto': { 'W/L': 'PROD_SUB_PRODUCT_ID' },
    'Super API': { 'W/L': 'PROD_SUB_PRODUCT_ID' },
    'DIRect_API': { 'optest_api': 'PROD_SUB_PRODUCT_ID' },
    'PGSOFT': { 'Monthly Fee PG': 'PROD_SUB_PRODUCT_ID' },
    'Fix rate': { 'Monthly Fee fix rate': 'PROD_SUB_PRODUCT_ID' },
    'นอกเครือ': { 'Monthly fee': 'PROD_SUB_PRODUCT_ID' },
    'ในเครือ': { 'MAINTENANCE': 'PROD_SUB_PRODUCT_ID' },
    'SportbookV.2': { 'W/L': 'PROD_SUB_PRODUCT_ID' },
    'Tiamut ในเครือ': { 'MAINTENANCE': 'PROD_SUB_PRODUCT_ID' },
    'Tiamut นอกเครือ': { 'Monthly Fee fix rate': 'PROD_SUB_PRODUCT_ID' },
  },
  
  // Currencies
  currencies: {
    fiat: {
      'THB': 'PROD_FIAT_ID',
      'IDR': 'PROD_FIAT_ID',
    },
    crypto: {
      'USDT': 'PROD_CRYPTO_ID',
    }
  }
};
