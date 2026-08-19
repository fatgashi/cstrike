const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

function read(relativePath) {
  return fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8');
}

test('kofi payments route exists and is superadmin-protected', () => {
  const routes = read('router/routes.js');
  assert.match(routes, /path:\s*"\/dashboard\/kofi-payments"/);
  assert.match(routes, /name:\s*"DashboardKofiPayments"/);
  assert.match(routes, /requireSuperAdmin:\s*true/);
});

test('dashboard navigation includes Ko-fi Payments for superadmin only', () => {
  const layout = read('DashboardLayout/DashboardLayout.vue');
  assert.match(layout, /name:\s*'Ko-fi Payments'/);
  assert.match(layout, /path:\s*'\/dashboard\/kofi-payments'/);
  const ownerBlock = layout.slice(layout.indexOf("if (role === 'owner')"), layout.indexOf("if (role === 'superadmin')"));
  assert.doesNotMatch(ownerBlock, /kofi-payments/);
});

test('kofi payments view has operational actions and confirmation copy', () => {
  const view = read('Dashboard/DashboardKofiPaymentsView.vue');
  assert.match(view, /data-testid="kofi-payments-page"/);
  assert.match(view, /data-testid="kofi-resolve-player"/);
  assert.match(view, /data-testid="kofi-fulfill"/);
  assert.match(view, /data-testid="kofi-resolve-without"/);
  assert.match(view, /You are about to fulfill this already-paid Ko-fi transaction/);
  assert.match(view, /Existing fulfillment safety checks will run before any game-server mutation/);
  assert.doesNotMatch(view, /zp_addvip/);
  assert.doesNotMatch(view, /v-html/);
  assert.doesNotMatch(view, /entitlementCode[\s\S]{0,40}v-model/);
});

test('detail separates Ko-fi payer identity from CS player request', () => {
  const view = read('Dashboard/DashboardKofiPaymentsView.vue');
  const api = read('api/kofiPaymentsApi.js');
  assert.match(view, /data-testid="kofi-buyer-contact"/);
  assert.match(view, /data-testid="kofi-buyer-display-name"/);
  assert.match(view, /data-testid="kofi-buyer-email"/);
  assert.match(view, /data-testid="kofi-player-request"/);
  assert.match(view, /data-testid="kofi-additional-details"/);
  assert.match(view, /Ko-fi display name/);
  assert.match(view, /Not provided/);
  assert.match(view, /Anonymous/);
  assert.match(view, /This is not the CS nickname/);
  assert.match(api, /buyer:\s*\{/);
  assert.match(api, /delete item\.buyer/);
  const tableBlock = view.slice(view.indexOf('<thead>'), view.indexOf('</thead>'));
  assert.doesNotMatch(tableBlock, /email/i);
  assert.doesNotMatch(tableBlock, /Ko-fi display name/);
});

test('kofi payments API uses Superadmin admin endpoints', () => {
  const apiFile = read('api/kofiPaymentsApi.js');
  assert.match(apiFile, /\/admin\/kofi-payments/);
  assert.match(apiFile, /resolve-player/);
  assert.match(apiFile, /resolve-without-fulfillment/);
  assert.match(apiFile, /registersys-search/);
});
