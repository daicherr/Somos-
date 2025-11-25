// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_padrao_secreta';

module.exports = async (req, res, next) => {
    try {
        // 1. Tenta pegar o token do cabeçalho 'Authorization' (Bearer Token)
        const token = req.header('Authorization').replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
        }

        // 2. Verifica e decodifica o token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 3. Encontra o usuário no banco de dados (pelo ID no token)
        const user = await User.findOne({ _id: decoded.id }).select('-senha'); // Exclui a senha
        
        if (!user) {
            return res.status(401).json({ message: 'Token inválido ou usuário não encontrado.' });
        }

        // 4. Adiciona o usuário e o token à requisição para uso futuro
        req.token = token;
        req.user = user;
        
        next(); // Permite que a requisição prossiga para o controlador

    } catch (e) {
        // Erro de token expirado ou inválido
        return res.status(401).json({ message: 'Não autorizado. Token inválido/expirado.' });
    }
};