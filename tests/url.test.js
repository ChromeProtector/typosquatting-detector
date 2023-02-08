const _url = require('../url');

test('Is able to extract domain', () => {
  expect(_url.getDomain("https://google.com/")).toBe("google.com");
  expect(_url.getDomain("https://google.com")).toBe("google.com");
  expect(_url.getDomain("https://google.com/ABCD")).toBe("google.com");
  expect(_url.getDomain("https://google.com/?ABCD")).toBe("google.com");
});

test('Is able to extract TLD', () => {
  expect(_url.getTLD("google.com")).toBe("com");
  expect(_url.getTLD("google.pl")).toBe("pl");

  // fake domain
  expect(_url.getTLD("#######.ευ")).toBe("ευ");
});

test('Is able to detect IDN', () => {
  expect(_url.detectIdn("xn--.pl")).toBe(true);
});

test('Is able to detect not IDN', () => {
  expect(_url.detectIdn("x--.pl")).toBe(false);
});