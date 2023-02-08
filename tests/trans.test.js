const _trans = require('../trans');

test('Is able to generate transpositions', () => {
  expect(_trans.transpositions("google", 1).length).toBe(5);
  expect(_trans.transpositions("google", 2).length).toBe(4);
});