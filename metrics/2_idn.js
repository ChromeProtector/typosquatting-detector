const _url = require('../url')

function getValue(dimension, protectedDomain) {
    return _url.detectIdn(dimension)
}

module.exports = { getValue }