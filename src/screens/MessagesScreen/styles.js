import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F0FBF9', // Fundo verde-água bem clarinho (fiel ao design)
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    },
    // Decoração de fundo (Opcional, para dar o charme das curvas)
    bgDecoration: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#E0F2F1',
        opacity: 0.5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginBottom: 20,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 28, 
        fontWeight: '800', 
        color: '#000',
        marginBottom: 10,
        paddingHorizontal: 25,
    },
    // Barra de Busca Estilo Pílula
    searchContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        borderRadius: 30, // Bem redondo
        marginHorizontal: 25, 
        marginBottom: 25, 
        paddingHorizontal: 20,
        height: 55,
        // Sombra Suave
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    searchInput: { 
        flex: 1, 
        marginLeft: 10,
        fontSize: 15,
        color: '#333',
    },
    listContent: {
        paddingHorizontal: 25,
        paddingBottom: 100, // Espaço para não cortar o fim
    },
    // CARD DO CONTATO (Estilo Pílula Grande)
    cardItem: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        // Sombra suave
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    avatar: {
        width: 55, 
        height: 55, 
        borderRadius: 27.5, 
        marginRight: 15, 
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    textContainer: { 
        flex: 1,
        justifyContent: 'center',
    },
    name: { 
        fontWeight: 'bold', 
        fontSize: 16, 
        color: '#222',
        marginBottom: 3,
    },
    lastMessage: { 
        color: '#888', 
        fontSize: 13,
        lineHeight: 18,
    },
    emptyText: { 
        textAlign: 'center', 
        marginTop: 50, 
        color: '#999' 
    }
});

export default styles;