const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// --- CONFIGURAÇÃO DO UPLOAD (Igual ao PostController) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Garante que a pasta 'uploads' existe na raiz
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// ---------------------------------------------------------

// Rotas Públicas
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/create-bot', AuthController.createBot);

// Rotas Protegidas
router.get('/me', authMiddleware, AuthController.me);

// >>> CORREÇÃO: Adicionado 'upload.single' para receber a foto <<<
router.put('/profile', authMiddleware, upload.single('profilePic'), AuthController.updateProfile);

module.exports = router;