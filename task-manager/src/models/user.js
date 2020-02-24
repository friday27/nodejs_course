const mongoose = require('mongoose');
const validator = require('validator');

// create and User model
// {'name for your model', {definition}}
// Mongoose provides a basic type validation
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

// //model instance
// const me = new User({
//     name: '   Mike     ',
//     email: 'mike@me.io  ',
//     password: 'Password'
// });

// //save the instance to the db (return a promise)
// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!', error);
// });

module.exports = User;