import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#000',
    },
    saveButtonText: {
        color: '#3897f0',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
    },
    scrollContent: {
        paddingTop: 15,
        paddingBottom: 20,
        alignItems: 'center', // Centraliza a foto de perfil
    },
    // Estilos da Foto de Perfil
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: '#f1f1f1',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    changeAvatarText: {
        color: '#3897f0',
        fontWeight: 'bold',
    },
    // Estilos dos Inputs
    input: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default styles;