// First dummy "classifier"

function getLabel(sample, model) {
    // dimension 0 - dimension 1 - dimension 2 - dimension 3 - dimension 4 - dimension 5
    // 0,1,2,3,4,5,6,7,8,9,10

    // domain matches the protected domain
    if (sample[getMetric(0, 0)] == 1) {
        return 0
    }

    // small change could not be spotted by the user
    if (sample[getMetric(3, 0)] > 0 && sample[getMetric(3, 0)] < 3) {
        return 1
    }

    
    var domain_up = sample[getMetric(5, 5)]
    if (domain_up != null && domain_up > 1) { return 1 } // consider domains where first-level domain is somewhere else as unsafe

    // big change should be spotted by the user
    if (sample[getMetric(3, 0)] > 4) {
        return 0
    }

    return -1 // unknown
}

function getMetric(metric, dimension) {
    var c = dimension * 11 + metric
    return c
}

module.exports = { getLabel }