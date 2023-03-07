// classifier based on libsvm-js

const SVM = require('libsvm-js/asm');

function createSVM() {
    const svm = new SVM({
        kernel: SVM.KERNEL_TYPES.RBF, // The type of kernel I want to use
        type: SVM.SVM_TYPES.C_SVC,    // The type of SVM I want to run
        cost: 3,                      // C_SVC cost parameter
        quiet: true
    })
    return svm
}

function train(samples, labels) {
    var svm = createSVM()
    svm.train(samples, labels)
    return svm.serializeModel()
}

function getLabel(sample, model) {
    var svm = SVM.load(model)
    return svm.predictOne(sample)
}

module.exports = { getLabel, train, createSVM }