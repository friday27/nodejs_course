# Testing Node.js

The Most 2 Popular Testing Frameworks: [Jest](jestjs.io) (We are going to use Jest in this course) and [Mocha](mochajs.org).

## Set Up

1. `npm i jest --save-dev`

2. Add jest command into package.json

       "scripts": {
         // ...
         "test": "jest --watch"
       },

3. Run test by `npm test`

## Create Test Suites

Jest provides some function as global in all test suites:

* test('Test case description', function)
* [expect()](https://jestjs.io/docs/en/expect)

Create test suites in tests/test-name.test.js

    test('Should calculate total with default tip', () => {
        const total = calTip(10);
        expect(total).toBe(12); // assertion
    });

## Testing Asynchronous Code Using async/await

    test('Should add 2 numbers async/await', async () => {
        const sum = await add(10, 17);
        expect(sum).toBe(27);
    });
