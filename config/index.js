/**
 * Config Loader - โหลด config ตาม environment
 * 
 * Usage:
 *   const config = require('./config');
 *   const productId = config.products['Thai Lotto'];
 * 
 * Environment:
 *   ENV=dev     -> products.dev.js (default)
 *   ENV=sit     -> products.sit.js
 *   ENV=prod    -> products.prod.js
 */

const env = process.env.ENV || 'sit';
const configFile = `./products.${env}`;

let config;
try {
  config = require(configFile);
  console.log(`📦 Loaded config: ${env}`);
} catch (error) {
  console.error(`❌ Failed to load config for env: ${env}`);
  console.error(error.message);
  process.exit(1);
}

module.exports = config;
