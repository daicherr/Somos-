import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    
    // Navbar Superior
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    navTitle: { fontSize: 16, fontWeight: 'bold' },

    // Header do Perfil
    headerContainer: { alignItems: 'center', paddingTop: 20, backgroundColor: '#fff' },
    bigProfilePic: {
        width: 100, height: 100, borderRadius: 50, marginBottom: 15,
        backgroundColor: '#eee', borderWidth: 1, borderColor: '#f0f0f0'
    },
    fullName: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 4 },
    username: { fontSize: 14, color: '#888', marginBottom: 20 },
    
    // Estatísticas
    statsRow: {
        flexDirection: 'row', justifyContent: 'center', width: '100%',
        marginBottom: 20, gap: 30 
    },
    statItem: { alignItems: 'center' },
    statCount: { fontSize: 18, fontWeight: 'bold', color: '#000' },
    statLabel: { fontSize: 13, color: '#888', marginTop: 2 },

    // Botão Editar (Estilo Específico)
    editProfileButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        width: '90%',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    editProfileButtonText: { color: '#000', fontWeight: '600', fontSize: 15 },

    // Abas
    tabsContainer: {
        flexDirection: 'row', justifyContent: 'space-around', width: '100%',
        borderBottomWidth: 1, borderBottomColor: '#dbdbdb', marginTop: 5
    },
    activeTab: {
        paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: '#000',
        flex: 1, alignItems: 'center'
    },
    activeTabText: { fontWeight: 'bold', fontSize: 14, color: '#000' },
    inactiveTabText: {
        paddingVertical: 12, fontSize: 14, color: '#999',
        flex: 1, textAlign: 'center'
    },

    // Grid
    postGridItem: { width: width / 3, height: width / 3, padding: 1, position: 'relative' },
    postImage: { flex: 1, resizeMode: 'cover', backgroundColor: '#f0f0f0' },
    deleteButton: {
        position: 'absolute', top: 5, right: 5,
        backgroundColor: 'rgba(0,0,0,0.6)', padding: 4, borderRadius: 4
    },
    emptyText: { textAlign: 'center', marginTop: 40, color: '#999' }
});

export default styles;