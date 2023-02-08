var getTLD = function (domain) {
    var parts = getParts(domain);
    return parts[parts.length - 1];
}

var getParts = function (domain) {
    return domain.split(".");
}

module.exports = { getTLD, getParts }