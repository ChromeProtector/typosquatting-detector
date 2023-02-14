const _look = require('../look')
const _levenshtein = require('../levenshtein')

function getValue(dimension, protectedDomain) {
    var val = _levenshtein.customDistance(dimension, protectedDomain, _look.limit, (c1, c2) => _look.compare(c1, c2), (c1, c2) => 1 - _look.compare(c1, c2))
    return val
}

module.exports = { getValue }