const punyCode = require('../punycode');

test('Is able to decode punycode', () => {
    expect(punyCode.decode("Mnchen-3ya")).toBe("München");
    expect(punyCode.decode("abcdef-qua4k")).toBe("abæcdöef");
    expect(punyCode.decode("22cdfh1b8fsa")).toBe("ยจฆฟคฏข");
    expect(punyCode.decode("hq1bm8jm9l")).toBe("도메인");
});