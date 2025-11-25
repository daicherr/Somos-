import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // --- Barra de Navegação Superior ---
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    navTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    // --- HEADER DO PERFIL (PIXEL PERFECT) ---
    headerContainer: {
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#fff',
    },
    // 1. Foto Grande
    bigProfilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    // 2. Textos
    fullName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    username: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
    },
    // 3. Estatísticas
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
        gap: 40, // Espaço entre os blocos
    },
    statItem: {
        alignItems: 'center',
    },
    statCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    statLabel: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
    },
    // 4. Botão de Ação Largo
    actionButton: {
        backgroundColor: '#0095F6', // Azul estilo Instagram (ou use a cor da marca)
        paddingVertical: 10,
        width: '90%', // Ocupa quase toda a largura
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    followingButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#dbdbdb',
    },
    followingButtonText: {
        color: '#000',
    },

    // 5. Abas
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
        marginTop: 10,
    },
    activeTab: {
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        flex: 1,
        alignItems: 'center',
    },
    activeTabText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    inactiveTabText: {
        paddingVertical: 12,
        fontSize: 14,
        color: '#888',
        flex: 1,
        textAlign: 'center',
    },

    // --- Grade de Posts ---
    gallery: {
        flex: 1,
    },
    postGridItem: {
        width: width / 3,
        height: width / 3,
        padding: 1,
    },
    postImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    postImagePlaceholder: {
        flex: 1,
        backgroundColor: '#eee',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#999',
        fontSize: 16,
    }
});

export default styles;