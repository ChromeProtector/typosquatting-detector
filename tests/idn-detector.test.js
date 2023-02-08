const _detector = require('../idn-detector');

test('Is able to detect IDN', () => {
  expect(_detector.detect("xn--.pl")).toBe(true);
});

test('Is able to detect not IDN', () => {
  expect(_detector.detect("x--.pl")).toBe(false);
});