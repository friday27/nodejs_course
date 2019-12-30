const validator = require('validator');
const getNotes = require('./notes.js');

const msg = getNotes();
console.log(msg);

console.log(validator.isEmail('harry@wizard.com'));
console.log(validator.isEmail('potter.com'));
console.log(validator.isURL('ftp://potter.com'));