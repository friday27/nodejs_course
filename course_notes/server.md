# Server Set Up

## Installation

* [Visual Studio Code](https://code.visualstudio.com)
* [Node.js and NPM](https://nodejs.org/en/download/)
* [nodemon](https://nodemon.io)
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Things to know

* When you specify the `-g` (global) option when installing npm pacaages, they are installed in a subdirectory of your **home directory**.

* If you specify the `--save` flag, it will update the package.json file.

* Node offers a different paradigm than that of a traditional web server: **the app that you write is the web server**. Node simply provides the framework for you to build a web server. 

## npm

* Initialization

        npm init -y

* Install package

      npm install name
      npm i name@version

  * The installation command does 3 things:
    1. Create a **node_modules/** dir which contains all the code of installed npm modules
    2. Add the installed module as a dependency in **package.json**
    3. Create a **package-lock.json** file which includes detailed information about the modules you’ve installed which helps keep things fast and secure

        * Check package-lock.json and install needed packages `npm install`

        * Install the package as a dev dependency `npm install name --save-dev`

        * Install npm modules globally (not all modules are designed to be installed globally) `npm install -g module-name`. The global installed module won't be added into package.json or package-lock.json.

* Uninstall package

        npm uninstall name

        //uninstall the package from global env
        npm uninstall -g name

* Add self-defined command into package.json (Run by `npm run dev`)

        "scripts": {
            "dev": "nodemon src/app.js -e js,hbs"
        },

## nodemon

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

        //install nodemon
        npm install nodemon -g

        //run script
        nodemon app.js

## Crearing SSH keys

SSH is the protocol used to securely transfer code between your machine and GitHub/Heroku.

* Check existing SSH keys `ls -a -l ~/.ssh`

* Create a new SSH key pair `ssh-keygen -t rsa -b 4096 -C "youremail`

* Ensure the SSH agent is running `eval "$(ssh-agent -s)"`

* Add the new SSH private key to the SSH agent `ssh-add -K ~/.ssh/id_rsa`

* Dump the content of public SSH key to terminal `cat ~/.ssh/id_rsa.pub` Copy and paste the contents to the clip board and register the SSH key with GitHub.

## Deploying Node.js to Heroku (using Heroku CLI)

The Heroku CLI gives you commands to deploy and manage your Node.js applications.

There are 2 important settings to do for Heroku:

1. Heroku needs to know what command to run to start your app.

        // The start script in package.json is used to tell Heroku which command to run.
        "scripts": {
            "start": "node src/app.js"
        }

2. Heroku requires your app to listen on a specific port.

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            //...
        });

### Steps to deploy NodeJS app on Heroku

1. `heroku login`

2. `heroku keys:add` adds the public ssh key to heroku account

3. Run `heroku create <project_name>` from the application root

4. Run `npm run start` to test the change

5. Push the changes to GitHub and Heroku

6. Check the result through Heroku URL

## Creating a Production MongoDB Database and Deploying on Heroku

1. Get a MongoDB Atlas free account and create a cluster

    * IP Address: 0.0.0.0/0
    * Install MongoDB Compass (~ Robo3T)

2. Open MongoDB Compass Community and connect to (1) localhost:port, (2) the cluster

3. Git push to GitHub and Heroku (after `heroku login`, `heroku create <project-name>`)

4. Use `heroku config:set <key>=<value>` to set environment variables for Heroku. ()

    For MONGODB_URL, go MongoDB Compass webpage and get the connection string for connecting to application. `heroku config:set MONGODB_URL='...'`

    Use `heroku config:unset <key>=<value>` to remove it, and `heroku config` to check environment variables.

5. Set the newly created Heroku URL to the env variable **url** in Postman prod env.
