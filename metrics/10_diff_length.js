function getValue(dimension, protectedDomain) {
    return Math.abs(dimension.length - protectedDomain.length)
}

module.exports = { getValue }