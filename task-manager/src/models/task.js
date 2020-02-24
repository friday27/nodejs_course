const mongoose = require('mongoose');

// Task model
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// const task = new Task({
//     description: '   test.   ',
// });

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log('Error!', error);
// });

module.exports = Task;