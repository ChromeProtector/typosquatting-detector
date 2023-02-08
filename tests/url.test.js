const _url = require('../url');

test('Is able to extract domain', () => {
  expect(_url.getDomain("https://google.com/")).toBe("google.com");
  expect(_url.getDomain("https://google.com")).toBe("google.com");
  expect(_url.getDomain("https://google.com/ABCD")).toBe("google.com");
  expect(_url.getDomain("https://google.com/?ABCD")).toBe("google.com");
});