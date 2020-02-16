# JavaScript Note

### String
* `str.toLowerCase()`	
* `str.toUpperCase()`

* `str.valueOf()`

* `str.charAt(i)`
* `str.indexOf(searchValue)`
* `str.lastIndexOf(searchValue)`

* `str.includes(searchString)`
* `str.startsWith(searchString)`
* `str.endsWith(searchString)`

* `str.match(regexp)` matched regular expression (regexp) against a string (str)

* `str.trim()`
* `str.trimStart()`
* `str.trimEnd()`

* `str.substring(indexStart[, indexEnd])`
* `str.slice(beginIndex[, endIndex])`

* `str.split(sep)`
* `str.replace(searchFor, replaceWith)`

* `str.repeat(count)`

* `str.padStart(targetLength)`
* `str.padEnd(targetLength)`

* String Interpolation

		const myName = 'Eve';
		const myCity = 'London';
		console.log(`My name is ${myName}. My favorite city is ${myCity}.`);


### Number and Math
* `Math.random() * 100`
* `Math.floor(val)`
* `Math.ceil(val)`

* `Number.isInteger(val)`


### Variables and Conditions
* Declaration
	* let: can be reassigned, can declare a variable without assigning a value

			let fruit = 'banana';
			let age;

	* const: cannot be reassigned, must be assigned a value when declared

* `typeof`

		let newVariable = 'Playing around with typeof.';
		console.log(typeof newVariable);

* Short-circuit evaluation

		let tool;
		let writingUtensil = tool || 'pen';
		console.log(writingUtensil); //'pen'

* Ternary Operator

		favoritePhrase === 'Love That!' ? console.log('I love that!') : console.log("I don't love that!");

* switch

		switch (food) {
			case 'Apple':
				console.log('pie');
				break;
			case 'Banana':
				console.log('ice cream');
				break;
			case 'Chocolate'
				console.log('milk tea');
				break;
			default:
				console.log('water');
				break;
		}


### Functions

* Function expression: basic

		function test(value='default') {
			console.log('OK!');
		};

* Function expression: Anonymous function
	
		const plantNeedsWater = function(day) {
			if (day === 'Wednesday') {
				return true;
			} else {
		    	return false;
			}
		};

* Function expression: Arrow function
		
		const plantNeedsWater = (day) => {
			if (day === 'Wednesday') {
				return true;
			} else {
				return false;
			}
		};

* Function expression: Concise body arrow function

		//no parameter
		const funcName = () => {};

		//1 parameter
		const funcName = ParamName => {};

		//multiple parameters
		const funcName = (p1, p2, ..) => {};

		const plantNeedsWater = day => day === 'Wednesday' ? true : false;

* Avoid scope pollution

		const logVisibleLightWaves = () => {
			let lightWaves = 'Moonlight';
			let region = 'The Arctic';

			// create a inner variable to avoid overwrite
			if (region === 'The Arctic') {
				let lightWaves = 'Northern Lights';
				console.log(lightWaves);
			}

			console.log(lightWaves);
		};

### Arrays

		const hobbies = ['swimmming', 'skiing', 'weight-lifting'];

		console.log(hobbies[0]); //swimming
		console.log(hobbies[5]); //undefined

* Variables declared with the const keyword cannot be reassigned. However, elements in an array declared with const remain mutable. Meaning that we can change the contents of a const array, but cannot reassign a new array or a different value.

		const utensils = ['Fork', 'Knife', 'Chopsticks', 'Spork'];
		utensils[3] = 'Spoon';
		console.log(utensils); 
		// [ 'Fork', 'Knife', 'Chopsticks', 'Spoon' ]

* push(elem) and pop(): add and remove elements from end

		utensils.push('Plate');
		utensils.push('Box');
		console.log(utensils); 
		// [ 'Fork', 'Knife', 'Chopsticks', 'Spoon', 'Plate', 'Box' ]

		utensils.pop();
		// [ 'Fork', 'Knife', 'Chopsticks', 'Spoon', 'Plate' ]

* shift() and shift(elem): add and remove elements from beginning

		utensils.shift();
		// [ 'Knife', 'Chopsticks', 'Spoon', 'Plate' ]

		utensils.unshift('popcorn');
		// [ 'popcorn', 'Knife', 'Chopsticks', 'Spoon', 'Plate' ]

* Seperate an array

		utensils.slice(1, 3) // [ 'Knife', 'Chopsticks', 'Spoon' ]
		// but the original array is not changed

* indexOf()

		console.log(utensils.indexOf(2));
		// 'Chopsticks'

### Loops
* for

		for (let i = 5; i <= 10; i++) {
			console.log(i);
		}

* do-while

		let cupsOfSugarNeeded = 100;
		let cupsAdded = 0;

		do {
			cupsAdded++;
		} while (cupsAdded < cupsOfSugarNeeded);

### Objects (functions to use along with an array)
* forEach() -> operation

		const fruits = ['mango', 'papaya', 'pineapple', 'apple'];
		fruits.forEach(f =>
			console.log('I want to eat a '+f));

