// models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    destinatario: { // Quem recebe a notificação
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    remetente: { // Quem fez a ação (ex: quem curtiu)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tipo: { // O que aconteceu
        type: String,
        enum: ['like', 'comment', 'follow'],
        required: true
    },
    post: { // Qual post foi curtido/comentado (opcional se for 'follow')
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    lida: {
        type: Boolean,
        default: false
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, collection: 'notifications' });

module.exports = mongoose.model('Notification', NotificationSchema);