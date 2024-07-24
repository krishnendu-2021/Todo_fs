const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    //user is just like a foreign key, it is necessary to set because it is required inorder to save notes of
    // a patricular user in database
    //basically we are storing user id of other model to link with that model here user.. to get the user
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title : {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes',NotesSchema);