const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes.js');

//customize yargs version
yargs.version('1.1.0');

//create commands (try node app.js --help)
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

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Removing a note...');
    }
});

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: function() {
        console.log('Listing out all notes...');
    }
});

yargs.command({
    command: 'read',
    describe: 'Print a note',
    handler: function() {
        console.log('Reading a note...');
    }
});

yargs.parse();