# Testing Node.js

The Most 2 Popular Testing Frameworks: [Jest](jestjs.io) (We are going to use Jest in this course) and [Mocha](mochajs.org).

## Set Up

1. `npm i jest --save-dev`

2. Add jest command into package.json

       "scripts": {
         // ...
         "test": "jest"
       },

3. Run test by `npm test`

## Create Test Suites

Create tests/test-name.test.js

    test('Test Suite Name', () => {
        // test function
    });

    test('2nd Test Suite', () => {
        // ...
    });

Jest provides the function named test as global in all test suites.
