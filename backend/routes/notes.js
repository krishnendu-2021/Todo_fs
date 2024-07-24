const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');



//routes to get all notes : GET /api/notes/fetchallnotes => login req
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    //get all notes of a particular user
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.send(notes);
        
    } catch (error) {
        console.error({ message: error });
        res.status(500).send("internal server occured");
    }
})

// route to add note ->post /api/notes/addnote -> login req hence to verify uth token required
router.post('/addnote', fetchUser, [
    //validating the input
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 3 }),
], async (req, res) => {
    try {

        // const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {                         //checks if there is any error while vaidating is yes send bad res
            return res.status(400).json({ errors: errors.array() });
        }

        //create new note and add it to database
        const notes = new Notes({
            // title,desription,tag,user : req.user.id    //if using destructuring it is a valid syntax
            // in thunderclient we set the title and all and send ,,
            title : req.body.title, 
            description:req.body.description, 
            tag:req.body.tag, 
            user: req.user.id
        })

        const saveNote = await notes.save();
        res.send(saveNote);

    } catch (error) {
        console.error({ message: error });
        res.status(500).send("internal server occured");
    }
})


// we use put request to update something in the endpoint
// route to update a existing note -> put /api/notes/updatenote -> login req hence to verify auth token required
router.put('/updatenote/:id', fetchUser,async (req, res) => {
    try {
        //create a new noteObject
        const newNote ={};
        if(req.body.title){newNote.title = req.body.title}
        if(req.body.description){newNote.description = req.body.description}
        if(req.body.tag){newNote.tag = req.body.tag}

        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note) {return res.status(404).send("Not Found")}

        // allow deletion only if user owns this notes
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true} )
        res.send(note);

    } catch (error) {
        console.error({ message: error });
        res.status(500).send("internal server occured");
    }
})

// route to delete a existing note -> delete /api/notes/deletwnote -> login req hence to verify auth token required

router.delete('/deletenote/:id', fetchUser,async (req, res) => {
        try {
            
       
        const { title, description, tag } = req.body;

        // find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if(!note) {return res.status(404).send("Not Found")}
        
        //  allow deletion only if user owns this notes
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"status":"success",note:note});
    } catch (error) {
        console.error({ message: error });
        res.status(500).send("internal server occured");
    }

 })

module.exports = router