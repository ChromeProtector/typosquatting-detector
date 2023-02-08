const _domain = require('../domain');

test('Is able to extract TLD', () => {
  expect(_domain.getTLD("google.com")).toBe("com");
  expect(_domain.getTLD("google.pl")).toBe("pl");

  // fake domain
  expect(_domain.getTLD("#######.ευ")).toBe("ευ");
});
