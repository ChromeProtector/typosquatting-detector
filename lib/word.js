var transpositions = function (word, k) {
    var result = new Array();
    for (var i = 0; i < word.length; i++) {
        for (var j = 0; j < word.length; j++) {
            var tmp = (' ' + word).slice(1);
            if (Math.abs(j - i) == k && i != j) {
                tmp = swap(tmp, i, j)

                if (!result.includes(tmp)) {
                    result.push(tmp)
                }
            }
        }
    }
    return result;
}

function swap(word, i, j) {
    var result = "";
    for (var index = 0; index < word.length; index++) {
        if (index == i) {
            result += word[j];
        }
        else if (index == j) {
            result += word[i];
        }
        else {
            result += word[index];
        }
    }
    return result;
}

module.exports = { transpositions, swap }