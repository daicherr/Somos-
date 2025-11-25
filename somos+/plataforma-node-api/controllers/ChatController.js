const Message = require('../models/Message');
const User = require('../models/User');

// --- Lógica Simples (Sem Custos) ---
const getBotResponse = (texto) => {
    const t = texto.toLowerCase();
    // Regras básicas de resposta
    if (t.includes('oi') || t.includes('olá') || t.includes('ola')) {
        return "Olá! Sou o assistente virtual do Somos+. Como posso ajudar?";
    }
    if (t.includes('ajuda') || t.includes('help')) {
        return "Aqui no Somos+ você pode: \n1. Ver campanhas no Feed.\n2. Criar suas próprias ações no botão '+'.\n3. Conversar com ONGs aqui no chat.";
    }
    if (t.includes('doar') || t.includes('doação')) {
        return "Para doar, entre no perfil da ONG desejada e procure pelos dados bancários ou link de apoio na bio.";
    }
    if (t.includes('obrigado') || t.includes('valeu')) {
        return "De nada! Estamos juntos nessa causa. 🤝";
    }
    // Resposta padrão
    return "Ainda estou aprendendo! Tente perguntar sobre 'ajuda' ou 'doação'.";
};

/**
 * POST /api/chat/send
 */
exports.sendMessage = async (req, res) => {
    try {
        const { destinatarioId, texto } = req.body;
        const remetenteId = req.user._id;

        if (!destinatarioId || !texto) {
            return res.status(422).json({ message: 'Texto obrigatório.' });
        }

        // 1. Salva a mensagem do Usuário
        const userMsg = await Message.create({
            remetente: remetenteId,
            destinatario: destinatarioId,
            texto
        });

        // 2. Verifica se é o Robô
        const destinatarioUser = await User.findById(destinatarioId);
        
        if (destinatarioUser && destinatarioUser.username === 'assistente_ia') {
            
            // Gera a resposta localmente (Sem API externa)
            const respostaBot = getBotResponse(texto);

            // Delay de 1 segundo para parecer natural
            setTimeout(async () => {
                await Message.create({
                    remetente: destinatarioId,
                    destinatario: remetenteId,
                    texto: respostaBot,
                    lida: false
                });
            }, 1000);
        }

        return res.status(201).json(userMsg);

    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        return res.status(500).json({ message: 'Erro ao enviar mensagem.' });
    }
};

// ... (MANTENHA AS OUTRAS FUNÇÕES IGUAIS: getMessages, getConversations)
exports.getMessages = async (req, res) => {
    try {
        const meuId = req.user._id;
        const outroUserId = req.params.userId;
        const messages = await Message.find({
            $or: [
                { remetente: meuId, destinatario: outroUserId },
                { remetente: outroUserId, destinatario: meuId }
            ]
        }).sort({ criadoEm: 1 });
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao carregar chat.' });
    }
};

exports.getConversations = async (req, res) => {
    try {
        const meuId = req.user._id;
        const users = await User.find({ _id: { $ne: meuId } }).select('nome username tipo profilePic email'); 
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao carregar conversas.' });
    }
};