# Note

### TODOs
* Learn how to write unit tests for the practical tasks
* How to use web socket
* [Learn GraphQL](https://www.udemy.com/course/graphql-bootcamp/)
* Knwoledge of web servers (Apache, Nginx)

* Create RESTfull APIs
* Make and distribute some packages/libraries
* Learn a search engine (Solr, ElasticSearch)
* How to user docker


### Cores
* Node.js
* NPM, Node.js Package Manager
* Nodemon
* Express

* MongoDB

* Angular


### Before you start...
* Install NPM, NodeJS Package Manager
    * Use npm to install NodeJS modules

            npm init -y


### app.js
* Require needed packages

        // Require needed packages
        const yargs = require('yargs');
        const notes = require('./notes.js');

* Parsing arguments
1. process

        const address = process.argv[2];

2. yargs

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
            handler(argv) {
                notes.addNote(argv.title, argv.body);
            }
        });

        yargs.parse();

* Express web framework

        const express = require('express');

        // Create an Express application
        const app = express();

        // We can send back string, html and JSON
        app.get('', (req, res) => {
            res.send('<h1>Express</h1>');
        });

        // Express will automatically convert object to JSON
        app.get('/help', (req, res) => {
            res.send([{
                name: 'Andrew',
                age: 18
            }, {
                name: 'Tom'
            }]);
        });

        // Start the server
        // Access the app in browser by http://localhost:3000/
        app.listen(3000, () => {
            console.log('Server is up on port 3000.');
        });


### utils.js
* Export functions

        module.exports = add;
        module.exports = {
            getNotes: getNotes,
            addNote: addNote
        };

* Make HTTP request

        const request = require('request');
        const url = '...';
        request({ url: url }, (error, response) => {
            const data = JSON.parse(response.body);
            console.log(data.);
        });


### [MongoDB](https://docs.mongodb.com/)
* SQL v.s NoSQL terms

        +------------+------------+
        | Table      | Collection |
        +------------+------------+
        | Row/Record | Document   |
        +------------+------------+
        | Column     | Field      |
        +------------+------------+

* Start MongoDB

        mongodb/bin/mongod --dbpath=... --port=...

* [MongoDB GUI Viewer - Robo 3T](https://robomongo.org/download): Use JavaScript to manipulate MongoDB data

        db.version()


* Install [mongodb module](https://mongodb.github.io/node-mongodb-native/2.0/api/index.html) for Node.js

        npm i mongodb

#### CRUD operations (mongodb.js)

        const mongodb = require('mongodb');
            const MongoClient = mongodb.MongoClient;

            const connectionURL = 'mongodb://127.0.0.1:27018';
            const databaseName = 'task-manager';

            MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
                if (error) {
                    return console.log('Unable to connect to database!');
                }

                //MongoDB will create the db if not exists
                const db = client.db(databaseName); 

                //CRUD operations...
        });

* [insertOne](https://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#insertOne)

        db.collection('users').insertOne({
            name: 'Lily',
            age: 13
        });

* insertMany

        db.collection('users').insertMany([
            {
                name: 'Jane',
                age: 28
            }, {
                name: 'Ross',
                age: 27
            }
        ], (error, result) => {
            if (error) {
                return console.log('Unable to insert documents!');
            }
            console.log(result.ops);
        });

* ObjectID

        //import ObjectID from mongodb module
        const {MongoClient, ObjectID} = require('mongodb');

        //generate a new ID
        const id = new ObjectID();
        console.log(id);
        console.log(id.getTimestamp());

* findOne and find

        db.collection('tasks').findOne({_id: new ObjectID('5e4bb3d487b1226d59221fdd')}, (error, result) => {
            console.log(result);
        });

        //find returns a cursor
        db.collection('users').find({name: 'Lily'}).toArray((error, result) => {
            console.log(result);
        });

        //replace toArray with count to get the length
        db.collection('users').find({name: 'Lily'}).count((error, result) => {
            console.log(result);
        });



