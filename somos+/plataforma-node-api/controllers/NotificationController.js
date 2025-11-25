// controllers/NotificationController.js
const Notification = require('../models/Notification');

/**
 * GET /api/notifications
 * Lista todas as notificações do usuário logado.
 */
exports.list = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({ destinatario: userId })
            .sort({ criadoEm: -1 }) // Mais recentes primeiro
            .populate('remetente', 'nome username profilePic') // Traz dados de quem interagiu
            .populate('post', 'titulo imagens'); // Traz dados do post (se houver)

        return res.status(200).json(notifications);

    } catch (error) {
        console.error('Erro ao listar notificações:', error);
        return res.status(500).json({ message: 'Erro ao buscar notificações.' });
    }
};

/**
 * (Opcional para teste) POST /api/notifications
 * Cria uma notificação manualmente (para testarmos sem precisar curtir algo ainda)
 */
exports.createTest = async (req, res) => {
    try {
        const { destinatarioId, tipo, postId } = req.body;
        
        const newNotification = await Notification.create({
            destinatario: destinatarioId, // ID de quem vai receber
            remetente: req.user._id,      // Você (logado) é quem está enviando
            tipo,
            post: postId || null
        });

        return res.status(201).json(newNotification);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.deleteAll = async (req, res) => {
    try {
        const userId = req.user._id;

        await Notification.deleteMany({ destinatario: userId });

        return res.status(200).json({ message: 'Notificações limpas com sucesso.' });

    } catch (error) {
        console.error('Erro ao limpar notificações:', error);
        return res.status(500).json({ message: 'Erro ao limpar notificações.' });
    }
};