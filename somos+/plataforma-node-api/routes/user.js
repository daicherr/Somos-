const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

// Protege todas as rotas
router.use(authMiddleware);

// --- ROTA NOVA (ANTES DO /:id) ---
router.get('/', UserController.search); 

// Rota para ver perfil (GET)
router.get('/:id', UserController.getUserProfile);

// Rota para Seguir/Deixar de Seguir (POST)
router.post('/:id/follow', UserController.followUser);

module.exports = router;