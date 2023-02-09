const _metric1 = require('./metrics/0_match_text')
const _metric2 = require('./metrics/1_match_length')
const _metric3 = require('./metrics/2_idn')
const _metric4 = require('./metrics/3_exact_levenshein')
const _metric5 = require('./metrics/4_samelook_levenshein')
const _metric6 = require('./metrics/5_exact_bitap')
const _metric7 = require('./metrics/6_samelook_bitap')
const _metric8 = require('./metrics/7_has_weird_port')
const _metric9 = require('./metrics/8_transpositions_k_2_levenshein')
const _metric10 = require('./metrics/9_length')
const _metric11 = require('./metrics/10_substing')

const _metrics = [_metric1, _metric2, _metric3, _metric4, _metric5, _metric6, _metric7, _metric8, _metric9, _metric10, _metric11]

const _dim1 = require('./metrics/dimensions/0_raw_domain')
const _dim2 = require('./metrics/dimensions/1_tld')
const _dim3 = require('./metrics/dimensions/2_second_level_domain')
const _dim4 = require('./metrics/dimensions/3_without_dots')
const _dim5 = require('./metrics/dimensions/4_filtered_domain')
const _dim6 = require('./metrics/dimensions/5_third_and_up')

const _dimensions = [_dim1, _dim2, _dim3, _dim4, _dim5, _dim6]

function getMetrics(url, protectedDomains) {
    var results = new Array(protectedDomains.length)
    for (var i = 0; i < protectedDomains.length; i++) {
        results[i] = get(url, protectedDomains[i])
    }
    return results
}

function getDimensions(url) {
    var results = new Array(_dimensions.length)

    for (var i = 0; i < _dimensions.length; i++) 
    {
        results[i] = _dimensions[i].getDimension(url)
    }
    return results
}

function get(url, protectedDomain) {
    var dimensions = getDimensions(url, protectedDomain)
    var vector = new Array(dimensions.length * _metrics.length)

    var m = _metrics.length;

    for (var i = 0; i < dimensions.length; i++)
    {
        var dimension = dimensions[i]
        for (var j = 0; j < m; j++) {
            vector[m * i + j] = _metrics[j].getValue(dimension, protectedDomain)
        }
    }

    return vector
}

module.exports = { getMetrics }