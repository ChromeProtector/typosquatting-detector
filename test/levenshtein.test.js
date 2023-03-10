const levenshtein = require('../lib/levenshtein')

test('Is able to compute distance between words using a levenshtein algorithm', () => {
    expect(levenshtein.distance("word1", "word")).toBe(1)
    expect(levenshtein.distance("2word1", "word")).toBe(2)
})


test('Is able to compute distance between words using 3D levenshtein algorithm', () => {
    // exact match
    expect(levenshtein.custom3DDistance("word", "word",  1, (c1, c2) => c1 == c2 ? 1 : 0, (c1, c2) => 0)).toEqual([0, 0, 3])
    expect(levenshtein.custom3DDistance("1word", "word", 1, (c1, c2) => c1 == c2 ? 1 : 0, (c1, c2) => 0)).toEqual([0, 1, 4])
    expect(levenshtein.custom3DDistance("12word", "word", 1, (c1, c2) => c1 == c2 ? 1 : 0, (c1, c2) => 0)).toEqual([0, 2, 5])
    expect(levenshtein.custom3DDistance("12word12", "word", 1, (c1, c2) => c1 == c2 ? 1 : 0, (c1, c2) => 0)).toEqual([0, 2, 5])
    
    // edit
    expect(levenshtein.custom3DDistance("12wor12", "word", 1, (c1, c2) => c1 == c2 ? 1 : 0, (c1, c2) => 0)).toEqual([1, 2, 5])
    expect(levenshtein.custom3DDistance("12or12", "word", 1, (c1, c2) => c1 == c2 ? 1 : 0, (c1, c2) => 0)).toEqual([2, 2, 4])
})