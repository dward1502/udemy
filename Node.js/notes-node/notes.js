console.log('Starting notes.js');
const fs = require('fs');

fetchNotes = () => {
    try{
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);    
    } catch (e) {
        return [];
    }
}

saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));

}


var addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title: title,
        body: body
    }
    
    var duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });

    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
    }       
}
var readNote = (title) => {
    console.log("Reading note", title);
}
var deleteNote = (title) => {
    let notes = fetchNotes();
    var findNote = notes.filter((note) => note.title !== title);
    saveNotes(findNote);
    console.log("Deleting note", title);
    return notes.length !== findNote.length;
}
var getAll = () => {
    console.log("Getting all notes");
}
module.exports = {
    addNote,
    readNote,
    deleteNote,
    getAll
}