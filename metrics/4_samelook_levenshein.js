const _char = require('../char')
const _levenshtein = require('../levenshtein')

function getValue(dimension, protectedDomain) {
    var val = _levenshtein.customDistance(dimension, protectedDomain, (c1, c2) => _char.hasSameLook(c1, c2), (c1, c2) => 1)
    return val
}

module.exports = { getValue }