const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    remetente: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    destinatario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    texto: {
        type: String,
        required: true
    },
    lida: {
        type: Boolean,
        default: false
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, collection: 'messages' });

module.exports = mongoose.model('Message', MessageSchema);