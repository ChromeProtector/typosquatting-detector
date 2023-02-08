const _char = require('../char');

test('Is able to tell if two characters look similar', () => {
  expect(_char.hasSimilarLook("a", "a")).toBe(true);
  expect(_char.hasSimilarLook("c", "e")).toBe(false);
  expect(_char.hasSimilarLook("d", "f")).toBe(false);
});

test('Is able to tell if two characters look same', () => {
  expect(_char.hasSameLook("а", "a")).toBe(true);
});

