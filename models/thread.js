const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments:  [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

module.exports = ThreadSchema;