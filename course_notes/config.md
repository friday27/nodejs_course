# Configuration

### app.js

		const express = require('express');

		// Create an Express application
		const app = express();

		app.set('port', process.env.PORT || 3000);

		app.get('/', (req, res) => {
			res.type('text/plain');
			res.send('Meadowlark Travel');
		});

		app.get('/about', (req, res) => {
			res.type('text/plain');
			res.send('About Us');
		});

		//custom 404 page
		app.use((req, res) => {
			res.type('text/plain');
			res.status(404);
			res.send('404 - Not Found');
		});

		// Start the server
        // Access the app in browser by http://localhost:port/
		app.listen(app.get('port'), function() {
			console.log('Express started on http://localhost:' +
			app.get('port') + '; press Ctrl-C to terminate.');
		});


### Handlebars (Views and Layouts)
* Install handlebars `npm i --save handlebars`
* Add the following lines to app.js

		const handlebars = require('express3-handlebars') .create({ defaultLayout:'main' });
		app.engine('handlebars', handlebars.engine); 
		app.set('view engine', 'handlebars');

* Create views/layouts folder and views/layouts/main.handlebars (the default layout set in the previous step)

		<!doctype html>
		<html>
		    <head>
				<title>Meadowlark Travel</title> 
			</head>
			<body>
				{{{body}}}
		    </body>
		</html>

* Update routes: the view engine will return a content type of text/html and a status code of 200 by default. 
		
		app.get('/', (req, res) => {
			res.render('home');
		});
