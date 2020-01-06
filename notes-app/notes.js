const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes ...';
};

const addNote = (title, body) => {
    const notes = loadNotes();
    //array filter
    // const duplicateNotes = notes.filter((note) => note.title === title);
    //use 'find' method so it will return once the title is found
    const duplicateNote = notes.find((note) => note.title === title);

    debugger;

    // if(duplicateNotes.length === 0) {
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else  {
        console.log(chalk.red.inverse('Note title taken!'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const originLen = notes.length;
    const notesToKeep = notes.filter((note) => note.title !== title);
    saveNotes(notesToKeep);

    if(notesToKeep.length < originLen) {
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
};

const listNotes = () => {
    console.log(chalk.inverse('Your notes'));
    const notes = loadNotes();
    notes.forEach((n) => console.log(n.title));
};

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);
    if(foundNote) {
        console.log(chalk.inverse(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red('Note not found!'));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('./notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('./notes.json');
        const dataJSON = JSON.parse(dataBuffer);
        return dataJSON;
    } catch (e) {
        return [];
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};