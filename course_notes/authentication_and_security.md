# API Authentication and Security

JS module to use: bcryptjs

## Hash Algorithm

bcrypt.hash('password', times);

    const bcrypt = require('bcryptjs');
    const password = 'red12345!';
    const hashedPassword = await bcrypt.hash(password, 8); 
    //8 means to execute the hash function for 8 times

    //Hash algorithms are one direction algorithm, not reversible by design, unlike encrypt algorithm.
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log(isMatch);

## Password Validation

src/models/user.js

    //User middleware of mongoose
    //define a function to be excuted before the 'save' event
    userSchema.pre('save', async function(next) {
        //this -> the document to be saved
        const user = this;

        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8);
        }

        next(); //end of the function
    });

## Login Validation

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

## JWT, JSON Web Token

* JWTs provide a nice system for issuing and validating authentication tokens.

* The authentication token will ensure that the client doesn’t need to log in every time they want to perform an operation on the server.

* Authentication tokens (stored in the database) provides a way for users to log out. If a user logs out, that token will be removed from the user profile.

* `const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn:
'7 days' })` takes 3 arguments to generate new token.
    1. The unique data to embed in this token
    2. Secret phrase
    3. A set of options

* The server can verify the token using verify. `const data = jwt.verify(token, 'thisismynewcourse')` requires 2 arguments: 
    1. The token to be verified
    2. The secret phrase

* Generate JWT

        userSchema.methods.generateAuthToken = async function () {
            const user = this;
            const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse');
            user.tokens = user.tokens.concat({token}); //short-hand syntax
            await user.save();
            return token ;
        }

        const token = await user.generateAuthToken()

## [Express Middleware](http://expressjs.com/th/guide/using-middleware.html)

* Without middleware: new request -> run route handler
* With middleware: new request -> do something -> run route handler
* Middleware functions should accept three parameters: req, res, and next.
* **next** is called to signal to Express that the middleware function is done.
* Example: different kinds of middleware functions: index.js

      //register a new middleware function to run
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

      const loggerMiddleware = (req, res, next) => {
        console.log('New request to: ' + req.method + ' ' + req.path);
        next();
      };
      // Register the function as middleware for the application
      app.use(loggerMiddleware);

## Accept Auth Token

* middleware/auth.js

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
                res.status(401).send({ error: 'Please authenticate.' });
            }
        }
        module.exports = auth;

* routers/user.js

        //auth is added as the second argument to router
        //meaning that it will run before the route handler function runs. 
        //This will ensure the user is authenticated.
        router.get('/users/me', auth, async (req, res) => {
            res.send(req.user)
        })
