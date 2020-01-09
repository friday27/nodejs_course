# Node.js Development

[The Complete Node.js Developer Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/)

### TODOs
* To review
    * 30. Call Stack, Callback Queue and Event Loop

### Node.js/JS
* import module
    
        const fs = require('fs');
        require('./utils.js');  //load local file

* write/append data into a file
    
        fs.writeFileSync(filename, '...');
        fs.appendFileSync(filename, '...more...');

* export the var (It can be shared across files and be used by `const name = require('filename.js')`)
    
        module.exports = varName;
        module.exports = funcName;

        //exports more than 1 func
        module.exports = {
            getNotes: getNotes,
            addNote: addNote
        };

* Get input from user

        process.argv //returns an array of arguments

        //parse the return of process.argv
        const yargs = require('yargs');
        //parse arguments according to the provided config
        yargs.parse();

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

* JSON

        //convert JS object into JSON string
        const bookJSON = JSON.stringify(objName);
        fs.writeFileSync(JSONfilename, bookJSON);

        //convert string into JSON data
        const dataBuffer = fs.readFileSync(JSONfilename);
        const data = JSON.parse(dataBuffer);

* Array filter
    
        const duplicateNotes = notes.filter(function (note) {
            return note.title === title
        });

* Arrow function

        //original function
        const square = function (n) {
            return n * n;
        };

        //arrow function
        const square = (n) => {
            return n * n;
        };

        //simpler
        const square = (n) => n * n;

* Debugging
    1. Set `debugger;` in the script
    2. Run script with inspect `node inspect app.js --title="aaa" --body="bbb"`
    3. Open chrome://inspect and you could test in the dev tool

* Make HTTP request

        const request = require('request');

        const url = '...';

        request({ url: url }, (error, response) => {
            const data = JSON.parse(response.body);
            console.log(data.);
        });

### npm
* Initialization

        npm init

* Install package

        npm install name
        npm i name@version

        //check package-lock.json and install needed packages
        npm install

### nodemon
nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

        //install nodemon
        npm install nodemon -g

        //run script
        nodemon app.js

### Reference
* [Course Repo](https://links.mead.io/nodecourse)
* [Node.js Doc](https://nodejs.org)