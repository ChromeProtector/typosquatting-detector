const _typosquatting = require('../typosquatting')
const _punnyCode = require('../punycode')

test('Is able to detect safe IDN website', () => {
  var fakeGoogle = "https://xn--" + _punnyCode.encode("google.pl") + "/"
  expect(_typosquatting.decide(fakeGoogle, "google.pl")).toEqual(1)
})

test('Is able to detect safe website', () => {
  expect(_typosquatting.decide("https://google.pl/", "google.pl")).toEqual(0)
})

test('Is able to detect google is upper domain ', () => {
  expect(_typosquatting.decide("https://google.####.pl/", "google.pl")).toEqual(1)
})