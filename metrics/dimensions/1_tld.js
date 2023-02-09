const _url = require('../../url');

var getDimension = function (url) {
    var parts = _url.getDomainParts(url)

    if (parts.length >= 1) { 
        return parts[parts.length - 1]
    }

    return null
}

module.exports = { getDimension }