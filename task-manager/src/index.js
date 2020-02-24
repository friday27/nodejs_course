const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

//automatically parse JSON input
app.use(express.json()); 

app.post('/users', (req, res) => {
    //create a new User object based on POST data
    const user = new User(req.body); 

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => { 
        res.status(400).send(e); //express default status code: 200
    });
});

app.get('/users', (req, res) => {
    //leave it empty to fetch all users
    User.find({}).then((data) => {
        res.send(data);
    }).catch((e) => {
        res.status(500).send(e);
    }); 
});

//get user by ID
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    //mongoose automatically converts String id to Object id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }).catch((e) => {
        res.status(500).send();
    });
});

app.listen(port, () => {
    console.log('Server is up!');
});