require('../src/db/mongoose.js');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5e4e37a9db2f1776c8033978').then((task) => {
//     console.log(task);
//     return Task.countDocuments({'completed': false})
// }).then((res) => {
//     console.log(res);
// }).catch((e) => {
//     console.log(e);
// });

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({'completed': false});
    return count;
};

deleteTaskAndCount('5e4e37bc3a7c7776cbabfc35').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});