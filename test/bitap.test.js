const _bitap = require('../lib/bitap')

test('Is able to find match using bitap', () => {
    expect(_bitap.exactBitap("2google", "google")).toBe("google")
})

test('Is able to find match using custombitap', () => {
    expect(_bitap.customBitap("góogle", "google", 1.0, (c1, c2) => {
        if (c1 == c2) return 1.0

        if (c1 == "ó" && c2 == "o" || c1 == "o" && c2 == "ó") {
            return 1.0
        }
        return 0
    })).toEqual(["góogle", 6])

    expect(_bitap.customBitap("1111góogle1111", "google", 1.0, (c1, c2) => {
        if (c1 == c2) return 1.0

        if (c1 == "ó" && c2 == "o" || c1 == "o" && c2 == "ó") {
            return 1.0
        }
        return 0
    })).toEqual(["góogle", 6])

    expect(_bitap.customBitap("1111góogle1111", "google", 0.1, (c1, c2) => {
        if (c1 == c2) return 1.0

        if (c1 == "ó" && c2 == "o" || c1 == "o" && c2 == "ó") {
            return 0.1
        }
        return 0
    })).toEqual(["góogle", 5.1])
})
