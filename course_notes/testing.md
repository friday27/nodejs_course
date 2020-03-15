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

### Test Asynchronous Code Using async/await

    test('Should add 2 numbers async/await', async () => {
        const sum = await add(10, 17);
        expect(sum).toBe(27);
    });

## Test an Expression Application

### Create a test environment

config/test.env (to prevent the test cases from messing with development data)

    MONGODB_URL=mongodb://localhost:port/app-name-test

package.json

    "scripts": {
      // --runInBand makes sure to run test suites in series to prevent conflicts
      "test": "env-cmd -f ./config/test.env jest --watch --runInBand"
    },
    "jest": { // jest configuration
      "testEnvironment": "node"
    },

## Test with supertest library

1. Restructure index.js and app.js (newly created) so we can test the server without starting (app.listen) it.

       // index.js
       const app = require('./app');
       const port = process.env.PORT;

       app.listen(port, () => {
         console.log('Server is up! on port ' + port);
       });


       // app.js
       const express = require('express');
       require('./db/mongoose');
       const userRouter = require('./routers/user');
       const taskRouter = require('./routers/task');

       const app = express();

       app.use(express.json()); 
       app.use(userRouter);
       app.use(taskRouter);

       module.exports = app;

2. Install the module `npm i supertest`
3. Create neccessary files and folders:

    * Mocking libraried - tests/__mocks__/@sendgrid/mails.js
    * Database config - tests/fixtures/db.js
    * Images for testing - tests/fixtures/profile-pic.jpg

4. Create test cases ([example: user.test.js](../task-manager/tests/user.test.js))

### Seeding Database

Jest provides lifecycle functions that you can use to configure your test suite. There are 4:

1. beforeEach - Run some code before each test case
2. afterEach - Run some code after each test case
3. before - Run some code once before the tests run
4. after - Run some code once after the tests run

## Mocking Library

Take `require('@sendgrid/mail');` for example.
To mock this module, create a file `tests/__mocks__/@sengrid/mail.js` so this can prevent sending emails while testing.
