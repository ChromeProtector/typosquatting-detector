var getDomain = function (urlInput) {
    return urlInput.split("/")[2];
}

module.exports = { getDomain };