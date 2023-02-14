const _url = require('../url')

function getValue(dimension, protectedDomain) {
    return _url.detectIdn(dimension) == _url.detectIdn(protectedDomain) ? 1 : 0
}

module.exports = { getValue }