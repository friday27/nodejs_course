//function param default to undefined
const greeter = (name = 'Siri', age) => {
	console.log('Hello ' + name);
};

greeter('Andy');
greeter();