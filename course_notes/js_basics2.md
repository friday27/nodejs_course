# JavaScript Basics 2

## Import module

    const fs = require('fs');
    require('./utils.js');  //load local file

## File I/O

    //need to load fs module first
    fs.writeFileSync(filename, '...');
    fs.appendFileSync(filename, '...more...');

## Export the var to let it can be shared across files

    module.exports = varName;
    module.exports = funcName;

    //exports more than 1 func
    module.exports = {
      getNotes: getNotes,
      addNote: addNote
    };

## Parse arguments

1. process.argv: access the command line arguments

       console.log(process.argv); 
       //returns an array of arguments

       const address = process.argv[2];

2. Argument parsing with **yargs**

        const yargs = require('yargs');

        //customize yargs version
        yargs.version('1.1.0');

        //config example
        yargs.command({
          command: 'add',
          describe: 'Add a new note',
          builder: {
            title: {
              describe: 'Note title',
              demandOption: true, //default: false
              type: 'string' //default: boolean
            },
            body: {
              describe: 'Note content',
              demandOption: true,
              type: 'string'
            }
          },
          handler: function(argv) {
            console.log('Title: ' + argv.title);
            console.log('Content: ' + argv.body);
          }
        });

        yargs.parse(); //parse arguments according to the provided config

## JSON [playground](playground/1-json.js)

* JSON.stringify: convert JS object into string

      const book = {
        title: 'Game of Thrones',
        author: 'George R.R Martin',
      };
      
      // Covert JavaScript object into JSON string
      const bookJSON = JSON.stringify(objName);
      fs.writeFileSync(JSONfilename, bookJSON);

* JSON.parse: convert JSON string into object

      //read from a JSON file
      const dataBuffer = fs.readFileSync(JSONfilename);
      const data = JSON.parse(dataBuffer);

      //convert JSON string directly
      const bookObject = JSON.parse(bookJSON) 
      console.log(bookObject.title)

## Arrow function [playground1](playground/2-arror-function.js) [playground2](playground/3-arrow-challenge.js)

* Original function (ES5)

        const square = function (n) {
            return n * n;
        };

* Arrow function

        const square = (n) => {
            return n * n;
        };

  * Arrow functions don’t bind **this**, so they work well for everything except **methods**.

* Arrow function with shorthand syntax

        const square = (n) => n * n;

## Array methods

* Find

      const users = [{
        name: 'William',
        age: 32
      }, {
        name: 'Henry',
        age: 18      
      }, {
        name: 'Anne',
        age: 16
      }];

      const user = users.find((user) => user === 'Anne');

* Filter

      const duplicateNotes = notes.filter(function (note) {
        return note.title === title
      });

## Callback [playground](playground/4-callack.js)

## ES6 objects [playground](playground/5-es6-objects.js)

* Shorthand syntax
* Object destructuring

## Raw HTTP [playground](playground/6-raw-http.js)

## Default parameter [playground](playground/7-default-param.js)

## Promises [playground](playground/8-promises.js)

## Debugging

### 1. console.log

### 2. Node built-in debugger

1. Set `debugger;` (breakpoint) in the script
2. Run script with inspect `node inspect app.js`
3. Open chrome://inspect and you could test in the dev tool

## Asynchronous Node.js

      console.log('Starting');
      setTimeout(() => {
        console.log('2 Second Timer');
      }, 2000);
      console.log('Stopping');

      //Result:
      // Starting 
      // Stopping
      // 2 Second Timer

**setTimeout** is asynchronous and non-blocking. The setTimeout call doesn’t block Node.js from running other code while it’s waiting for the 2 seconds to pass.

This **asynchronous and non-blocking**å nature makes Node.js ideal for backend development. Your server can wait for data from a database while also processing an incoming HTTP request.

## Make HTTP requests

        const request = require('request');

        const url = '...';

        request({ url: url }, (error, response) => {
            const data = JSON.parse(response.body);
            console.log(data.);
        });

## Promise Chaining = return + multiple then()

        User.findByIdAndUpdate('5e4e32885e800c75faab5548', {age: 1}).then((user) => {
            console.log(user);
            return User.countDocuments({age: 1});
        }).then((result) => {
            console.log(result);
        }).catch((e) => {
            console.log(e);
        });

## Async Function and Await Operator [playground](../playground/9-async-await.js)

* async functions always return a promise, which is fulfilled with the value you choose to return from the function.
* pro: having values in the same scope (more flexible)

        const doWork = async () => {
            const sum = await add(1, 99);
            const sum2 = await add(sum, 50);
            const sum3 = await add(sum2, -3);
            return sum3;
        };
