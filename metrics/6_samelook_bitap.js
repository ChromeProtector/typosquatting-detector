const _bitap = require('../bitap')
const _char = require('../char')

function getValue(dimension, protectedDomain) {
    var bitapResult = _bitap.customBitap(dimension, protectedDomain, (c1, c2) => _char.hasSameLook(c1, c2))
    if (bitapResult != null) {
        return bitapResult.length
    }
    return 0
}

module.exports = { getValue }