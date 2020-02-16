//CRUD operations practice

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
    db.collection('users').insertOne({
        name: 'Lily',
        age: 13
    });
});