# Server Set Up

### Installation
* [Node.js and NPM](https://nodejs.org/en/download/)
* [nodemon](https://nodemon.io)
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)


### Things to know
* When you specify the `-g` (global) option when installing npm pacaages, they are installed in a subdirectory of your **home directory**.

* If you specify the `--save` flag, it will update the package.json file.

* Node offers a different paradigm than that of a traditional web server: **the app that you write is the web server**. Node simply provides the framework for you to build a web server. 


### npm
* Initialization

        npm init -y

* Install package

        npm install name
        npm i name@version

* check package-lock.json and install needed packages

        npm install

* install the package as a dev dependency

        npm install name --save-dev

* Uninstall package

        npm uninstall name

        //uninstall the package from global env
        npm uninstall -g name

* Add self-defined command into package.json (Run by `npm run dev`)

        "scripts": {
            "dev": "nodemon src/app.js -e js,hbs"
        },


### nodemon
nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

        //install nodemon
        npm install nodemon -g

        //run script
        nodemon app.js


### Deploying Node.js to Heroku (using Heroku CLI)
1. `heroku login`

2. `heroku keys:add` adds the public ssh key to heroku account

3. `heroku create <project_name>`

4. Update package.json

        "scripts": {
            //Tell Heroku what to do to start up the application
            "start": "node src/app.js"
        }

5. Run `npm run start` to test the change

6. Update **port** in src/app.js
    
        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            //...
        });

7. Push the changes to GitHub and Heroku

8. Check the result through Heroku URL
