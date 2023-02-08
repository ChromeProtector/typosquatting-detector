// will be filled
var sameLook = "U+0061-U+0430;";
var similarLook = "";

function check(config, char1, char2) {
    if (char1 == char2) {
        return true;
    }

    const codePoint = char1.toString().codePointAt(0);
    const codePoint2 = char2.toString().codePointAt(0);
    var val1 = "U+" + codePoint.toString(16).padStart(4, '0');
    var val2 = "U+" + codePoint2.toString(16).padStart(4, '0');

    if (val1 > val2) {
        var tmp = val1;
        val1 = val2;
        val2 = tmp;
    }

    if (config.indexOf(val1 + "-" + val2) != -1) {
        return true;
    }
    return false;
}

function hasSimilarLook(char1, char2) {
    return check(similarLook, char1, char2);
}

function hasSameLook(char1, char2) {

    if (char1 == "0" && char2 == "o")
    {
        return true;
    }
    
    if (char1 == "o" && char2 == "0")
    {
        return true;
    }

    return check(sameLook, char1, char2);
}

module.exports = { hasSameLook, hasSimilarLook }