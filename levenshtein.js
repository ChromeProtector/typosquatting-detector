var distance = function (word1, word2) {
    var defaultWeight = (c1, c2) => 1;
    var defaultEqual = (c1, c2) => c1 == c2;

    return customDistance(word1, word2, defaultEqual, defaultWeight);
}

var customDistance = function (word1, word2, isEqual, weightFunction) {
    var d = new Array(word1.length + 1);

    for (var i = 0; i < d.length; i++) {
        d[i] = new Array(word2.length + 1);
    }

    for (var j = 0; j <= word2.length; j++) {
        d[0][j] = j;
    }

    for (var i = 0; i <= word1.length; i++) {
        d[i][0] = i;
    }

    for (var i = 1; i <= word1.length; i++) {
        for (var j = 1; j <= word2.length; j++) {
            var compareResult = isEqual(word1[i - 1], word2[j - 1]);
            if (compareResult) {
                d[i][j] = d[i - 1][j - 1];
            }
            else {
                d[i][j] = weightFunction(word1[i - 1], word2[j - 1]) + Math.min(d[i - 1][j], Math.min(d[i][j - 1], d[i - 1][j - 1]));
            }
        }
    }

    return d[word1.length][word2.length];
}

// not so fast fuzzy search using above algorithm (will be improved)
var custom3DDistance = function (textToSearch, pattern, isEqual, weightFunction) {
    var n_org = textToSearch.length;
    var m = pattern.length;

    var d = new Array(n_org);

    for (var k = 0; k < n_org; k++) {
        var text = textToSearch.slice(k)

        var n = n_org - k;

        d[k] = new Array(m + 1);

        for (var j = 0; j <= m; j++) {
            d[k][j] = new Array(n + 1);
        }

        for (var i = 0; i <= n; i++) {
            d[k][0][i] = i;
        }

        for (var j = 0; j <= m; j++) {
            d[k][j][0] = j;
        }

        for (var j = 1; j <= m; j++) {
            for (var i = 1; i <= n; i++) {
                var compareResult = isEqual(pattern[j - 1], text[i - 1])
                if (compareResult) {
                    var tmp = d[k][j - 1][i - 1];
                    d[k][j][i] = tmp;

                    // some opt.
                    if (tmp == 0 && j == m) {
                        return [tmp, k, i + k - 1]
                    }
                }
                else {
                    d[k][j][i] = weightFunction(text[i - 1], pattern[j - 1]) + Math.min(d[k][j - 1][i], Math.min(d[k][j][i - 1], d[k][j - 1][i - 1]));
                }
            }
        }
    }

    var computedDistance = -1;
    var pattern_start = -1;
    var pattern_end = -1;

    for (var k = 0; k < n_org; k++) {
        for (var l = 0; l <= n_org - k; l++) {
            var tmp = d[k][m][l]

            if (tmp <= computedDistance || computedDistance == -1) {
                computedDistance = tmp;
                pattern_start = k;
                pattern_end = l - 1 + k;
            }
        }
    }
    return [computedDistance, pattern_start, pattern_end];
}

module.exports = { distance, customDistance, custom3DDistance };