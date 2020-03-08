# [MongoDB](https://docs.mongodb.com/) and [Mongoose](https://mongoosejs.com/)

## Set up and installation

* [Install MongoDB](https://www.mongodb.com/download-center/community)

  * Unzip, rename the folder to mongodb and move it to your home directory
  * You can also create a directory called mongodb-data/ to store the database data
  * Start MongoDB server by using `~/mongodb/bin/mongod --dbpath=~/mongodb-data --port=...`

* [Install Robo 3T](https://robomongo.org) (a MongoDB admin tool)

* Install MongoDB npm module `npm i mongodb`

* Check [MongoDB driver documentation](https://mongodb.github.io/node-mongodb-native/3.5/api/)

* Install Mongoose `npm i mongoose`

## MongoDB

### SQL v.s NoSQL terms

        +------------+------------+
        | Table      | Collection |
        +------------+------------+
        | Row/Record | Document   |
        +------------+------------+
        | Column     | Field      |
        +------------+------------+

### Connecting to MongoDB

    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient;

    // default port: 27017
    const connectionURL = 'mongodb://127.0.0.1:27017';
    const databaseName = 'database-name';

    MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
      if (error) {
        return console.log('Unable to connect to database!');
      }

      //MongoDB will create the db if not exists
      const db = client.db(databaseName); 

      // Start to interact with the database
    });

### Object IDs

MongoDB uses ObjectIDs to create unique identifiers for all the documents in the database.

An ObjectID is a GUID (Globally Unique Identifier). GUIDs are generated randomly via an algorithm to ensure uniqueness. These IDs can be generated on the server, but as seen in the snippet above, they can be generated on the client as well.

    //import ObjectID from mongodb module
    const {MongoClient, ObjectID} = require('mongodb');

    //generate a new ID
    const id = new ObjectID();
    console.log(id);
    console.log(id.getTimestamp());

### Inserting documents: [insertOne](https://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#insertOne) and [insertMany](https://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html#insertMany)

db.collection is used to get a reference to the collection you’re trying to manipulate.

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
      }], (error, result) => {
        if (error) {
          return console.log('Unable to insert documents!');
        }
          console.log(result.ops);
    });

### Querying documents: findOne and find

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

### Updating documents: updateOne and updateMany

The update calls require a second argument, which is an object where you define the updates you want to make. For this, you need to use one of the supported [update operators](https://docs.mongodb.com/manual/reference/operator/update/).

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

### Deleting documents: deleteOne and deleteMany

deleteOne is used to delete a single docuemnt, the first one with matched conditions.

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

Mongoose serves as a replacement for the native driver, providing you with a more object-oriented interface.

### Connecting to MongoDB using Mongoose

    const mongoose = require('mongoose');

    //provide the db name as part of the connection URL
    mongoose.connect('mongodb://127.0.0.1:port/database-name', {
        useNewUrlParser: true,
        useCreateIndex: true
    });

### Modeling your data

The core feature of Mongoose is the ability to model your data.

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

### Data validation and sanitization

Validation will allow you to restrict what data can be stored in the database, while sanitization will allow you to store user data in a uniform and standardized way.

You can find the list of options from the [schema documetation](https://mongoosejs.com/docs/schematypes.html).

    // Install and import validator library to achieve data validation efficiently
    const validator = require('validator');

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

### Mongoose static method v.s. instance method

**statics** are the methods defined on the Model. Use statics method when you want to search the whole collection. (e.g. find a matching email in User collection)

**methods** are defined on the document (instance). Use instance method when you want to narrow down to a specific target. (e.g. generate JWT for a user)

You cannot use statics method on an instance, vise versa.

-----

## Sorting, Pagination, and Filtering

sorting, filtering, and pagination are advanced techniques for fetching data, which keep applications fast, as they don’t need to fetch unnecessary data.

### Using timestamp

Simply set timestamps option of schema to true:

    const userSchema = new mongoose.Schema({
        // ...
    }, {
        timestamps: true
    });

### Fetching Data

* Filtering Data: Use **match** property of populate() to filter data

* Paginating Data: Data pagination is configured using limit and skip. **skip** represents the number of records (not pages) you are going to skip.

* Sorting Data: The options object used for pagination can also be used for sorting. A sort property should be set, which is an object containing key/value pairs. The key is the field to sort. The value is 1 for ascending and -1 for descending sorting.

src/routers/task.js

    // GET /tasks?completed=false&limit=10&skip=2&sortBy=createdAt:desc
    router.get('/tasks', auth, async (req, res) => {
      const match = {}; // empty object
      const sort = {};

      if (req.query.completed) {
        match.completed = req.query.completed === 'true';
      }

      if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      }

      try {
        await req.user.populate({
          path: 'tasks',
          match, //shorthand
          options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort // 1: asc, -1: desc
          }
        }).execPopulate();
        res.send(req.user.tasks);
      } catch (e) {
        res.status(500).send(e);
      }
    });

-----

## File Uploads

Use npm library **multer** for file uploading.

    const multer = require('multer');

    const upload = multer({
        dest: 'avatars', // from the project root dir
        limits: {
            fileSize: 1000000 //1MB 
        },
        fileFilter(req, file, cb) {
            // Examine if the file format using regex
            // cb: call back function
            if (!file.originalname.match('\.(jpg|jpeg|png)$')) {
                return cb(new Error('Please upload an image (jpg, jpeg or png).'));
            }
            cb(undefined, true);
        }
    });

    router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
        res.send();
    });

* Use [regex101](https://regex101.com/) to test regular expression

### Adding images to user profile

1. Add authentication
2. Add avatar property to user model. The Buffer type should be used when storing binary data, which is exactly the type of data that multer provides.

       const userSchema = new mongoose.Schema({
         // ...some code
         , avatar: {
           type: Buffer
         }
       };

3. Save the image to database

       const upload = multer({
          // Hide this line so the image will be passed to the function inside router (req.file.buffer)
          // dest: 'avatars', // from the project root dir
          // ...some code...
        });

        router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
          req.user.avatar = req.file.buffer;
          await req.user.save();
          res.send();
        }, (error, req, res, next) => { 
          // Express error handling
          res.status(400).send({error: error.message});
        });

### Serving up files

Serving up the user avatars will require two pieces of data from the server. The first is the image data, and the second is the header.

    router.get('/users/:id/avatar', async (req, res) => {
      try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
          throw new Error();
        }

        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
      } catch (e) {
        res.status(404).send(e);
      }
    });

### Auto-Cropping and Image Formatting (Using sharp library)

    router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
        // resize all uploads to 250 by 250 pixels
        // convert all images to portable network graphics (png)
        const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
        
        req.user.avatar = buffer;
        await req.user.save();
        res.send();
    }, (error, req, res, next) => { 
        // Express error handling
        res.status(400).send({error: error.message});
    });
