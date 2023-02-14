function getValue(dimension, protectedDomain) {
    return (dimension.length == protectedDomain.length) ? 1 : 0
}

module.exports = { getValue }