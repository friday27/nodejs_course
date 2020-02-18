//CRUD (Create Read Update Delete) operations practice

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

    db.collection('tasks').deleteOne({
        description: 'PR'
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});

