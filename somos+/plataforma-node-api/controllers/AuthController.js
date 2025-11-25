const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_padrao_secreta';

/**
 * Lógica de Registro: POST /api/auth/register
 */
exports.register = async (req, res) => {
    try {
        const { nome, username, email, senha, tipo } = req.body;

        if (!nome || !username || !email || !senha) {
            return res.status(422).json({ message: 'Preencha todos os campos.' });
        }
        
        const existingUser = await User.findOne({ 
            $or: [{ email: email }, { username: username }] 
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(422).json({ message: 'Email já registrado.' });
            }
            if (existingUser.username === username) {
                return res.status(422).json({ message: 'Este nome de usuário já está em uso.' });
            }
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser = await User.create({
            nome,
            username, 
            email,
            senha: hashedPassword,
            tipo: tipo || 'usuario', 
        });

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ 
            message: 'Usuário registrado com sucesso!', 
            token, 
            user: { 
                id: newUser._id, 
                nome: newUser.nome, 
                username: newUser.username, 
                email: newUser.email,
                tipo: newUser.tipo
            } 
        });

    } catch (error) {
        console.error('Erro no registro:', error);
        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

/**
 * Lógica de Login: POST /api/auth/login
 */
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({ message: 'Email e senha são obrigatórios.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ 
            message: 'Login realizado com sucesso!', 
            token, 
            user: { 
                id: user._id, 
                nome: user.nome, 
                username: user.username,
                email: user.email,
                tipo: user.tipo
            } 
        });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

/**
 * Rota protegida: GET /api/auth/me
 */
exports.me = async (req, res) => {
    res.status(200).json(req.user);
};

/**
 * Rota Utilitária: Cria o usuário Bot se não existir
 * POST /api/auth/create-bot
 */
exports.createBot = async (req, res) => {
    try {
        const botEmail = 'ia@somosmais.com';
        let bot = await User.findOne({ email: botEmail });

        if (!bot) {
            const hashedPassword = await bcrypt.hash('bot123', 10);
            bot = await User.create({
                nome: 'Somos+ Assistant',
                username: 'assistente_ia',
                email: botEmail,
                senha: hashedPassword,
                tipo: 'admin'
            });
        }
        return res.status(200).json({ message: 'Robô está vivo!', botId: bot._id });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Rota Protegida: PUT /api/auth/profile
 * Atualiza o perfil do usuário logado.
 */
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { nome, username } = req.body;

        if (!nome || !username) {
            return res.status(422).json({ message: 'Nome e username são obrigatórios.' });
        }

        // Verifica unicidade se o username mudou
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== userId.toString()) {
            return res.status(422).json({ message: 'Este nome de usuário já está em uso.' });
        }

        const updates = { nome, username };

        // SE HOUVER ARQUIVO, ATUALIZA A FOTO
        if (req.file) {
            updates.profilePic = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-senha');

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        
        return res.status(200).json({ 
            message: 'Perfil atualizado com sucesso!',
            user: updatedUser 
        });

    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        return res.status(500).json({ message: 'Erro interno ao atualizar perfil.' });
    }
};
