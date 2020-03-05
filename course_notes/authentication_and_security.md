# API Authentication and Security

## Hashing Passwords

bcrypt.hash('password', times);

    const bcrypt = require('bcryptjs');

    const password = 'red12345!';
    const hashedPassword = await bcrypt.hash(password, 8); 
    //8 means to execute the hash function for 8 times

    // The compare method is used to compare a plain text password against a previously hashed password.
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log(isMatch);

## Use [Mongoose Middleware](https://mongoosejs.com/docs/middleware.html) to Hash Passwords

Middleware allows you to register some code to run before or after a lifecycle event for your model.

* Without middleware: new request -> run route handler
* With middleware: new request -> do something -> run route handler

      userSchema.pre('save', sync function(next) => {
        const user = this;
        // this -> the document to be saved

        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8);
        }

        next();
        // next() is called to signal to Express that the middleware function is done.
      });

## Use Mongoose Middleware to Validate User Login

src/models/user.js (define validation function)

    userSchema.statics.findByCredentials = async (email, password) => {
      const user = await User.findOne({email});
        
      if (!user) {
        throw new Error('Unable to login.');
      }

      const isMatch = await bcrypt.compare(password, user.password);
        
      if (!isMatch) {
        throw new Error('Unable to login.');
      }

      return user;
    };

src/routers/user.js

    router.post('/users/login', async (req, res) => {
      try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user);
      } catch (e) {
        res.status(400).send();
      }
    });

## JWTs (JSON Web Tokens)

[Example code](../task-manager/src/middleware/auth.js)

* JWTs provide a system for issuing and validating authentication tokens.

* The authentication token will ensure that the client doesn’t need to log in every time they want to perform an operation on the server.

* Authentication tokens (stored in the database) provides a way for users to log out. If a user logs out, that token will be removed from the user profile. A token would only be considered valid if it’s a valid JWT and it’s still stored as part of the user profile.

* Install the module `npm i jsonwebtoken`

* The **sign** method can be used to generate a new token.

      const token = jwt.sign({ _id: 'abc123' }, 'a secret phrase', { expiresIn: '7 days' });

  * It takes 3 arguments to generate new token:
    1. The unique data to embed in this token
    2. Secret phrase
    3. A set of options

* The server can verify the token using **verify**.

      const data = jwt.verify(token, 'thisismynewcourse');

  * It requires 2 arguments:
    1. The token to be verified
    2. The secret phrase

* Adding tokens array to User model

      const userSchema = new Mongoose.Model('user', {
          // ...
          , tokens: [{
              token: {
                  type: String,
                  require: true
              }
          }]
      });

* Generating JWT

      /*
      * Below lines assign a function to the "methods" object of userSchema,
      * which actually creates an instance method
      *
      * Do not declare methods using ES6 arrow functions (=>),
      * since arrow function doesn't bind 'this'
      */

      userSchema.methods.generateAuthToken = async function () {
        const user = this;
        const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse');
        user.tokens = user.tokens.concat({token});
        await user.save();
        return token;
      }

      // generateAuthToken() can then be called to generate a fresh authentication token when users sign up or log in.
      const token = await user.generateAuthToken()

## [Express Middleware](http://expressjs.com/th/guide/using-middleware.html)

* Express middleware is nothing more than a function that runs as Express handles a given request. You can customize the function to do whatever you want it to do, and you can have it run whenever you want it to.

* Middleware functions should accept three parameters: req, res, and next

* Example: different kinds of middleware functions (index.js)

      const loggerMiddleware = (req, res, next) => {
        console.log('New request to: ' + req.method + ' ' + req.path);
        next();
      };
      // Register the function as middleware for the application
      app.use(loggerMiddleware);
      
      app.use((req, res, next) => {
        if (req.method == 'GET') {
          res.send('GET requests are disable.');
        } else {
          next();
        }
      });

      //maintenance message
      app.use((req, res, next) => {
          res.status(503).send('The website is under maintenance...\nPlease try back soon.');
      });

## Accepting and Validating Tokens

middleware/auth.js

    const jwt = require('jsonwebtoken');
    const User = require('../models/user');

    const auth = async (req, res, next) => { 
      try {
        const token = req.header('Authorization').replace('Bearer ', '');

        //verify if it's an legal token
        const decoded = jwt.verify(token, 'thisismynewcourse');

        //verify if the token is still in the db
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
          throw new Error();
        }

        req.user = user;
        next();
      } catch (e) {
        res.status(401).send({error: 'Please authenticate.'});
      }
    };

    module.exports = auth;

The authentication middleware can be added to individual endpoints to lock them down.

For this example, **auth** is added as the second argument to router.get(), meaning that it will run before the route handler function runs. This will ensure the user is authenticated.

routers/user.js

    router.get('/users/me', auth, async (req, res) => {
        res.send(req.user);
    });

## Hiding Private Data through toJSON

When a Mongoose document is passed to **res.send()**, Mongoose converts the object into JSON. You can customize this by adding **toJSON()** as a method on the object.
  
src/models/user.js

    userSchema.methods.toJSON = function() {
      const user = this;
      const userObj = user.toObject();

      delete userObj.password;
      delete userObj.tokens;

      return userObj;
    };

## The Task/User Relationship

Add a new **owner** field in Task model and set ref to 'User'

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }

Add a virtual property in User model (A user could create many tasks, so you probably don't want to save every task id in the database.)

    userSchema.virtual('tasks', {
      ref: 'Task',
      localField: '_id', // primary key
      foreignField: 'owner' // foreign key
    });

With the relationship configured, tasks can be created with an owner value using populate().

    const task = await Task.findById('5c2e505a3253e18a43e612e6');
    await task.populate('owner').execPopulate();
    console.log(task.owner);

    const user = await User.findById('5c2e4dcb5eac678a23725b5b');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);

## Cascade Delete Task

To automatically delete tasks when the user is removed, we only need to add a middleware function.

    userSchema.pre('remove', async function(next) {
      const user = this;
      await Task.deleteMany({owner: user._id});
      next();
    });
