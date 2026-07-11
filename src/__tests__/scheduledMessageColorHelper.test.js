const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadColorHelper() {
  const file = path.join(__dirname, '..', 'helpers', 'scheduledMessageColorHelper.js');
  const source = fs.readFileSync(file, 'utf8');
  const transformed = source.replace(/export\s*\{([\s\S]*?)\};?\s*$/m, 'module.exports = {$1};');
  const context = { module: { exports: {} }, exports: {}, require };
  vm.runInNewContext(transformed, context, { filename: file });
  return context.module.exports;
}

test('applies selected color token before selected text', () => {
  const helper = loadColorHelper();
  const result = helper.applyColorToken({
    text: '[WCS] Join our Discord',
    selectionStart: 0,
    selectionEnd: 5,
    token: '$4',
  });

  assert.equal(result.value, '$4[WCS] Join our Discord');
});

test('inserts color token at cursor when no selection', () => {
  const helper = loadColorHelper();
  const result = helper.applyColorToken({
    text: '[WCS] Join',
    selectionStart: 6,
    selectionEnd: 6,
    token: '$1',
  });

  assert.equal(result.value, '[WCS] $1Join');
});

test('avoids duplicate adjacent tokens', () => {
  const helper = loadColorHelper();
  const result = helper.applyColorToken({
    text: '$4[WCS] Join',
    selectionStart: 2,
    selectionEnd: 2,
    token: '$4',
  });

  assert.equal(result.value, '$4[WCS] Join');
});

test('clears formatting from selection only', () => {
  const helper = loadColorHelper();
  const result = helper.clearColorTokens({
    text: '$4[WCS] $1Join',
    selectionStart: 0,
    selectionEnd: 10,
  });

  assert.equal(result.value, '[WCS] Join');
});

test('clears formatting from whole message when no selection', () => {
  const helper = loadColorHelper();
  const result = helper.clearColorTokens({
    text: '$4[WCS] $1For daily $3rewards',
    selectionStart: 0,
    selectionEnd: 0,
  });

  assert.equal(result.value, '[WCS] For daily rewards');
});

test('parses safe color segments without html', () => {
  const helper = loadColorHelper();
  const segments = helper.parseColorSegments('$4[WCS] $1For daily $4rewards');
  assert.equal(segments.length, 3);
  assert.equal(segments[0].code, '$4');
  assert.equal(segments[0].text, '[WCS] ');
  assert.equal(segments[1].code, '$1');
  assert.equal(segments[1].text, 'For daily ');
  assert.equal(segments[2].code, '$4');
  assert.equal(segments[2].text, 'rewards');
});
