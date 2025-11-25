const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Listar
router.get('/', NotificationController.list);

// Limpar Tudo (NOVA ROTA)
router.delete('/', NotificationController.deleteAll);

// Teste
router.post('/test', NotificationController.createTest);

module.exports = router;