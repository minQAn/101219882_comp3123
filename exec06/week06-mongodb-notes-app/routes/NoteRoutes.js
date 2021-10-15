const express = require('express');
const app = express();
//TODO - Create a new Note
const NoteModel = require('../models/NoteModel');

//http://mongoosejs.com/docs/api.html#document_Document-save

// Add Note
app.post('/notes', async (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    } 
    const {noteTitle, noteDescription, priority} = req.body.content;
    const dateNow = new Date();
    const dateAdded = dateNow;
    const dateUpdated = dateNow;
    
    const note = {
        noteTitle,
        noteDescription,
        priority,
        dateAdded: dateAdded,
        dateUpdated: dateUpdated
    }

    //TODO - Write your code here to save the note
    const noteResult = new NoteModel(note);

    try{
        await noteResult.save();
        res.send(noteResult);
    } catch (err) {
        res.status(500).send(err);
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    //TODO - Write your code here to returns all note

    try{
        const notes = await NoteModel.find();

        // Validate
        if(notes == ""){
            return res.send({
                message: "Notes DB is empty."
            })
        }

        res.send(notes);
    } catch (err) {
        res.status(500).send(err);
    }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    const id = req.params.noteId;
    
    //TODO - Write your code here to return onlt one note using noteid
    try{
        const note = await NoteModel.find({_id: id}); // same as equal ===
        res.send(note);
    } catch (err) {
        res.status(500).send({
            message: "The Note doesn't exist",
            err
        });
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    //TODO - Write your code here to update the note using noteid
    const id = req.params.noteId;
    const {noteTitle, noteDescription, priority} = req.body.content;

    // *** it's 'put' so.. to keep dateAdded, but when I just deleated and executed without dateAdded, it sill keep the dateAdded data. (maybe mongoose library.. prevents.. deleting..?)
    try{
        // const existedNote = await NoteModel.findById(id);
        // const dateAdded = existedNote.dateAdded;
        let noteUpdated = await NoteModel.findByIdAndUpdate(id, {
            noteTitle,
            noteDescription,
            priority,
            // dateAdded,
            dateUpdated: new Date()
        });
        
        res.status(200).send({
            message: "Successfully Updated",
            noteUpdated
        });

    } catch (err) {
        res.status(500).send(err);
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to delete the note using noteid
    const id = req.params.noteId;
    
    try {
        const noteDeleted = await NoteModel.findByIdAndDelete(id);
        
        // it returns 'null' if not found
        if(!noteDeleted){
            res.status(404).send("No item found");
        }

        res.status(200).send("Successfully Deleted");
        
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = app;