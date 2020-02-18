//CRUD operations practice

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

//destructure!
const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27018';
const databaseName = 'task-manager';

// //generate a new ID
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }
    const db = client.db(databaseName); 

    // //findOne
    // db.collection('users').findOne({name: 'Jane'}, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to fetch.');
    //     }
    //     console.log(result); //return null if no result
    // });

    // //find returns a cursor
    // db.collection('users').find({name: 'Lily'}).toArray((error, result) => {
    //     console.log(result);
    // });

    db.collection('tasks').findOne({_id: new ObjectID('5e4bb3d487b1226d59221fdd')}, (error, result) => {
        console.log(result);
    });

    db.collection('tasks').find({completed: false}).toArray((error, result) => {
        console.log(result);
    });
});

