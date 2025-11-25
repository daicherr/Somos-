import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    
    // Header Customizado
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: { padding: 5, marginRight: 5 },
    
    // Barra de Busca (Cinza, Arredondada)
    searchBarWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        height: '100%',
    },

    // Grid
    gridItem: { width: width / 3, height: width / 3, padding: 1 },
    gridImage: { flex: 1, resizeMode: 'cover', backgroundColor: '#eee' },

    // Lista Usuários
    userItem: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 15, paddingVertical: 12,
        borderBottomWidth: 1, borderBottomColor: '#f9f9f9'
    },
    userAvatar: {
        width: 50, height: 50, borderRadius: 25, marginRight: 12,
        backgroundColor: '#eee'
    },
    userInfo: { flex: 1 },
    userName: { fontWeight: 'bold', fontSize: 16 },
    userFullName: { color: '#888', fontSize: 14 },
    emptyText: { textAlign: 'center', marginTop: 40, color: '#999' }
});

export default styles;