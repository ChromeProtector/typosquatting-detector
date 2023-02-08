const _bitap = require('../bitap');

test('Is able to find match using bitap', () => {
  expect(_bitap.exactBitap("2google", "google")).toBe("google");
});

test('Is able to find match using custombitap', () => {
    expect(_bitap.customBitap("góogle", "google", (c1, c2) => {
        if (c1 == c2 ) return true;

        if (c1 == "ó" && c2 == "o" || c1 == "o" && c2 == "ó")
        {
            return true;
        }
        return false;
    })).toBe("góogle");
  });
  