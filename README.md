# AskMeBill BO Automation

Playwright automation for AskMeBill BO.

## Setup

```bash
npm install
```

## Configuration

Edit `.env.sit` or `.env.dev` file:
```
# SIT (default)
EMAIL=admin_eiji
PASSWORD=0897421942@Earth
TOTP=954900
API_URL=https://apixint-sit.askmebill.com

# DEV
EMAIL=admin_eiji
PASSWORD=0897421942@Earth
TOTP=999999
API_URL=https://apixint-dev.askmebill.com
```

## Usage

```bash
# Run full flow (default: SIT)
npm run full-flow

# Or run individual steps (requires .token file)
npm run login
npm run create-customer
npm run add-product
npm run add-sub-product

# Run with specific env
ENV=sit npm run full-flow
ENV=dev npm run full-flow
```

## Files Generated

After running `full-flow`, these files are created:
- `.token` - Auth token
- `.customer_id` - Customer ID
- `.customer_products.json` - Customer products map

## Project Structure

```
src/
├── auth/
│   └── login.js          - Login standalone
├── customers/
│   └── create.js         - Create customer standalone
├── products/
│   ├── add.js            - Add products standalone
│   └── addSubProduct.js  - Add sub-products standalone
├── reports/
│   ├── getWinLose.js     - Get W/L report
│   └── getDirectApiWinLose.js
├── lib/
│   ├── api.js            - API client
│   └── browser.js        - Browser automation
└── flows/
    └── fullFlow.js       - Full automation flow
```

## Products & Sub-Products

Config files in `config/`:
- `products.sit.js` - SIT environment
- `products.dev.js` - DEV environment
- `products.prod.js` - Production environment
