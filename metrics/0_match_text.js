function getValue(dimension, protectedDomain) {
    return (dimension == protectedDomain) ? 1 : 0
}

module.exports = { getValue }