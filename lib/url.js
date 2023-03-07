const _punyCode = require('./punycode')

var detectIdn = function (domain) {
    
    if (domain == null) return false

    if (domain.indexOf("xn--") == 0) {
        return true;
    }
    return false;
}

var getDomain = function (urlInput) {
    if (urlInput == null) {
        return null
    }

    if (urlInput.indexOf('/') != -1) {
        return urlInput.split("/")[2]
    }
    else {
        return urlInput
    }
}

var getTLD = function (domain) {
    if (domain == null) return null

    var parts = getParts(domain)
    return parts[parts.length - 1]
}

var getParts = function (domain) {
    if (domain == null) return null
    return domain.split(".")
}

var getDomainParts = function (url) {
    var domain = getDomain(url)
    var parts;
    if (detectIdn(domain)) {
        try {
            var rawDomain = _punyCode.decode(domain.slice(4))
            parts = getParts(rawDomain)
        }
        catch (ex) {
            return null
        }

    }
    else {
        parts = getParts(domain)
    }

    return parts;
}

module.exports = { detectIdn, getDomain, getTLD, getDomainParts };