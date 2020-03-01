const express = require('express');
const router = new express.Router(); //create new router
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/users', async(req, res) => {
    //create a new User object based on POST data
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

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken(); //generate the token for a very specific user
        await user.save();
        res.send({user, token});
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

//put 'auth' middleware function as the second argument
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user);
});

//get user by ID
router.get('/users/:id', async (req, res) => {
    //mongoose automatically converts String id to Object id
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

//PATCH HTTP method was designed for updating the existing resource
router.patch('/users/:id', async (req, res) => {
    //make sure every single update is in allowedUpdates
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }
    
    try {
        //replace it to make sure mongoose middleware works properly
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        const user = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.send(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;