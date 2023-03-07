const { decide, decideExt} = require('./typosquatting')
const { exactBitap, customBitap } = require('./bitap')
const { distance, customDistance, custom3DDistance } = require('./levenshtein')
const { compare, limit  } = require('./look')
const { decode, encode  } = require('./punycode')
const { detectIdn, getDomain, getTLD, getDomainParts } = require('./url')
const { transpositions, swap  } = require('./word')
const { getMetrics } = require('./typosquatting-metrics')
const { getLabel } = require('./typosquatting-classification')

module.exports = { transpositions, swap, getLabel, getMetrics, detectIdn, getDomain, getTLD, getDomainParts, decode, encode, compare, limit, decide, decideExt, exactBitap, customBitap, distance, customDistance, custom3DDistance }