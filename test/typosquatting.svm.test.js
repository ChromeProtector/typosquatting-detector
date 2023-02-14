const _typosquatting = require('../lib/typosquatting')
const _metrics = require("../lib/typosquatting-metrics")
const _punnyCode = require('../lib/punycode')
const _svm = require("../lib/classification/2_svm")

test('Is able to genere model', () => {
  var fakeGoogle = "https://xn--" + _punnyCode.encode("gógle.pl") + "/"
  
  var vector1 = _metrics.getMetrics(fakeGoogle, 'google.pl')
  var vector2 = _metrics.getMetrics("https://google.pl", "google.pl")
  var model = _svm.train([vector1, vector2], [1, 0])
  expect(_typosquatting.decideExt(fakeGoogle, 2, "google.pl", model)).toEqual(1)
})


test('Is able to generate not-precise prediction', () => {
  var fakeGoogle = "https://xn--" + _punnyCode.encode("gógle.pl") + "/"
  
  var vector1 = _metrics.getMetrics(fakeGoogle, "google.pl")
  var vector2 = _metrics.getMetrics("https://google.pl", "google.pl")
  var model = _svm.train([vector1, vector2], [1, 0])

  expect(_typosquatting.decideExt("https://góogle2.pl/", 2, "google.pl", model)).toEqual(1)
})