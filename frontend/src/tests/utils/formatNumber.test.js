import formatNumber from '../../utils/formatNumber';

test('format 7 letters number', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
})

test('format 6 letters number', () => {
    expect(formatNumber(123334)).toBe('123,334');
})

test('format 5 letters number', () => {
    expect(formatNumber(12345)).toBe('12,345');
})

test('format 4 letters number', () => {
    expect(formatNumber(1234)).toBe('1,234');
})

