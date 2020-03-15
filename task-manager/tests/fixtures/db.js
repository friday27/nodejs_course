const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneID = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneID,
    name: 'Mike',
    email: 'mike@friends.com',
    password: 'ilovephoebe',
    tokens: [{
        token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
    }]
};

const userTwoID = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoID,
    name: 'Jane',
    email: 'jane@friends.com',
    password: 'andilovejacob',
    tokens: [{
        token: jwt.sign({_id: userTwoID}, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'cooking!',
    completed: false,
    owner: userOneID
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Bible study',
    completed: true,
    owner: userOneID
};

const taskThree= {
    _id: new mongoose.Types.ObjectId(),
    description: 'udemy 4',
    completed: true,
    owner: userTwoID
};

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    userOneID, 
    userOne,
    userTwoID,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
};