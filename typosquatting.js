const _metrics = require('./typosquatting-metrics')
const _decide = require('./typosquatting-decide')
const defaultAlgorithm = 1

var decide = function (url,  protectedDomains, model) {
    return decideExt(url, defaultAlgorithm, protectedDomains, model)
}

var decideExt = function (url, algorithm,  protectedDomains, model) {
    var vectors = _metrics.getMetrics(url, protectedDomains)
    var result = _decide.getCategory(vectors, algorithm, model)

    return result
}

module.exports = { decide, decideExt }