const _word = require('../lib/word')

test('Is able to generate transpositions', () => {
  expect(_word.transpositions("google", 1).length).toBe(5)
  expect(_word.transpositions("google", 2).length).toBe(4)
});