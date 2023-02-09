function getValue(dimension, protectedDomain) {
    return protectedDomain.indexOf(dimension) != -1
}

module.exports = { getValue }