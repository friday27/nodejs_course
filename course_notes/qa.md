# Quality Assurance

In web development, quality can be broken down into 4 dimensions:

1. Reach: the number of people viewing your website or using your service. (related to SEO)
2. Functionality: a site that works as advertised is more likely to drive return visits than one that isn’t. (functionality testing can often be automated.)
3. Usability: Is it easy to use?
4. Aesthetics

There 2 main kinds of testing: Unit Testing and Integration Testing. **Unit Testing** tests single components to make sure they function properly, whereas **Integration testing** tests the interaction between multiple components, or even the whole system.

## QA Techniques (bookmark: p.41)

												 +-----------+-------------+
												 | Unit test | Integration |
												 |           |    Test     |
		+--------------------+-----------+-------------+
		| Page testing       |     V     |      V      |
		+--------------------+-----------+-------------+
		| Cross-page testing |           |      V      |
		+--------------------+-----------+-------------+
		| Logic testing      |     V     |      V      |
		+--------------------+-----------+-------------+
		| Linting            |           |             |
		+--------------------+-----------+-------------+
		| Link checking      |           |             |
		+--------------------+-----------+-------------+

* Page testing

  * Page tesing tests the presentation and frontend functionality of a page. This can involve both unit and integration testing.
  * Tools: Mocha
    1. `npm install --save-dev mocha`
    2. `mkdir public/vendor` It’s a good idea to put third-party libraries that you are using in a special directory, like vendor.
    3. `cp node_modules/mocha/mocha.js public/vendor`
    4. `cp node_modules/mocha/mocha.css public/vendor`
    5. `npm install --save-dev chai` Tests usually require a function called assert (or expect). We’ll be using the Chai assertion library.
    6. `cp node_modules/chai/chai.js public/vendor`
    7. Config [app.js](meadowlark/app.js)
    8. Config [views/layouts/main.handlebars](meadowlark/views/layouts/main.handlebars)
    9. Config [public/qa/tests-about.js](meadowlark/public/qa/tests-about.js) -> add self-defined test

* Cross-page testing
  * Cross-page testing involves testing functionality that requires navigation from one page to another.
  * Tools: Zombie.js

* Logic testing
  * Logic testing will execute unit and integration tests against our logic domain. It will be testing only JavaScript.

* Linting
  * Linting isn’t about finding errors, but potential errors.
  * Tools: JSHint

* Link checking
  * Link checking makes sure there are no broken links on your site.
  * Tools: Link‐Checker
