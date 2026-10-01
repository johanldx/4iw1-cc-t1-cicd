import test from 'node:test';
import assert from 'node:assert/strict';
import { greet, calculateSum, formatAppInfo } from '../src/index.js';

test('greet() retourne le message attendu', () => {
  assert.equal(greet('ESGI'), 'Hello, ESGI!');
  assert.equal(greet(), 'Hello, World!');
});

test('calculateSum() effectue une addition exacte', () => {
  assert.equal(calculateSum(2, 3), 5);
  assert.equal(calculateSum(-10, 10), 0);
});

test('formatAppInfo() retourne un objet avec status et timestamp', () => {
  const info = formatAppInfo();
  assert.equal(info.status, 'running');
  assert.ok(typeof info.timestamp === 'string');
});
