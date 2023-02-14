const _levenshtein = require('../levenshtein')

function getValue(dimension, protectedDomain) {
    var val = _levenshtein.customDistance(dimension, protectedDomain, 1, (c1, c2) => c1 == c2 ? 1 : 0, (c1, c2) => 0)
    return val
}

module.exports = { getValue }