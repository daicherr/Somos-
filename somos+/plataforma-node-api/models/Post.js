const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    ongId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    localizacao: { 
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false }
    },
    meta: { type: Number, default: 0 },
    arrecadado: { type: Number, default: 0 },
});

const PostSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    descricao: { type: String, required: true },
    autorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    data: { type: Date, default: Date.now },
    imagens: { type: [String], default: [] },
    postType: {
        type: String,
        enum: ['post', 'campanha', 'story'],
        default: 'post',
    },
    
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    
    // CAMPO CRÍTICO: Contagem de Comentários
    commentsCount: {
        type: Number,
        default: 0
    },
    // ------------------------------------

    campanhaDetails: CampaignSchema, 

}, { versionKey: false, collection: 'posts' }); 

module.exports = mongoose.model('Post', PostSchema);