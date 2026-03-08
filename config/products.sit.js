module.exports = {
  // API URLs
  baseUrl: 'https://bo-sit.askmebill.com',
  apiUrl: 'https://apixint-sit.askmebill.com',
  
  // Product IDs - SIT (Update these!)
  products: {
    'Thai Lotto': 'SIT_PRODUCT_ID',
    'Super API': 'SIT_PRODUCT_ID',
    'DIRect_API': 'SIT_PRODUCT_ID',
    'PGSOFT': 'SIT_PRODUCT_ID',
    'Fix rate': 'SIT_PRODUCT_ID',
    'นอกเครือ': 'SIT_PRODUCT_ID',
    'ในเครือ': 'SIT_PRODUCT_ID',
    'SportbookV.2': 'SIT_PRODUCT_ID',
    'Tiamut ในเครือ': 'SIT_PRODUCT_ID',
    'Tiamut นอกเครือ': 'SIT_PRODUCT_ID',
  },
  
  // Sub-Products (Update these!)
  subProducts: {
    'Thai Lotto': { 'W/L': 'SIT_SUB_PRODUCT_ID' },
    'Super API': { 'W/L': 'SIT_SUB_PRODUCT_ID' },
    'DIRect_API': { 'optest_api': 'SIT_SUB_PRODUCT_ID' },
    'PGSOFT': { 'Monthly Fee PG': 'SIT_SUB_PRODUCT_ID' },
    'Fix rate': { 'Monthly Fee fix rate': 'SIT_SUB_PRODUCT_ID' },
    'นอกเครือ': { 'Monthly fee': 'SIT_SUB_PRODUCT_ID' },
    'ในเครือ': { 'MAINTENANCE': 'SIT_SUB_PRODUCT_ID' },
    'SportbookV.2': { 'W/L': 'SIT_SUB_PRODUCT_ID' },
    'Tiamut ในเครือ': { 'MAINTENANCE': 'SIT_SUB_PRODUCT_ID' },
    'Tiamut นอกเครือ': { 'Monthly Fee fix rate': 'SIT_SUB_PRODUCT_ID' },
  },
  
  // Currencies
  currencies: {
    fiat: {
      'THB': 'SIT_FIAT_ID',
      'IDR': 'SIT_FIAT_ID',
    },
    crypto: {
      'USDT': 'SIT_CRYPTO_ID',
    }
  }
};
