
var detect = function (domain) {
    if (domain.indexOf("xn--") == 0) {
        return true;
    }
    return false;
}

module.exports = { detect };