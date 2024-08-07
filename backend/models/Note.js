const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: 'General'
    },
    dateTime:{
        type: Date,
        default: Date.now,
    }
});

const Note = mongoose.model('notes', notesSchema)

module.exports = Note