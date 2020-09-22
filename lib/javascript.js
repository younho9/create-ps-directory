const solutionTemplate = `function solution(input) {
    let answer = '';
    return answer;
}
`;

const testTemplate = (title, username, count) =>
  `const solution = require('./${username}');\n\n` +
  `describe('${title}', () => {` +
  Array.from({ length: count }, (_, i) => testCaseTemplate(i + 1)).join('') +
  `\n});
`;

const testCaseTemplate = (number) => `
    it('test ${number}', () => {
        const input = '';
        const result = '';
        expect(solution(input)).toEqual(result);
    });`;

const javascript = {
  fileExt: 'js',
  testExt: 'test.js',
  solution: solutionTemplate,
  test: testTemplate,
};

module.exports = javascript;