* map() -> return value (return a new array)

		const animals = ['Hen', 'elephant', 'llama', 'leopard', 'ostrich', 'Whale', 'octopus', 'rabbit', 'lion', 'dog'];

		const secretMessage = animals.map(a => {
			return a[0];
		});

* filter() -> return boolean

		const favoriteWords = ['nostalgia', 'hyperbole', 'fervent', 'esoteric', 'serene'];

		const longFavoriteWords = favoriteWords.filter(w => {
			return w.length > 7;
		});

* findIndex() -> return boolean

		const animals = ['hippo', 'tiger', 'lion', 'seal', 'cheetah', 'monkey', 'salamander', 'elephant'];

		const startsWithS = animals.findIndex(a => {
			return a.startsWith('s');
		});
		console.log(startsWithS);
		
* reduce()

		const newNumbers = [1, 3, 5, 7];

		const newSum = newNumbers.reduce((accumulator, currentValue) => {
			console.log('The value of accumulator: ', accumulator);
			console.log('The value of currentValue: ', currentValue);
			return accumulator + currentValue;
		}, 10);

		console.log(newSum); //26

* some()
* every()

* delete property

		let spaceship = {
			'Fuel Type' : 'Turbo Fuel',
			homePlanet : 'Earth',
			color: 'silver',
			'Secret Mission' : 'Discover life outside of Earth.'
		};

		delete spaceship['Secret Mission'];

* Create methods

		let alienShip = {
			retreat: () => {
				console.log(retreatMessage)
			},
			takeOff: () => {
				console.log('Spim... Borp... Glix... Blastoff!');
			}
		};

* Looping through object

		let spaceship = {
		    crew: {
		    captain: { 
		        name: 'Lily', 
		        degree: 'Computer Engineering', 
		        cheerTeam() { console.log('You got this!') } 
		        },
		    'chief officer': { 
		        name: 'Dan', 
		        degree: 'Aerospace Engineering', 
		        agree() { console.log('I agree, captain!') } 
		        },
		    medic: { 
		        name: 'Clementine', 
		        degree: 'Physics', 
		        announce() { console.log(`Jets on!`) } },
		    translator: {
		        name: 'Shauna', 
		        degree: 'Conservation Science', 
		        powerFuel() { console.log('The tank is full!') } 
		        }
		    }
		}; 

		// Write your code below
		for (let member in spaceship.crew) {
			console.log(`${member: ${spaceship.crew[member].name}`);
		}

* Arrow function and **this**
	* Arrow functions inherently bind, or tie, an already defined this value to the function itself that is NOT the calling object. In the code snippet above, the value of this is the global object, or an object that exists in the global scope, which doesn’t have a dietType property and therefore returns undefined.

			const goat = {
				dietType: 'herbivore',
				makeSound() {
					console.log('baaa');
				},
				diet: () => {
					console.log(this.dietType);
				}
			};

			goat.diet(); // Prints undefined

* Privacy: JavaScript developers follow naming conventions that signal to other developers how to interact with a property. One common convention is to place an underscore _ before the name of a property to mean that the property should not be altered. 

		const bankAccount = {
			_amount: 1000
		};

* Getter and Setter

		const robot = {
			_model: '1E78V2',
			_energyLevel: 100,
			get energyLevel() {
				if(typeof this._energyLevel === 'number') 
					return 'My current energy level is ' + this._energyLevel;
				return 'System malfunction: cannot retrieve energy level';
			}
		};

		//need not to use ()
		//like attribute
		console.log(robot.energyLevel);

* Factory function

		const robotFactory = (model, mobile) => {
			return {
				model : model,
				mobile: mobile,
				beep () { 
					console.log('Beep Boop'); 
				}
			};
		};

		const tinCan = robotFactory('P-500', true);
		tinCan.beep();

* Destructured Assignment

		//get the value of variable residence from object vampire
		const { residence } = vampire; 
		console.log(residence);

		const robot = {
			model: '1E78V2',
			energyLevel: 100,
			functionality: {
				beep() {
					console.log('Beep Boop');
				},
				fireLaser() {
					console.log('Pew Pew');
				},
			}
		};

		const { functionality } = robot;
		functionality.beep();

