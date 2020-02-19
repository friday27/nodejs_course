//mongoose uses mongodb module
const mongoose = require('mongoose');

//provide the db name as part of the connection URL
mongoose.connect('mongodb://127.0.0.1:27018/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

//create and User model
// {'name for your model', {definition}}
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
