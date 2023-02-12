// First dummy "classifier"

function getLabel(sample, model) {

    // dimension 0 - dimension 1 - dimension 2 - dimension 3 - dimension 4 - dimension 5
    // 0,1,2,3,4,5,6,7,8,9,10,11

    // protected domain
    if (sample[getMetric(1, 0)] == 1) {
        return 0
    }

    var idn = sample[getMetric(2, 0)]
    if (idn == 1) { return 1 } // consider all idn as unsafe

    var domain_up = sample[getMetric(11, 5)]
    if (domain_up > 0) { return 1 } // consider domains where first-level domain is somewhere else as unsafe

    return 0
}

function getMetric(metric, dimension) {
    var c = dimension * 11 + metric - 1
    return c
}

module.exports = { getLabel }