* [Built-in object methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

		const robot = {
			model: 'SAL-1000',
			mobile: true,
			sentient: false,
			armor: 'Steel-plated',
			energyLevel: 75
		};

		// What is missing in the following method call?
		const robotKeys = Object.keys(robot);
		console.log(robotKeys);

		// Declare robotEntries below this line:
		const robotEntries = Object.entries(robot);
		console.log(robotEntries);

		// Declare newRobot below this line:
		const newRobot = Object.assign({laserBlaster: true, voiceRecognition: true}, robot);
		// newRobot.laserBlaster = true;
		// newRobot.voiceRecognition = true;
		console.log(newRobot);

### Classes

		class HospitalEmployee {
			constructor(name) {
				this._name = name;
				this._remainingVacationDays = 20;
			}
		  
			get name() {
				return this._name;
			}
		  
			get remainingVacationDays() {
				return this._remainingVacationDays;
			}
		  
			takeVacationDays(daysOff) {
				this._remainingVacationDays -= daysOff;
			}

			static generatePassword() {
				return Math.floor(Math.random()*10000);
			}
		}

* Inheritance

		class Nurse extends HospitalEmployee {
			constructor(name, certifications) {
				super(name);
				this._certifications = certifications;
			}
		}

		const nurseOlynyk = new Nurse('Olynyk', ['Trauma', 'Pediatrics']);

### [Browser Compability and Transaction](https://www.codecademy.com/courses/introduction-to-javascript/lessons/browser-compatibility-and-transpilation/exercises/browser-compatibility-introduction?action=resume_content_item)

* [caniuse.com](https://caniuse.com)

* ES6 -> ES5
	* let/const -> var
	* string interpolation -> +

* Transpilation by Babel
	* Install Babel packages

			npm install babel-cli
			npm install babel-preset-env

	* Specify the version of the source JavaScript code

			touch .babelrc

			//add the following line to .babelrc
			// {"presets": ["env"]}

	* Specify a script in package.json that initiates the ES6+ to ES5 transpilation

			//add the following line (property) to package.json right after "test": "echo \"Error: no test specified\" && exit 1"
			"build": "babel src -d lib"

	* Run Babel tool

			npm run build
			//which will transpilate scripts in src/ to ES5 and save it in lib/

### Modules
* Export modules in one file to let other files to use it

		//add the following line in the file of the module you want to export
		module.exports = Menu;
		//exports the Menu object as a module

* Import a local module

		const Menu = require('./menu.js');

* We can also wrap any collection of data and functions in an object, and export the object using module.exports.

		module.exports = {
			specialty: "Roasted Beet Burger with Mint Sauce",
			getSpecialty: function() {
				return this.specialty;
			} 
		}; 

* ES6 supports default exports

		let Menu = {};
		
		export default Menu;

	* **Node.js doesn’t support export default by default**, so module.exports is usually used for Node.js development and ES6 syntax is used for front-end development. 

* ES6 module syntax also introduces the import keyword for importing objects.

		import Menu from './menu';  // .js can be ignored

* In addition to export default, ES6 named exports allow us to export data through the use of variables.

		let specialty = '';
		function isVegetarian() {
		}; 
		function isLowSodium() {
		}; 

		export { specialty, isVegetarian };
		export { specialty as sp, isVegetarian as isVeg };
		//we could use 'as' to change the name of variables


		//We can use {} for import as well.
		import { specialty, isVegetarian } from './menu';
		import * as Carte from './menu';

* Export name exports: Named exports are also distinct in that they can be exported as soon as they are declared, by placing the keyword export in front of variable declarations.

		export let specialty = '';
		export function isVegetarian() {
		};

### Promises
Modern JavaScript handles asynchronicity using the Promise object.

* Promises are objects that represent the eventual outcome of an asynchronous operation. A Promise object can be in one of three states: pending, rejected, fulfilled

* Construct a Promise object

		const executorFunction = (resolve, reject) => {
			if (someCondition) {
				resolve('I resolved!');
			} else {
				reject('I rejected!'); 
			}
		}
		const myFirstPromise = new Promise(executorFunction);

	* The executor function runs automatically when the constructor is called
	* The executor function has two function parameters, usually referred to as the resolve() and reject() functions, which aren’t defined by the programmer. 
	* If invoked, resolve() will change the promise’s status from pending to fulfilled. reject() will change the promise’s status from pending to rejected.

* .then() defines success and failure handlers for Promise object.
		
		let prom = new Promise((resolve, reject) => {
		let num = Math.random();
			if (num < .5 ){
				resolve('Yay!');
			} else {
				reject('Ohhh noooo!');
			}
		});

		const handleSuccess = (resolvedValue) => {
			console.log(resolvedValue);
		};

		const handleFailure = (rejectionReason) => {
			console.log(rejectionReason);
		};


* We can chain a second .then() with a failure handler to a first .then() with a success handler and both cases will be handled.

		prom
		.then((resolvedValue) => {
			console.log(resolvedValue);
		})
		.then(null, (rejectionReason) => {
			console.log(rejectionReason);
		});

* The .catch() function takes only one argument, onRejected. In the case of a rejected promise, this failure handler will be invoked with the reason for rejection. Using .catch() accomplishes the same thing as using a .then() with only a failure handler.

		prom
		.then((resolvedValue) => {
			console.log(resolvedValue);
		})
		.catch((rejectionReason) => {
			console.log(rejectionReason);
		});

* Chaining multiple promises

		checkInventory(order)
		.then((resolvedValueArray) => {
			return processPayment(resolvedValueArray);
		})
		.then((resolvedValueArray) => {
			return shipOrder(resolvedValueArray);
		})
		.then((successMessage) => {
			console.log(successMessage);
		})
		.catch((errorMessage) => {
			console.log(errorMessage);
		});

		* 2 common mistakes should be avoided: nesting promises and forgetting to return a promise

* [bookmark](https://www.codecademy.com/courses/introduction-to-javascript/lessons/promises/exercises/promise-all?action=resume_content_item)

### Requests
* There are many types of HTTP requests. The four most commonly used types of HTTP requests are GET, POST, PUT, and DELETE.


