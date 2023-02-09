const _url = require('../../url');

var getDimension = function (url) {
    return _url.getDomain(url)
}

module.exports = { getDimension }