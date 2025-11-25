const Post = require('../models/Post');
const User = require('../models/User');
const Notification = require('../models/Notification');
const Comment = require('../models/Comment'); // <-- CRUCIAL para a exclusão
const multer = require('multer'); // 1. NOVO IMPORT
const path = require('path'); // Para caminhos de arquivo

// --- CONFIGURAÇÃO DO MULTER (Armazenamento de Mídia) ---
// Define onde os arquivos serão salvos (Temporário no seu sistema local)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Salva os arquivos na pasta 'uploads/' (crie esta pasta)
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // Define o nome do arquivo (timestamp + extensão original)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Inicializa o upload (aceita até 4 arquivos com o nome de campo 'imagens')
const upload = multer({ storage: storage, limits: { files: 4 } }).array('imagens', 4);
// --------------------------------------------------------

/**
 * Endpoint Protegido: POST /api/posts
 * Cria um novo post ou campanha, suportando upload de arquivos.
 */
exports.create = [
    // 1. Usa o middleware Multer para processar os arquivos
    upload, 
    
    // 2. Controlador principal
    async (req, res) => {
        try {
            const autorId = req.user._id; 
            
            // Dados de texto (vindo de req.body)
            const { titulo, descricao, postType, campanhaDetails } = req.body;
            
            // Caminhos dos arquivos (vindo de req.files)
            const uploadedImages = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

            if (!titulo || !descricao) {
                return res.status(422).json({ message: 'Título e descrição são obrigatórios.' });
            }
            
            const newPost = await Post.create({
                titulo,
                descricao,
                autorId,
                imagens: uploadedImages, // Salva os caminhos
                postType: postType || 'post',
                commentsCount: 0, 
                campanhaDetails: postType === 'campanha' ? { 
                    ongId: autorId,
                    localizacao: campanhaDetails?.localizacao,
                    meta: campanhaDetails?.meta || 0,
                    arrecadado: 0
                } : undefined
            });

            return res.status(201).json({ 
                message: 'Postagem criada com sucesso!', 
                post: newPost 
            });

        } catch (error) {
            console.error('Erro ao criar postagem:', error);
            return res.status(500).json({ message: 'Erro interno ao criar postagem.' });
        }
    }
];

/**
 * GET /api/posts/feed
 * Retorna apenas posts de quem o usuário segue + os dele mesmo.
 */
exports.getFeed = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // 1. Busca o usuário logado para pegar a lista de quem ele segue
        const currentUser = await User.findById(userId);
        
        if (!currentUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // 2. Monta a lista de IDs permitidos: [Amigos..., EuMesmo]
        // Se não incluir o próprio ID, você não vê seus próprios posts no feed
        const allowedAuthors = [...currentUser.seguindo, userId];

        // 3. Busca posts onde o autor está nessa lista
        const feedPosts = await Post.find({ autorId: { $in: allowedAuthors } })
            .sort({ data: -1 }) // Mais recentes primeiro
            .populate('autorId', 'nome username profilePic');

        return res.status(200).json(feedPosts);

    } catch (error) {
        console.error('Erro ao carregar feed:', error);
        return res.status(500).json({ message: 'Erro interno ao carregar o feed.' });
    }
};
/**
 * Endpoint Público: GET /api/posts
 */
exports.list = async (req, res) => {
    try {
        const { search } = req.query;
        let query = search ? {
            $or: [
                { titulo: { $regex: search, $options: 'i' } }, 
                { descricao: { $regex: search, $options: 'i' } }
            ]
        } : {};

        const posts = await Post.find(query)
            .sort({ data: -1 })
            .populate('autorId', 'nome email tipo profilePic');

        return res.status(200).json(posts);

    } catch (error) {
        console.error('Erro ao listar postagens:', error);
        return res.status(500).json({ message: 'Erro interno ao carregar o feed.' });
    }
};

exports.listMyPosts = async (req, res) => {
    try {
        const myPosts = await Post.find({ autorId: req.user._id })
            .sort({ data: -1 });

        return res.status(200).json(myPosts);

    } catch (error) {
        console.error('Erro ao listar meus posts:', error);
        return res.status(500).json({ message: 'Erro ao buscar perfil.' });
    }
};

exports.toggleLike = async (req, res) => {
    // (Lógica de like)
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado.' });
        }

        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);

            if (post.autorId.toString() !== userId.toString()) {
                await Notification.create({
                    destinatario: post.autorId,
                    remetente: userId,
                    tipo: 'like',
                    post: postId
                });
            }
        }

        await post.save();

        return res.status(200).json({ 
            message: isLiked ? 'Descurtido' : 'Curtido', 
            likesCount: post.likes.length,
            isLiked: !isLiked 
        });

    } catch (error) {
        console.error('Erro no like:', error);
        return res.status(500).json({ message: 'Erro ao processar like.' });
    }
};

/**
 * Rota Protegida: DELETE /api/posts/:id
 * Exclui uma postagem.
 */
exports.delete = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado.' });
        }

        if (post.autorId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Você não tem permissão para excluir esta postagem.' });
        }

        await Post.deleteOne({ _id: postId });
        await Comment.deleteMany({ postId: postId }); // Limpa comentários

        return res.status(200).json({ message: 'Postagem excluída com sucesso.' });

    } catch (error) {
        console.error('Erro ao excluir postagem:', error);
        return res.status(500).json({ message: 'Erro ao excluir postagem.' });
    }
};

/**
 * Rota Protegida: PUT /api/posts/:id
 * Atualiza um post.
 */
exports.update = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        const updates = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado.' });
        }

        if (post.autorId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Você não tem permissão para editar esta postagem.' });
        }
        
        delete updates.autorId; 
        delete updates.likes; 

        const updatedPost = await Post.findByIdAndUpdate(
            postId, 
            { $set: updates },
            { new: true, runValidators: true }
        );
        
        await updatedPost.populate('autorId', 'nome username profilePic');

        return res.status(200).json({ 
            message: 'Postagem atualizada com sucesso.',
            post: updatedPost 
        });

    } catch (error) {
        console.error('Erro ao editar postagem:', error);
        return res.status(500).json({ message: 'Erro ao processar a edição.' });
    }
};