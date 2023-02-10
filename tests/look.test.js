const _look = require('../look')

test('Is able to tell if two characters does not look similar', () => {
  expect(_look.compare("c", "e")).toBe(0)
  expect(_look.compare("d", "f")).toBe(0)
})

test('Is able to tell if two characters look similar', () => {
  expect(_look.compare("а", "a")).toBe(1.0)
})

