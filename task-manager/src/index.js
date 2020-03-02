const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

//automatically parse JSON input
app.use(express.json()); 
app.use(userRouter); //register the router with express app
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up!');
});

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('5e5cfff43b070e22d3f031fb');
    // await task.populate('owner').execPopulate(); //find the user who is associated with this task
    // console.log(task.owner);

    const user = await User.findById('5e5cfefacf64b3227c369763');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
};

main();