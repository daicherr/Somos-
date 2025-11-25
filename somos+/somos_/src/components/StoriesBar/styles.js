import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2', // Linha muito sutil separando stories do feed
        paddingBottom: 15,
    },
    scrollContent: {
        paddingHorizontal: 15, // Espaço inicial da lista
    },
    storyItem: {
        alignItems: 'center',
        marginRight: 18, // Mais espaço entre as bolinhas
        width: 72, 
    },
    // Borda colorida (Círculo Externo)
    avatarContainer: {
        width: 68,
        height: 68,
        borderRadius: 34,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
        borderWidth: 2.5, // Borda mais grossa
    },
    // Borda Colorida (Simulando gradiente ou cor da marca)
    activeStoryBorder: {
        borderColor: '#00BFA5', // TEAL/CIANO (Cor moderna)
    },
    // Sem borda para o meu story (ou borda cinza sutil)
    myStoryBorder: {
        borderColor: '#fff', // Invisível
        // Se quiser destacar que não tem story novo:
        // borderColor: '#ddd',
        // borderWidth: 1,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff', // Borda branca interna para separar da borda colorida
        backgroundColor: '#eee',
    },
    username: {
        fontSize: 11,
        color: '#262626',
        textAlign: 'center',
    },
    // Ícone de "+" no seu story
    addIcon: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        backgroundColor: '#0095f6', // Azul padrão de ação
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    addIconText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: -2,
        marginLeft: 0.5, // Micro ajuste de alinhamento
    }
});

export default styles;