console.log("starting app.js");

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];
console.log("[Command]",command);
console.log("[Yargs]", argv);

if ( command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note){
      console.log("Note Created");
      console.log("-------");
      console.log("Title: ", argv.title);
      console.log("Body: ",argv.body);
  }else{
    console.log("Duplicate note exists");
  }
} else if ( command === 'list'){
  let allNotes =  notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note)=> notes.logNote(note));
} else if ( command === 'read'){
    notes.readNote(argv.title);
} else if ( command === 'remove'){
   let noteRemoved = notes.deleteNote(argv.title);
   let message = noteRemoved ? 'Note was removed' : 'No note exists'
   console.log(message);
} else {
    console.log("Command not recognized");
}