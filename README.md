# Create PS Directory

This is a CLI tool that lets you quickly create a problem solving directory.

## Installation

```bash
npm i -g create-ps-directory
```

## Language Support

| Language   | Solution | Testing |
| ---------- | -------- | ------- |
| javascript | ✅       | ✅      |
| python     | ✅       | ❌      |

## Usage

```bash
create-ps-directory
```

### Example

```bash
? Please enter the path where the "problem-solving directory" will be located. ex) problems/programmers
> problems/programmers

? Please enter the title for the problem. ex) 42576-an-uncompleted-player
> problem

? Please enter a username
> younho9

? Please select a language.
> javascript

? How many test cases do you need?
> 5
```

### Directory

```bash
problems
  └── programmers
    └── problem
      ├── younho9.js
      └── younho9.test.js
```

#### younho9.js

```javascript
function solution(input) {
    let answer = "";
    return answer;
}
```

#### younho9.test.js

```javascript
const solution = require("./younho9");

describe("problem", () => {
    it("test 1", () => {
        const input = "";
        const result = "";
        expect(solution(input)).toEqual(result);
    });
    // repeat as test case
});
```

## License

MIT © younho9
