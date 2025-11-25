import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F5', // Fundo levemente off-white para destacar balões
    },
    // --- Cabeçalho (Pixel Perfect) ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // Altura ajustada para iOS/Android
        height: Platform.OS === 'ios' ? 100 : 70, 
        paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight + 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
        // Sombra suave
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
        zIndex: 10,
    },
    backButton: {
        padding: 8,
        marginRight: 5,
    },
    headerProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#eee',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    headerTextContainer: {
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1A1A1A',
        letterSpacing: -0.3,
    },
    headerStatus: {
        fontSize: 12,
        fontWeight: '500',
        color: '#00BFA5', // Verde Teal (Marca)
        marginTop: 1,
    },
    
    // --- Lista de Mensagens ---
    messagesList: {
        paddingHorizontal: 15,
        paddingVertical: 20,
    },

    // --- Balões ---
    bubbleContainer: {
        marginVertical: 4,
        maxWidth: '80%',
        minWidth: '20%',
    },
    
    messageBubble: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 18,
    },

    // Minha Mensagem (Direita)
    senderWrapper: {
        alignSelf: 'flex-end',
    },
    senderBubble: {
        backgroundColor: '#00BFA5', // Cor da Marca
        borderBottomRightRadius: 4, // Ponta do balão
    },
    senderText: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 22,
    },
    senderTime: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
        fontWeight: '500',
    },

    // Mensagem do Outro (Esquerda)
    receiverWrapper: {
        alignSelf: 'flex-start',
    },
    receiverBubble: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4, // Ponta do balão
        borderWidth: 1,
        borderColor: '#E5E5E5',
        // Sombra leve no balão branco
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    receiverText: {
        color: '#262626',
        fontSize: 16,
        lineHeight: 22,
    },
    receiverTime: {
        color: '#999',
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
        fontWeight: '500',
    },

    // --- Input ---
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    inputField: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 24,
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 10,
        maxHeight: 100,
        fontSize: 16,
        color: '#000',
        marginRight: 10,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#00BFA5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
        shadowColor: '#00BFA5',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    // Vazio
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scaleY: -1 }], // Desinverte para exibir texto corretamente
    },
    emptyText: {
        fontSize: 16,
        color: '#aaa',
        marginTop: 10,
    }
});

export default styles;