module.exports = {
  // API URLs
  baseUrl: 'https://bo-dev.askmebill.com',
  apiUrl: 'https://apixint-dev.askmebill.com',
  
  // Product IDs - DEV
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
  
  // Sub-Products
  subProducts: {
    'Thai Lotto': { 'W/L': '69660aa09fa351a717829995' },
    'Super API': { 'W/L': '696531ae9fa351a717829615' },
    'DIRect_API': { 'optest_api': '69ada047ebe111b410b1bd49' },
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
