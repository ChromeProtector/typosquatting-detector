const _url = require('../../url');

var getDimension = function (url) {
    var parts = _url.getDomainParts(url)
    if (parts == null) return null
    
    var concatented = parts.slice(0, -1).join("") + "." + parts[parts.length - 1]
    var concatentedWithoutSpecials = concatented.replace(/-/g, "") //TODO
    return concatentedWithoutSpecials    
}

module.exports = { getDimension }