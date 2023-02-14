const _url = require('../../url');

var getDimension = function (url) {
    var parts = _url.getDomainParts(url)
    if (parts != null && parts.length >= 2)
    {
        return parts[parts.length - 2]
    }
    return null
}

module.exports = { getDimension }