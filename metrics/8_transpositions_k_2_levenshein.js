const _levenshtein = require('../levenshtein')
const _word = require('../word')

function getValue(dimension, protectedDomain) {
    var min = -1
    var trans = _word.transpositions(protectedDomain, 1);
    for (var k = 0; k < trans.length; k++) {
        if (protectedDomain != trans[k]) {
            var val = _levenshtein.customDistance(dimension, trans[k], (c1, c2) => c1 == c2, (c1, c2) => 1)
            if (val > 0) {
                if (min == -1 || min > val)
                {
                    min = val
                }
            }
        }
    }

    return min
}

module.exports = { getValue }