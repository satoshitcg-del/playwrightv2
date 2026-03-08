module.exports = {
  // API URLs
  baseUrl: 'https://bo-sit.askmebill.com',
  apiUrl: 'https://apixint-sit.askmebill.com',
  
  // Product IDs - SIT (Update these!)
  products: {
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
  
  // Products with prefixes and client_name
  defaultProducts: [
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
  ],
  
  // Sub-Products (Update these!)
  subProducts: {
    'Thai Lotto': { 'W/L': '69660aa09fa351a717829995' },
    'Super API': { 'W/L': '696531ae9fa351a717829615' },
    'DIRect_API': { 'testdai31': '69aded51828619175e4e6636' },
    'PGSOFT': { 'Monthly Fee PG': '68f758a6ae095015c6d719d5' },
    'Fix rate': { 'Monthly Fee fix rate': '68f21b8c10ef5782405340df' },
    'นอกเครือ': { 'Monthly fee': '689d8d7e28acc79c2e4a3f11' },
    'ในเครือ': { 'MAINTENANCE': '689308c59baa0e160653a941' },
    'SportbookV.2': { 'W/L': '67ebaf44062049f0aa79c77e' },
    'Tiamut ในเครือ': { 'MAINTENANCE': '6893092d91fe851b25980825' },
    'Tiamut นอกเครือ': { 'Monthly Fee fix rate': '68dcee606f1d1d5d2a8866d0' },
  },
  
  // Currencies
  currencies: {
    fiat: {
      'THB': '6761431c002bb9ff210abb02',
      'IDR': '6761431c002bb9ff210abb7d',
    },
    crypto: {
      'USDT': '6761431c002bb9ff210abc4f',
    }
  }
};