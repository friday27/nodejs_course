const fs = require('fs');

/*
const book = {
    title: 'Harry Potter and the Chursed Child',
    author: 'J.K.Rowling'
};

const bookJSON = JSON.stringify(book);
// console.log(book);
// console.log(bookJSON);
// console.log(book.title); //book -> object
// console.log(bookJSON.title); //bookJSON -> string
fs.writeFileSync('1-json.json', bookJSON);

const parsedData = JSON.parse(bookJSON);
// console.log(parsedData); //object
// console.log(parsedData.author);
*/

/*
const dataBuffer = fs.readFileSync('1-json.json');
console.log(dataBuffer);
console.log(dataBuffer.toString());
const data = JSON.parse(dataBuffer);
console.log(data);
*/

const dataBuffer = fs.readFileSync('data.json');
const data = JSON.parse(dataBuffer);
data.name = 'Lauren';
data.age = 2020;
const JSONstr = JSON.stringify(data);
fs.writeFileSync('data2.json', JSONstr);