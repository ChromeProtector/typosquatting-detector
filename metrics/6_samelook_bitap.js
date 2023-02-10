const _bitap = require('../bitap')
const _look = require('../look')

function getValue(dimension, protectedDomain) {
    var bitapResult = _bitap.customBitap(dimension, protectedDomain, _look.limit, (c1, c2) => _look.compare(c1, c2))
    if (bitapResult != null) {
        return bitapResult[1]
    }
    return 0
}

module.exports = { getValue }