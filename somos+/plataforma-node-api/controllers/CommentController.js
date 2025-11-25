// controllers/CommentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const Notification = require('../models/Notification'); 

// GET /api/comments/:postId
exports.list = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId })
            .sort({ criadoEm: 1 }) 
            .populate('autorId', 'nome username profilePic');

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar comentários.' });
    }
};

// POST /api/comments/:postId
exports.create = async (req, res) => {
    try {
        const { postId } = req.params;
        const { texto } = req.body;
        const autorId = req.user._id;

        if (!texto) return res.status(422).json({ message: 'Texto obrigatório.' });

        // 1. Cria o comentário
        const newComment = await Comment.create({
            postId,
            autorId,
            texto
        });

        // 2. INCREMENTO CRÍTICO: Atualiza o contador na Postagem
        await Post.findByIdAndUpdate(
            postId, 
            { $inc: { commentsCount: 1 } }, 
            { new: true } 
        );

        // 3. Popula os dados do autor para devolver ao Front-end
        await newComment.populate('autorId', 'nome username profilePic');

        // 4. Notificação
        const post = await Post.findById(postId);
        if (post && post.autorId.toString() !== autorId.toString()) {
            await Notification.create({
                destinatario: post.autorId,
                remetente: autorId,
                tipo: 'comment',
                post: postId
            });
        }

        return res.status(201).json(newComment);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao comentar.' });
    }
};