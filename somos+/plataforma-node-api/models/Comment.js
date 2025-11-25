// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    autorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    texto: {
        type: String,
        required: true,
        trim: true
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, collection: 'comments' });

module.exports = mongoose.model('Comment', CommentSchema);