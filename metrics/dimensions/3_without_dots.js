const _url = require('../../url');

var getDimension = function (url) {
    var parts = _url.getDomainParts(url)
    var concatented = parts.slice(0, -1).join("") + "." + parts[parts.length - 1]
    return concatented    
}

module.exports = { getDimension }