const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const authMiddleware = require('../middleware/authMiddleware');

// --- NOVAS ROTAS ---

// 1. Feed Personalizado (Quem eu sigo) - TEM QUE SER ANTES DO GET '/'
router.get('/feed', authMiddleware, PostController.getFeed);

// 2. Meus Posts (Perfil)
router.get('/me', authMiddleware, PostController.listMyPosts);

// 3. Explorar (Todos os posts - Público)
router.get('/', PostController.list);

// ... (Mantenha as outras rotas create, like, delete como estavam)
router.post('/', authMiddleware, PostController.create);
router.post('/:id/like', authMiddleware, PostController.toggleLike);
router.put('/:id', authMiddleware, PostController.update);   
router.delete('/:id', authMiddleware, PostController.delete);

module.exports = router;