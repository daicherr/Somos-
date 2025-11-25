const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');
const authMiddleware = require('../middleware/authMiddleware');

// Protege todas as rotas de chat (precisa estar logado)
router.use(authMiddleware);

// Listar contatos/conversas
router.get('/', ChatController.getConversations);

// Pegar histórico com um usuário específico
router.get('/:userId', ChatController.getMessages);

// Enviar mensagem
router.post('/send', ChatController.sendMessage);

module.exports = router;