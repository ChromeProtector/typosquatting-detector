const _url = require('./url')
const _levenshtein = require('./levenshtein')
const _trans = require('./trans')
const _bitap = require('./bitap')
const _char = require('./char')

var detect = function (url, protectedDomains) {
    var results = analyze(url, protectedDomains)
    return decide(results)
}

var analyze = function (url, protectedDomains) {
    var parts = _url.getDomainParts(url)
    var results = []
    for (var i = 0; i < protectedDomains.length; i++) {
        var protectedDomain = protectedDomains[i];
        var result = analyzeDomain(protectedDomain, parts);
        if (result != null) {
            for (var j = 0; j < result.length; j++) {
                results.push(result[j])
            }
        }
    }
    return results
}

// TODO - implement some AI
var decide = function (results) {
    var okResult = results.find((el) => el[0] == 'ok');
    if (okResult != null) {
        return 0
    }
    else if (results.length > 0) {
        var min = null;
        var min_index = -1;
        for (var i = 0; i < results.length; i++) {
            if (min_index == -1 || results[i][1] < min[1]) {
                min = results[i]
                min_index = i
            }
        }
        if (min_index != -1) {
            // some heuristic
            if (min[0] == 'edit2' || min[0] == 'edit') {
                if (min[1] < min[2].length / 2) {
                    return 1
                }
            }
            else {
                return 1
            }
        }
    }
    return 0
}

function analyzeDomain(domain, parts) {

    var topDomain = parts[parts.length - 2] + "." + parts[parts.length - 1]
    var raw = parts.join(".")
    var concatented = parts.slice(0, -1).join("") + "." + parts[parts.length - 1]
    var concatentedWithoutSpecials = concatented.replace(/-/g, "")
    var specialsCount = (concatented.match(/-/g) || []).length
    var inputs = [topDomain, raw, concatented, concatentedWithoutSpecials];

    var patterns = [domain, domain.split('.')[0]]

    var result = []
    for (var j = 0; j < patterns.length; j++) {
        var pattern = patterns[j]

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i]

            if ((j == 0) && (i == 0) && (input == pattern)) {
                result.push(['ok', 0, pattern, input])
                break
            }

            var inputPenalty = i == 3 ? specialsCount : 0

            var bitapResult = _bitap.customBitap(input, pattern, (c1, c2) => c1 == c2)
            if (bitapResult != null) {
                result.push(['bitap', inputPenalty, pattern, input])
            }

            var val = _levenshtein.customDistance(input, pattern, (c1, c2) => c1 == c2, (c1, c2) => 1);
            if (val > 0) {
                result.push(['edit', val + inputPenalty, pattern, input])
            }

            var val = _levenshtein.custom3DDistance(input, pattern, (c1, c2) => c1 == c2, (c1, c2) => 1);
            if (val[0] > 0) {
                result.push(['edit2', val[0] + inputPenalty, pattern, input])
            }
            var trans = _trans.transpositions(pattern, 1);
            for (var k = 0; k < trans.length; k++) {
                if (pattern != trans[k]) {
                    var val = _levenshtein.customDistance(input, trans[k], (c1, c2) => c1 == c2, (c1, c2) => 1)

                    if (val > 0) {
                        result.push(['transpositions', val + 1 + inputPenalty, pattern, input])
                    }
                }
            }
        }
    }
    return result;
}

module.exports = { detect, analyze, decide }