import normalizeCamelCase from '../../utils/normalizeCamelCase';

test('normalizing camel case', () => {
    expect(normalizeCamelCase('totalCases')).toBe('Total Cases');
    console.log(normalizeCamelCase('totalCases'));
})