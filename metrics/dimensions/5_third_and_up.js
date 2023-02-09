const _url = require('../../url');

var getDimension = function (url) {
    var parts = _url.getDomainParts(url)
    var concatented = parts.slice(0, -2).join(".")
    return concatented
}

module.exports = { getDimension }