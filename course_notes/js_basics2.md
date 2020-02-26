# JavaScript Basics 2

#### Import module
    
        const fs = require('fs');
        require('./utils.js');  //load local file

#### Write/append data into a file
    
        fs.writeFileSync(filename, '...');
        fs.appendFileSync(filename, '...more...');

#### Export the var (It can be shared across files and be used by `const name = require('filename.js')`)
    
        module.exports = varName;
        module.exports = funcName;

        //exports more than 1 func
        module.exports = {
            getNotes: getNotes,
            addNote: addNote
        };

#### Parse arguments
1. process

        process.argv //returns an array of arguments
        const address = process.argv[2];

2. yargs

        //parse the return of process.argv
        const yargs = require('yargs');
        //parse arguments according to the provided config
        yargs.parse();

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

        yargs.parse();

#### JSON [playground](playground/1-json.js)

* convert JS object into JSON string

        const bookJSON = JSON.stringify(objName);
        fs.writeFileSync(JSONfilename, bookJSON);

* convert string into JSON data

        const dataBuffer = fs.readFileSync(JSONfilename);
        const data = JSON.parse(dataBuffer);

#### Array filter
    
        const duplicateNotes = notes.filter(function (note) {
            return note.title === title
        });

#### Arrow function [playground1](playground/2-arror-function.js) [playground2](playground/3-arrow-challenge.js)

* original function

        const square = function (n) {
            return n * n;
        };

* arrow function

        const square = (n) => {
            return n * n;
        };

* simpler

        const square = (n) => n * n;

#### Callback [playground](playground/4-callack.js)

#### ES6 objects [playground](playground/5-es6-objects.js)
* Shorthand syntax
* Object destructuring

#### Raw HTTP [playground](playground/6-raw-http.js)

#### Default parameter [playground](playground/7-default-param.js)

#### Promises [playground](playground/8-promises.js)

#### Debugging

    1. Set `debugger;` in the script
    2. Run script with inspect `node inspect app.js --title="aaa" --body="bbb"`
    3. Open chrome://inspect and you could test in the dev tool

#### Make HTTP request

        const request = require('request');

        const url = '...';

        request({ url: url }, (error, response) => {
            const data = JSON.parse(response.body);
            console.log(data.);
        });

#### Promise Chaining = return + multiple then()

        User.findByIdAndUpdate('5e4e32885e800c75faab5548', {age: 1}).then((user) => {
            console.log(user);
            return User.countDocuments({age: 1});
        }).then((result) => {
            console.log(result);
        }).catch((e) => {
            console.log(e);
        });

#### Async Function and Await Operator [playground](../playground/9-async-await.js)
* async functions always return a promise, which is fulfilled with the value you choose to return from the function.
* pro: having values in the same scope (more flexible)

        const doWork = async () => {
            const sum = await add(1, 99);
            const sum2 = await add(sum, 50);
            const sum3 = await add(sum2, -3);
            return sum3;
        };
