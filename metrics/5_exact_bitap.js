const _bitap = require('../bitap')

function getValue(dimension, protectedDomain) {
    var bitapResult = _bitap.customBitap(dimension, protectedDomain, 1, (c1, c2) => c1 == c2 ? 1 : 0)
    if (bitapResult != null) {
        return bitapResult[1]
    }
    return 0
}

module.exports = { getValue }