const punycode = require('punycode/');

var decode = function (encoded) {
    return punycode.decode(encoded);
}

var encode = function (raw) {
    return punycode.encode(raw);
}

module.exports = { decode, encode };