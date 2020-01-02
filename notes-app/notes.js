const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes ...';
};

const addNote = (title, body) => {
    const notes = loadNotes();
    //array filter
    const duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
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
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
};