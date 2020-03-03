# [MongoDB](https://docs.mongodb.com/) and [Mongoose](https://mongoosejs.com/)

## MongoDB

* SQL v.s NoSQL terms

        +------------+------------+
        | Table      | Collection |
        +------------+------------+
        | Row/Record | Document   |
        +------------+------------+
        | Column     | Field      |
        +------------+------------+

* Install [mongodb module](https://mongodb.github.io/node-mongodb-native/2.0/api/index.html) for Node.js

        npm i mongodb

* Start MongoDB

        mongodb/bin/mongod --dbpath=... --port=...

* [MongoDB GUI Viewer - Robo 3T](https://robomongo.org/download): Use JavaScript to manipulate MongoDB data

        db.version()

### CRUD operations (mongodb.js)

        const mongodb = require('mongodb');
        const MongoClient = mongodb.MongoClient;

        const connectionURL = 'mongodb://127.0.0.1:port';
        const databaseName = 'task-manager';

        MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
            if (error) {
                return console.log('Unable to connect to database!');
            }

            //MongoDB will create the db if not exists
            const db = client.db(databaseName); 

            //CRUD operations...
        });

#### [insertOne](https://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#insertOne) and insertMany

        db.collection('users').insertOne({
            name: 'Lily',
            age: 13
        });

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

#### findOne and find

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

#### [updateOne and updateMany](https://docs.mongodb.com/manual/reference/operator/update/)

        //updateOne returns a promise if no callback passed
        db.collection('users').updateOne({
            _id: new ObjectID('5e4942f6e5b9e0531775390b')
        }, {
            $inc: { //MongoDB update operator
                age: -5
            }
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });

        db.collection('tasks').updateMany({
            completed: true
        }, {
            $set: {
                completed: false
            }
        }).then((result) => {
            console.log(result.modifiedCount);
        }).catch((error) => {
            console.log(error);
        });

#### [deleteOne and deleteMany]

        db.collection('users').deleteOne({
            name: 'Lily'
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });

        db.collection('users').deleteMany({
            age: 30
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });

-----

## [Mongoose](https://mongoosejs.com/)

        //mongoose uses mongodb module
        const mongoose = require('mongoose');

        //provide the db name as part of the connection URL
        mongoose.connect('mongodb://127.0.0.1:27018/task-manager-api', {
            useNewUrlParser: true,
            useCreateIndex: true
        });

        //create and User model
        // {'name for your model', {definition}}
        // Mongoose provides a basic type validation
        const User = mongoose.model('User', {
            name: {
                type: String
            },
            age: {
                type: Number
            }
        });

        //model instance
        const me = new User({
            name: 'Andrew Ng', 
            age: 27
        });

        //save the instance to the db (return a promise)
        me.save().then(() => {
            console.log(me);
        }).catch((error) => {
            console.log('Error!', error);
        });

## [Data validation and sanitization](https://mongoosejs.com/docs/schematypes.html)

        const User = mongoose.model('User', {
            name: {
                type: String,
                required: true,
                trim: true
            },
            age: {
                type: Number,
                default: 0,
                //custom validator for a field
                validate(value) { //value -> the input of age
                    if (value < 0) {
                        throw new Error('Age must be a postive number!');
                    }
                }
            },
            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                validate(value) {
                    //use validator module
                    if (!validator.isEmail(value)) {
                        throw new Error('Email is invalid.');
                    }
                }
            },
            password: {
                type: String,
                required: true,
                minlength: 7,
                trim: true,
                validate(value) {
                    if (value.toLowerCase().includes('password')) {
                        throw new Error('Do not use "password" in password.');
                    }
                }
            }
        });

## Sorting, Pagination, and Filtering

sorting, filtering, and pagination are advanced techniques for fetching data, which keep applications fast, as they don’t need to fetch unnecessary data.

### Using timestamp

Simply set timestamps option of schema to true:

    const userSchema = new mongoose.Schema({
        // ...
    }, {
        timestamps: true
    });
