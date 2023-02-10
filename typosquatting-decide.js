const _decide_1 = require('./deciders/1_dummy')
const _decide_2 = require('./deciders/2_libsvm-js')

var getCategory = function (metrics_vectors, algorithm, model) {
    if (algorithm == 1) {
        return _decide_1.decide(metrics_vectors, model)
    }
    if (algorithm == 2) {
        return _decide_2.decide(metrics_vectors, model)
    }
    return -1
}

module.exports = { getCategory }