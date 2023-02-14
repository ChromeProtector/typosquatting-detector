function exactBitap(text, pattern) {
    var m = pattern.length;
    if (m == 0) {
        return text
    }

    R = new Array(m + 1);
    for (var i = 0; i < R.length; i++) {
        R[i] = 0
    }

    R[0] = 1

    for (var i = 0; i < text.length; i++) {
        for (var k = m; k >= 1; k -= 1) {
            R[k] = R[k - 1] & (text[i] == pattern[k - 1])
        }

        if (R[m]) {
            return text.slice(i - m + 1).substring(0, m)
        }
    }

    return null
}

function customBitap(text, pattern, limit, isEqual) {
    var m = pattern.length
    if (m == 0) {
        return text
    }

    R = new Array(m + 1)
    S = new Array(m + 1)
    for (var i = 0; i < R.length; i++) {
        R[i] = 0
        S[i] = 0
    }

    R[0] = 1

    for (var i = 0; i < text.length; i++) {
        for (var k = m; k >= 1; k -= 1) {
            var eq = isEqual(text[i], pattern[k - 1])
            if (eq >= limit) {
                S[k] = S[k - 1] + eq
                R[k] = R[k - 1]
            }
            else {
                R[k] = 0
                S[k] = 0
            }
        }

        if (R[m]) {
            return [text.slice(i - m + 1).substring(0, m), S[m]]
        }
    }

    return null
}

module.exports = { exactBitap, customBitap };