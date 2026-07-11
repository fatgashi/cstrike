const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadPayloadHelper() {
  const file = path.join(__dirname, '..', 'helpers', 'scheduledMessagePayloadHelper.js');
  const source = fs.readFileSync(file, 'utf8');
  const transformed = source.replace(/export\s*\{([\s\S]*?)\};?\s*$/m, 'module.exports = {$1};');
  const context = {
    module: { exports: {} },
    exports: {},
    require,
  };
  vm.runInNewContext(transformed, context, { filename: file });
  return context.module.exports;
}

test('payload sanitizer allows only approved scheduled message fields', () => {
  const helper = loadPayloadHelper();
  const sanitized = helper.sanitizeScheduledMessagePayload({
    name: 'Promo',
    message: '$4hello',
    cronExpression: '*/12 * * * *',
    timezone: 'Europe/Belgrade',
    enabled: true,
    command: 'amx_kick all',
    rawCommand: 'quit',
    createdBy: 7,
  });

  assert.equal(
    JSON.stringify(sanitized),
    JSON.stringify({
      name: 'Promo',
      message: '$4hello',
      cronExpression: '*/12 * * * *',
      timezone: 'Europe/Belgrade',
      enabled: true,
    })
  );
});

test('api service uses admin scheduled message endpoints', () => {
  const apiFile = fs.readFileSync(
    path.join(__dirname, '..', 'api', 'scheduledServerMessagesApi.js'),
    'utf8'
  );

  assert.match(apiFile, /\/admin\/server-messages/);
  assert.match(apiFile, /\/toggle/);
  assert.match(apiFile, /\/send-now/);
});
