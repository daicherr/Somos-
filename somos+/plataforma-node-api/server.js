const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const path = require('path');

const authRoutes = require('./routes/auth'); 
const postRoutes = require('./routes/post'); 
const notificationRoutes = require('./routes/notification');
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Libera CORS total
app.use(cors()); 
app.use(express.json());

// --- DIAGNÓSTICO DE IMAGEM ---
// Este middleware vai avisar no terminal toda vez que alguém pedir uma foto
app.use('/uploads', (req, res, next) => {
    console.log(`[SERVER] 📸 Pedido de imagem recebido: ${req.path} | IP: ${req.ip}`);
    
    // Tenta forçar cabeçalhos para o celular não reclamar
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Cache-Control", "public, max-age=3600"); 
    next();
}, express.static(path.join(__dirname, 'uploads')));

// --- CONEXÃO MONGO ---
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB Atlas conectado!'))
    .catch(err => {
        console.error('❌ ERRO MONGO:', err.message);
        process.exit(1); 
    });

// --- ROTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

app.listen(PORT, '0.0.0.0', () => { // '0.0.0.0' garante que ouça a rede toda
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`📡 Para acessar pelo celular, use o seu IP local.`);
});