# JS Fundamentals

* JavaScript programs can be inserted into any part of an HTML document with the help of the `<script>` tag. A single `<script>` tag can’t have both the src attribute and code inside.

* If we have a lot of JavaScript code, we can put it into a separate file. `<script src='/path/to/script.js'></script>`. The benefit of a separate file is that the browser will download it and **store it in its cache**. Other pages that reference the same script will take it from the cache instead of downloading it, so the file is actually downloaded only once. That reduces traffic and makes pages faster.

* Put `'use strict';` at the top of a script to indicate that the code should be executed in strict mode.

### Variables
* A variable is a named storage for data.
* Use `let` keyword (instead of `var`) to create variables in JS.

		let message;
		message = 'Hello!';
		let reply = 'OK';
		let user = 'John', age = 25, message = 'Hello';

* To declare a constant variable (cannot be reassigned), use `const` instead of `let`.

* Capital-named constants are only used as aliases for “hard-coded” values (known prior to execution). 	

		const COLOR_RED = "#F00";
		const pageLoadTime = /* time taken by a webpage to load */;

* JS is a dynamically typed language. A variable in JavaScript can contain any data. A variable can at one moment be a string and at another be a number.

		let message = 'hello';
		message = 123;

### Primitive Data Types
#### Number
* The number type represents both integer and floating point numbers.

		let n = 123;
		n = 3.19373;

* Besides regular numbers, there are so-called “special numeric values” which also belong to this data type: `Infinity`, `-Infinity` and `NaN`. NaN represents a computational error. 

* Tricks

		alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
		alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
		alert( String(Math.trunc(Number("1.2"))) );

#### BigInt
* In JavaScript, the “number” type cannot represent integer values larger than 2^53 (or less than -2^53 for negatives).
* Right now BigInt is supported in Firefox and Chrome, but not in Safari/IE/Edge.

#### String
* In JavaScript, there are 3 types of quotes.
	1. Double quotes: "Hello"
	2. Single quotes: 'Hello' (No difference between 1 and 2)
	3. Backticks: `Hello`

* Backticks are “extended functionality” quotes. They allow us to embed variables and expressions into a string by wrapping them in ${…}.

		let name = "John";
		// embed a variable
		alert( `Hello, ${name}!` ); // Hello, John!
		// embed an expression
		alert( `the result is ${1 + 2}` ); // the result is 3

#### Boolean

#### null
In JavaScript, null is not a “reference to a non-existing object” or a “null pointer” like in some other languages. It’s just a special value which represents “nothing”, “empty” or “value unknown”.

#### undefined
The special value undefined also stands apart. It makes a type of its own, just like null. The meaning of undefined is “value is not assigned”.

#### objects

#### symbols
* A **symbol** represents a unique identifier.

		let id = Symbol('description');
		//The decription is also called symbol name
		alert(id.description);

* Symbols don’t auto-convert to a string

		alert(id.toString());

* Global symbols

		// read from the global registry
		let id = Symbol.for("id"); // if the symbol did not exist, it is created
		// read it again (maybe from another part of the code)
		let idAgain = Symbol.for("id");
		// the same symbol
		alert( id === idAgain ); // true

#### Type Conversions
* String conversion

		let value = true;
		alert(typeof value); // boolean
		value = String(value); // now value is a string "true"
		alert(typeof value); // string

* Number conversion

		let str = "123";
		alert(typeof str); // string
		let num = Number(str); // becomes a number 123
		alert(typeof num); // number
		let age = Number("an arbitrary string instead of a number");
		alert(age); // NaN, conversion failed

		* undefined -> NaN
		* null -> 0
		* true and false -> 1 and 0
		* empty string -> 0
		* string -> NaN

### Interaction
* alert
* prompt

		let age = prompt('How old are you?', 100);
		alert(`You are ${age} years old!`); // You are 100 years old!

* confirmation

		let isBoss = confirm("Are you the boss?");
		alert( isBoss ); // true if OK is pressed

* There are two limitations shared by all the methods above:
	* The exact **location** of the modal window is determined by the browser. Usually, it’s in the center.
	* The exact **look** of the window also depends on the browser. We can’t modify it.

### Function
* Function declaration

		function name(parameters) {
			...body...
		}

* Arrow function

		let func = (arg1, arg2, ..., argN) => expression;

### Object

		let user = new Object();
		let user = {};

		let user = {
			name: "John",
			age: 30
		};

		// set
		user['likes birds'] = true;
		// get
		alert(user['likes birds']);
		// delete
		delete user['likes birds'];

* Computed properties

		let fruit = promt('Which fruit to buy?', 'apple');
		let bag = {
			[fruit + 'Computers']: 5 // the name of the property is taken from the variable fruit
		};
		alert(bag.appleComputers);
		alert(bag[fruit]);

* Existence check

		let user = { name: 'John', age: 18 };
		alert( 'age' in user ); //true, user.age exists
		alert( 'blabla' in user ); //false, user.blabla doesn't exists

* The "for...in" loop

		let user = {
			name: "John",
			age: 30,
			isAdmin: true
		};

		for (let key in user) {
			// keys
			alert( key );  // name, age, isAdmin
			// values for the keys
			alert( user[key] ); // John, 30, true
		}

* Duplicate objects
	* Copying an object variable creates one more reference to the same object.

			let user = { name: "John" };
			let permissions1 = { canView: true };
			let permissions2 = { canEdit: true };
			// copies all properties from permissions1 and permissions2 into user
			Object.assign(user, permissions1, permissions2);
			// now user = { name: "John", canView: true, canEdit: true }

			let clone = Object.assign({}, user);



### References
* [The Modern JavaScript Tutorial](https://javascript.info/)
* [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

