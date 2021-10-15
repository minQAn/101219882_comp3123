const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true,        
    },
    noteDescription: {
        type: String,
    },
    priority: {
        type: String,
        required: true,
        default: "MEDIUM",
        uppercase: true,
        validate(value){
            if(value !== "HIGH" && value !== "LOW" && value !== "MEDIUM"){
                throw new Error("Accepted only HIGH, LOW or MEDIUM.");
            }
        }
    },
    dateAdded: {
        type: Date,
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;