var data = {
    "U+0061-U+0430" : 1.0
}

const limit = 0.97

function _compare(config, char1, char2) {
    if (char1 == char2) {
        return 1.0
    }

    const codePoint = char1.toString().codePointAt(0)
    const codePoint2 = char2.toString().codePointAt(0)
    var val1 = "U+" + codePoint.toString(16).padStart(4, '0')
    var val2 = "U+" + codePoint2.toString(16).padStart(4, '0')

    if (val1 > val2) {
        var tmp = val1
        val1 = val2
        val2 = tmp
    }
    var val = config[val1 + "-" + val2]
    if (val != undefined) {
        return val
    }
    return 0.0
}

function compare(char1, char2) {
    return _compare(data, char1, char2)
}
module.exports = { compare, limit }