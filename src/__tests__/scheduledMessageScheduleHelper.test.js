const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadHelperModule() {
  const helperPath = path.join(__dirname, '..', 'helpers', 'scheduledMessageScheduleHelper.js');
  const source = fs.readFileSync(helperPath, 'utf8');
  const transformed = source.replace(/export\s*\{([\s\S]*?)\};?\s*$/m, 'module.exports = {$1};');

  const context = {
    module: { exports: {} },
    exports: {},
    require,
    console,
  };

  vm.runInNewContext(transformed, context, { filename: helperPath });
  return context.module.exports;
}

test('interval schedule builds expected cron expression', () => {
  const helper = loadHelperModule();
  const cron = helper.buildCronExpression({
    scheduleType: helper.SCHEDULE_TYPES.INTERVAL,
    intervalMinutes: 12,
  });
  assert.equal(cron, '*/12 * * * *');
});

test('daily schedule builds expected cron expression', () => {
  const helper = loadHelperModule();
  const cron = helper.buildCronExpression({
    scheduleType: helper.SCHEDULE_TYPES.DAILY,
    hour: 18,
    minute: 30,
  });
  assert.equal(cron, '30 18 * * *');
});

test('known cron expression maps to schedule builder mode', () => {
  const helper = loadHelperModule();
  const parsed = helper.parseCronExpression('15 9 * * 1');
  assert.equal(parsed.type, helper.SCHEDULE_TYPES.WEEKLY);
  assert.equal(parsed.hour, 9);
  assert.equal(parsed.minute, 15);
  assert.equal(parsed.weekday, 1);
});

test('unknown cron expression falls back to custom mode', () => {
  const helper = loadHelperModule();
  const parsed = helper.parseCronExpression('1 2 3 4 5');
  assert.equal(parsed.type, helper.SCHEDULE_TYPES.CUSTOM);
  assert.equal(parsed.description, 'Custom schedule');
});

test('non-divisor interval description is minute-marks text', () => {
  const helper = loadHelperModule();
  const parsed = helper.parseCronExpression('*/7 * * * *');
  assert.equal(parsed.type, helper.SCHEDULE_TYPES.INTERVAL);
  assert.match(parsed.description, /At minute marks/);
});
