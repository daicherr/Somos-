const User = require('../models/User');
const Post = require('../models/Post');
const Notification = require('../models/Notification');

/**
 * GET /api/users/:id
 * Busca os dados públicos de um usuário e seus posts.
 */
exports.getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca o Usuário (sem senha)
        const user = await User.findById(id).select('-senha');

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Busca os Posts desse usuário
        const posts = await Post.find({ autorId: id })
            .sort({ data: -1 });

        return res.status(200).json({
            user,
            posts
        });

    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        return res.status(500).json({ message: 'Erro ao carregar perfil.' });
    }
};

/**
 * POST /api/users/:id/follow
 * Seguir ou Deixar de Seguir um usuário.
 */
exports.followUser = async (req, res) => {
    try {
        const targetUserId = req.params.id; // Quem eu quero seguir
        const myUserId = req.user._id;      // Quem eu sou

        if (targetUserId === myUserId.toString()) {
            return res.status(400).json({ message: 'Você não pode seguir a si mesmo.' });
        }

        const targetUser = await User.findById(targetUserId);
        const myUser = await User.findById(myUserId);

        if (!targetUser || !myUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Verifica se já sigo (se meu ID está na lista dele)
        const isFollowing = targetUser.seguidores.includes(myUserId);

        if (isFollowing) {
            // DEIXAR DE SEGUIR (Unfollow)
            targetUser.seguidores.pull(myUserId);
            myUser.seguindo.pull(targetUserId);
            
            await targetUser.save();
            await myUser.save();

            return res.status(200).json({ 
                message: 'Deixou de seguir', 
                isFollowing: false,
                followersCount: targetUser.seguidores.length 
            });

        } else {
            // SEGUIR (Follow)
            targetUser.seguidores.push(myUserId);
            myUser.seguindo.push(targetUserId);

            await targetUser.save();
            await myUser.save();

            // Cria notificação para quem foi seguido
            await Notification.create({
                destinatario: targetUserId,
                remetente: myUserId,
                tipo: 'follow'
            });

            return res.status(200).json({ 
                message: 'Seguindo com sucesso', 
                isFollowing: true,
                followersCount: targetUser.seguidores.length 
            });
        }


    } catch (error) {
        console.error('Erro ao seguir usuário:', error);
        return res.status(500).json({ message: 'Erro ao processar solicitação.' });
    }
};

exports.search = async (req, res) => {
    try {
        const { search } = req.query;

        // Se não tiver termo de busca, retorna lista vazia
        if (!search) {
            return res.status(200).json([]);
        }

        const users = await User.find({
            $or: [
                { nome: { $regex: search, $options: 'i' } },     // Case insensitive
                { username: { $regex: search, $options: 'i' } }
            ]
        })
        .select('nome username profilePic') // Traz só o necessário
        .limit(20); // Limita resultados

        return res.status(200).json(users);

    } catch (error) {
        console.error('Erro na busca de usuários:', error);
        return res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
};