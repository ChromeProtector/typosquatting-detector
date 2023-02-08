const _punnyCode = require('./punycode')

var detectIdn = function (domain) {
    if (domain.indexOf("xn--") == 0) {
        return true;
    }
    return false;
}

var getDomain = function (urlInput) {
    return urlInput.split("/")[2]
}

var getTLD = function (domain) {
    var parts = getParts(domain)
    return parts[parts.length - 1]
}

var getParts = function (domain) {
    return domain.split(".")
}

var getDomainParts = function (url) {
    var domain = getDomain(url)
    var parts;
    if (detectIdn(domain)) {
        var rawDomain = _punnyCode.decode(domain.slice(4))
        parts = getParts(rawDomain)
    }
    else {
        parts = getParts(domain)
    }

    return parts;
}

module.exports = { detectIdn, getDomain, getTLD, getDomainParts };