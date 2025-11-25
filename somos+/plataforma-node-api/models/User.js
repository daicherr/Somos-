const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
    },
    // NOVO CAMPO: Username Único
    username: {
        type: String,
        required: true,
        unique: true, // Garante que não existam dois iguais
        trim: true,
        lowercase: true, // Salva sempre minúsculo
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    senha: { 
        type: String,
        required: true,
        minlength: 6, 
    },
    tipo: { 
        type: String,
        enum: ['usuario', 'ong', 'admin'],
        default: 'usuario',
    },
    // Arrays para futuro (Seguidores)
    seguidores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    seguindo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
    criadoEm: { 
        type: Date,
        default: Date.now,
    }
}, { versionKey: false, collection: 'users' });

const User = mongoose.model('User', UserSchema);

module.exports = User;