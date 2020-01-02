const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    },{
        text: 'Film course',
        completed: false
    }],
    getTasksToDo() {
        const tasksToDo = this.tasks.filter( (task) => task.completed === false);
        return tasksToDo;
    }
};

console.log(tasks.getTasksToDo());