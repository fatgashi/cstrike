const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

function read(relativePath) {
  return fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8');
}

test('dashboard route exists and is superadmin-protected', () => {
  const routes = read('router/routes.js');
  assert.match(routes, /path:\s*"\/dashboard\/server-messages"/);
  assert.match(routes, /name:\s*"DashboardScheduledMessages"/);
  assert.match(routes, /requireSuperAdmin:\s*true/);
});

test('dashboard navigation includes server messages link for superadmin', () => {
  const layout = read('DashboardLayout/DashboardLayout.vue');
  assert.match(layout, /name:\s*'Server messages'/);
  assert.match(layout, /path:\s*'\/dashboard\/server-messages'/);
});

test('scheduled messages view has required primary actions and test selectors', () => {
  const view = read('Dashboard/DashboardScheduledMessagesView.vue');
  assert.match(view, /data-testid="scheduled-messages-page"/);
  assert.match(view, /data-testid="scheduled-message-add"/);
  assert.match(view, /data-testid="scheduled-message-row"/);
  assert.match(view, /data-testid="scheduled-message-edit"/);
  assert.match(view, /data-testid="scheduled-message-send-now"/);
  assert.match(view, /data-testid="scheduled-message-toggle"/);
  assert.match(view, /data-testid="scheduled-message-delete"/);
  assert.match(view, /data-testid="scheduled-message-confirm-send"/);
});

test('send-now and delete actions use confirmation modal copy', () => {
  const view = read('Dashboard/DashboardScheduledMessagesView.vue');
  assert.match(view, /Send this message now\?/);
  assert.match(view, /Delete scheduled message\?/);
  assert.match(view, /immediately send the message to the configured CS 1\.6 server/);
});

test('form contains schedule builder fields and no raw command input', () => {
  const form = read('Dashboard/ScheduledServerMessageForm.vue');
  assert.match(form, /Schedule type/);
  assert.match(form, /Every X minutes/);
  assert.match(form, /Hourly/);
  assert.match(form, /Daily/);
  assert.match(form, /Weekly/);
  assert.match(form, /Custom cron expression/);
  assert.match(form, /Europe\/Belgrade/);
  assert.doesNotMatch(form, /RCON command|raw command|command field/i);
});

test('message is rendered as text and not unsafe HTML', () => {
  const view = read('Dashboard/DashboardScheduledMessagesView.vue');
  const form = read('Dashboard/ScheduledServerMessageForm.vue');

  assert.doesNotMatch(view, /v-html/);
  assert.doesNotMatch(form, /v-html/);
});
