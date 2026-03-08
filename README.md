# AskMeBill BO Automation

Playwright automation for AskMeBill BO.

## Setup

```bash
npm install
```

## Configuration

Edit `.env` file:
```
BASE_URL=https://bo-dev.askmebill.com
API_URL=https://apixint-dev.askmebill.com
EMAIL=admin_eiji
PASSWORD=0897421942@Earth
TOTP=999999
```

## Usage

```bash
# Run full flow (login -> create customer -> add products -> add sub-products)
npm run full-flow

# Or run individual steps
npm run login
npm run create-customer
npm run add-product
npm run add-sub-product
```
