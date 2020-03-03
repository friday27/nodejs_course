# Styling and Templating

## [Handlebars](http://handlebarsjs.com/guide/#what-is-handlebars) (Views and Layouts)

Use handlebar templating engine with Express to render dynamic pages.

### Set up Handlebars

* Installation `npm i hbs`

* Add the following line to app.js

      app.set('view engine', 'hbs');

      // Customize the Views Directory
      const viewsPath = path.join(__dirname, '../templates/views');
      app.set('views', viewsPath);

* Create views/index.hbs (the default layout set in the previous step)

      <!doctype html>
      <html>
        <head>
          <title>Meadowlark Travel</title> 
        </head>
      <body>
        <h1>{{title}}</h1>
        <p>Created by {{name}}</p>
      </body>
      </html>

  * The Handlebars syntax `{{title}}` allows you to inject variables inside of the template.

* Render the template by calling res.render()

      app.get('/', (req, res) => {
        res.render('index', {
          title: 'You know nothing.',
          name: 'Jon Snow'
        });
      });

### Handlebars Partials

* Set up partials dir (add the following line into app.js)

      const hbs = require('hbs');

      const partialsPath = path.join(__dirname, '../templates/partials') hbs.registerPartials(partialsPath);

* The partial can then be rendered on a page using {{>header}} where header comes from the partial file name. If the partial was footer.hbs, it could be rendered using {{>footer}}.

      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/css/styles.css">
          <script src="/js/app.js"></script>
        </head>
        <body>
          {{>header}}
        </body>
        {{>footer}}
      </html>
