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

const jwt = require('jsonwebtoken');

const myFunction = async() => {
    const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse', {expiresIn: '7 days'});
    console.log(token);

    const data = jwt.verify(token, 'thisismynewcourse');
    console.log(data);  
};

myFunction();
