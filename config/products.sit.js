module.exports = {
  // API URLs
  baseUrl: 'https://bo-sit.askmebill.com',
  apiUrl: 'https://apixint-sit.askmebill.com',
  
  // Product IDs - SIT (Update these!)
  products:{
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
