const _classifier1 = require('./classification/1_dummy')
const _classifier2 = require('./classification/2_svm')

var getLabel = function (metrics_vectors, algorithm, model) {
    if (algorithm == 1) {
        return _classifier1.getLabel(metrics_vectors, model)
    }
    if (algorithm == 2) {
        return _classifier2.getLabel(metrics_vectors, model)
    }
    return -1
}

module.exports = { getLabel }