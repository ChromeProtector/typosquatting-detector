const _bitap = require('../bitap')

function getValue(dimension, protectedDomain) {
    var bitapResult = _bitap.customBitap(dimension, protectedDomain, (c1, c2) => c1 == c2)
    if (bitapResult != null) {
        return bitapResult.length
    }
    return 0
}

module.exports = { getValue }