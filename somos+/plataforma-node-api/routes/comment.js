const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const authMiddleware = require('../middleware/authMiddleware');

// Listar comentários (Público - qualquer um pode ler)
router.get('/:postId', CommentController.list);

// Criar comentário (Protegido - precisa estar logado)
router.post('/:postId', authMiddleware, CommentController.create);

module.exports = router;