// const obj = {
//     name:"Daniel"
// }
// let stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// const personString = '{"name":"Daniel","age":30}';
// const person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

const fs = require('fs');

var originalNote = {
    title: 'Black sails',
    body:'Pirates life for me'
}
var originalNoteString = JSON.stringify(originalNote)
fs.writeFileSync("notes.json", originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);