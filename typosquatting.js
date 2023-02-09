const _metrics = require('./typosquatting-metrics')
const _decide = require('./typosquatting-decide')
const defaultAlgorithm = 1

var decide = function (url,  protectedDomains) {
    return decideExt(url, defaultAlgorithm, protectedDomains)
}

var decideExt = function (url, algorithm,  protectedDomains) {
    var vectors = _metrics.getMetrics(url, protectedDomains)
    var result = _decide.getCategory(vectors, algorithm)

    return result
}

module.exports = { decide, decideExt }