const _typosquatting = require('../typosquatting');
const _punnyCode = require('../punycode');

test('Is able to find a few typosquatting attacks', () => {
  expect(_typosquatting.detect("https://góogle.pl/", ["google.pl"])).toEqual(1);
  expect(_typosquatting.detect("https://gooogle.pl/", ["google.pl"])).toEqual(1);
  expect(_typosquatting.detect("https://goolge.pl/", ["google.pl"])).toEqual(1);
  expect(_typosquatting.detect("https://1111111111111111111111111111google.pl/", ["google.pl"])).toEqual(1);
  expect(_typosquatting.detect("https://g-o-o-g-l-e.pl/", ["google.pl"])).toEqual(1);
  expect(_typosquatting.detect("https://g-o-o-g-l-e.pl/", ["google.pl"])).toEqual(1);
  expect(_typosquatting.detect("https://g-o-o-g-l.pl/", ["google.pl"])).toEqual(1);
  expect(_typosquatting.detect("https://o-g-o-g-l.pl/", ["google.pl"])).toEqual(1);
  expect(_typosquatting.detect("https://g0olge.pl/", ["google.pl"])).toEqual(1);
  expect(_typosquatting.detect("https://gooogle.####.pl/", ["google.pl"])).toEqual(1);
  expect(_typosquatting.detect("https://g0ogle.######.pl/", ["google.pl"])).toEqual(1);

  expect(_typosquatting.detect("https://o------------------------g-o-gle.pl/", ["google.pl"])).toEqual(1);
});

test('Is able to find IDN attacks', () => {
  var fakeGoogle = "https://xn--" + _punnyCode.encode("góogle.pl") + "/";
  expect(_typosquatting.detect(fakeGoogle, ["google.pl"])).toEqual(1);
});

test('Is able to detect safe IDN websites', () => {
  var fakeGoogle = "https://xn--" + _punnyCode.encode("google.pl") + "/";
  expect(_typosquatting.detect(fakeGoogle, ["google.pl"])).toEqual(0);
});

test('Is able to detect safe website', () => {
  expect(_typosquatting.detect("https://google.pl/", ["google.pl"])).toEqual(0);
});

test('Is able to ignore other websites', () => {
  expect(_typosquatting.detect("https://facebook.com/", ["google.pl"])).toEqual(0);
});

test('Is able to detect safe website with multiple protected domains', () => {
  expect(_typosquatting.detect("https://google.pl/", ["google.pl", "google.com"])).toEqual(0);
  expect(_typosquatting.detect("https://google.com/", ["google.pl", "google.com"])).toEqual(0);
  expect(_typosquatting.detect("https://maps.google.com/", ["google.pl", "google.com"])).toEqual(0);
});