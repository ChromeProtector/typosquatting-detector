// classifier based on libsvm-js

const SVM = require('../node_modules/libsvm-js/asm');

function createSVM() {
    const svm = new SVM({
        kernel: SVM.KERNEL_TYPES.RBF, // The type of kernel I want to use
        type: SVM.SVM_TYPES.C_SVC,    // The type of SVM I want to run
        gamma: 1,                     // RBF kernel gamma parameter
        cost: 1,                       // C_SVC cost parameter
        quiet: true
    })

    return svm
}

function train(vectors, labels) {
    var svm = createSVM()
    svm.train(vectors, labels)

    return svm.serializeModel()
}

function getLabel(metrics_vectors, model) {
    var svm = SVM.load(model)

    for (var i = 0; i < metrics_vectors.length; i++) {
        var vector = metrics_vectors[i]
        const predictedLabel = svm.predictOne(vector)
        if (predictedLabel == 1) {
            return 1
        }
    }

    return 0
}

module.exports = { getLabel, train, createSVM }