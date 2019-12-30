# Node.js Development

[The Complete Node.js Developer Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/)

### Node.js

* import module
    
        const fs = require('fs');
        require('./utils.js');  //load local file

* write/append data into a file
    
        fs.writeFileSync(filename, '...');
        fs.appendFileSync(filename, '...more...');

* export the var (It can be shared across files and be used by `const name = require('filename.js')`)
    
        module.exports = varName;
        module.exports = funcName;


### NPM

* Initialization

        npm init

* Install package

        npm install name
        npm i name@version

### Reference
* [Course Repo](https://links.mead.io/nodecourse)
* [Node.js Doc](https://nodejs.org)