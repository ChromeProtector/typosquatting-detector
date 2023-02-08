const _url = require('./url')
const _domain = require('./domain')
const _idnDetector = require('./idn-detector')
const _punnyCode = require('./punycode')
const _levenshtein = require('./levenshtein')
const _trans = require('./trans')
const _bitap = require('./bitap')
const _char = require('./char')

var detect = function (url, protecteDomains) {
    var parts = getParts(url);
    var results = [];
    for (var i = 0; i < protecteDomains.length; i++) {
        var domain = protecteDomains[i];
        var result = analyze(domain, parts);
        if (result != null) {
            for (var j = 0; j < result.length; j++) {
                results.push(result[j]);
            }
        }
    }

    var okResult = results.find((el) => el[0] == 'ok');
    if (okResult != null) {
        return [okResult[0], okResult[1]];
    }
    else if (results.length > 0) {
        var min = -1;
        var min_index = -1;
        for (var i = 0; i < result.length; i++) {
            if (result[i][1] < min || min == -1) {
                min = result[i][1]
                min_index = i;
            }
        }
        var found = results[min_index]

        return [found[0], found[1]]
    }
    return null;
}

function analyze(domain, parts) {

    // inputs
    var topDomain = parts[parts.length - 2] + "." + parts[parts.length - 1]
    var raw = parts.join(".");
    var concatented = parts.slice(0, -1).join("") + "." + parts[parts.length - 1];
    var concatentedWithoutSpecials = concatented.replace(/-/g, "");

    var inputs = [topDomain, raw, concatented, concatentedWithoutSpecials];
    var patterns = [domain, domain.split('.')[0]]

    var result = [];
    for (var j = 0; j < patterns.length; j++) {
        var pattern = patterns[j];

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];

            if (j == 1 && i > 0) {
                if (_bitap.customBitap(input, pattern, (c1, c2) => _char.hasSameLook(c1, c2) || _char.hasSimilarLook(c1, c2))) {
                    result.push(['bitap', 0, pattern, input]);
                }
            }

            if (j == 0) {
                if ((i == 0) && (input == pattern)) {
                    result.push(['ok', 0, pattern, input]);
                    break;
                }

                var val = _levenshtein.customDistance(input, pattern, (c1, c2) => c1 == c2, (c1, c2) => 1);
                if (val > 0 && val < pattern.length) {
                    result.push(['edit', val, pattern, input]);
                }

                if (i == 1)
                {
                    var val = _levenshtein.custom3DDistance(input, pattern, (c1, c2) => c1 == c2, (c1, c2) => 1);
                    if (val[0] > 0 && val[0] < pattern.length / 2) {
                        result.push(['edit2', val[0], pattern, input]);
                    }
                }      

                var trans = _trans.transpositions(pattern, 1);
                for (var k = 0; k < trans.length; k++) {
                    if (pattern != trans[k]) {
                        var val = _levenshtein.customDistance(input, trans[k], (c1, c2) => c1 == c2, (c1, c2) => 1);

                        if (val + 1 < pattern.length) {
                            result.push(['transpositions', val + 1, pattern, input]);
                        }
                    }
                }
            }
        }
    }

    return result;
}

function getParts(url) {
    var domain = _url.getDomain(url);
    var parts;
    if (_idnDetector.detect(domain)) {
        var rawDomain = _punnyCode.decode(domain.slice(4));
        parts = _domain.getParts(rawDomain)
    }
    else {
        parts = _domain.getParts(domain)
    }

    return parts;
}

module.exports = { detect }