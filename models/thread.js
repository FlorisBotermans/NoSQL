const mongoose = require('mongoose');
const CommentSchema = require('./comment')
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [CommentSchema]
});

const Thread = mongoose.model('thread', ThreadSchema)

module.exports = Thread;