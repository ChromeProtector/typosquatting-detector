const _decide_1 = require('./deciders/1_dummy')

var getCategory = function (metrics_vectors, algorithm) {
    if (algorithm == 1) {
        return _decide_1.decide(metrics_vectors)
    }
    return -1
}

module.exports = { getCategory }