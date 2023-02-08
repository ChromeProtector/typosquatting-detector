function exactBitap(text, pattern) {
    var m = pattern.length;
    if (m == 0) {
        return text;
    }

    R = new Array(m + 1);
    for (var i = 0; i < R.length; i++) {
        R[i] = 0;
    }

    R[0] = 1;

    for (var i = 0; i < text.length; i++) {
        for (var k = m; k >= 1; k -= 1) {
            R[k] = R[k - 1] & (text[i] == pattern[k - 1]);
        }

        if (R[m]) {
            return text.slice(i - m + 1).substring(0, m);
        }
    }

    return null;
}

function customBitap(text, pattern, isEqual) {
    var m = pattern.length;
    if (m == 0) {
        return text;
    }

    R = new Array(m + 1);
    for (var i = 0; i < R.length; i++) {
        R[i] = 0;
    }

    R[0] = 1;

    for (var i = 0; i < text.length; i++) {
        for (var k = m; k >= 1; k -= 1) {
            R[k] = R[k - 1] & (isEqual(text[i], pattern[k - 1]));
        }

        if (R[m]) {
            return text.slice(i - m + 1).substring(0, m);
        }
    }

    return null;
}

module.exports = { exactBitap, customBitap };