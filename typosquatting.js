const _metrics = require('./typosquatting-metrics')
const _classifier = require('./typosquatting-classification')
const defaultAlgorithm = 1

var decide = function (url,  protectedDomain, model) {
    return decideExt(url, defaultAlgorithm, protectedDomain, model)
}

var decideExt = function (url, algorithm,  protectedDomain, model) {
    var vector = _metrics.getMetrics(url, protectedDomain)
    return _classifier.getLabel(vector, algorithm, model)
}

module.exports = { decide, decideExt }