# APIs

## Basic Concepts

* HTTP methonds and CRUD operations

  * Create - POST
  * Read - GET
  * Update - PATCH
  * Delete - DELETE

* The structure of a HTTP request is text-based.
    1. Request line **HTTP method, /path, HTTP protocal**
    2. Headers (Accept, Connection, Auth...)
    3. Provided data
![Example Request](./img/request.png)

* HTTP Response
    1. Statue line **HTTP protocal, Status code, Text representation of the status code**
    2. Headers
![Example Response](./img/response.png)

* [HTTP status code](https://httpstatuses.com/)
  * 200 - OK
  * 201 - created
  * 400 - bad request
  * 404 - not found
  * 500 - internal server error

## Postman

Use [Postman](https://www.postman.com/) for API testing

* Set up env var
  ![Postman env var](./img/postman-env-var.png)

* Set up auth for whole collection
  1. Choose 'Edit' from the Collection options
  2. Authorization -> Bearer Token -> Update

* Set up auth from automatic JS script
  1. Set Collection/Edit/Authorization/Bearer Token to {{authToken}}
  2. Add test script in the request (e.g. login and create requests)

          //pm = postman
          if (pm.response.code === 201) {
            pm.environment.set('authToken', pm.response.json().token);
          }
          //This will automatically update the env variable called authToken once the request is sent.

## RESTful API

The REST API (Representational State Transfer - Application Programming Interface) allows client such as web application to access and manipulate resources using a set of predefined operations.

Reprsentational - working with representations of the data stored in database

State Transfer - the state has been transfer from the server to the client

[Course code](task-manager/)

### Resource Creation Endpoints

Resource creation endpoints use the POST HTTP method.

    // express.json() is also setup to parse incoming JSON into a JavaScript object which you can access on req.body.

    app.use(express.json());
    
    app.post('/users', async (req, res) => {
      const user = new User(req.body);

      try {
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).send(user);
      } catch(e) {
          //If user.save() is not successful, it will throw an error.
          res.status(400).send(e);
      }
    });

### Resource Reading Endpoints

Resource reading endpoints use the GET HTTP method.

    app.get('/users/:id', async (req, res) => {
      try {
        const user = await User.findById({_id: req.params.id});
        if (!user) {
          res.status(404).send({error: 'User id not found.'});
        }
        res.send(user);
      } catch (e) {
        res.status(400).send(e);
      }
    });

### Resource Updating Endpoints

Resource updating endpoints use the PATCH HTTP method.

Use [Model.findByIdAndUpdate()](https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate)

    app.patch('/tasks/:id', async (req, res) => {
      // Checks that the user is only updating fields that are allowed to be updated.
      const updates = Object.keys(req.body);
      const allowedUpdates = ['name', 'email', 'password', 'age'];
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

      if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
      }

      try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        if (!task) {
          res.status(404).send({error: 'Task id not found.'});
        }

        res.send(task);
      } catch (e) {
        res.status(400).send(e);
      }
    });

### Resource Deleting Endpoints

Resource deleting endpoints use the DELETE HTTP method.

    app.delete('/users/:id', async (req, res) => {
      try {
        const user = await findByIdAndDelte(req.params.id);

        if (!user) {
          res.status(404).send({error: 'User id not found.'});
        }

        res.send(user);
      } catch (e) {
        res.status(400).send(e);
      }
    });

### Seperating route files

Defining all endpoints in a single file (like index.js or app.js) is a fine way to get started, but that won't scale well as you add more routes to the app.

* Create src/routers/user.js

      const express = require('express');
      const User = require('../models/user');

      //create new router
      const router = new express.Router(); 

      //move all http methods to the file and change app to router        
      router.post('/users', async(req, res) => {
        // Do something...
      });

      module.exports = router;

* Update index.js

      const userRouter = require('./routers/user');

      app.use(taskRouter);

      // remove unused lines from index.js
      // const User = require('../models/user');
