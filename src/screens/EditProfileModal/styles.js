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
        paddingTop: 20,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    title: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#000',
    },
    saveButtonText: {
        color: '#3897f0',
        fontSize: 17,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        alignItems: 'center', 
    },
    // Foto de Perfil
    avatarSection: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
        backgroundColor: '#f0f0f0',
    },
    changeAvatarText: {
        color: '#3897f0',
        fontSize: 16,
        fontWeight: '600',
    },
    // Inputs
    inputGroup: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        color: '#666',
        fontSize: 14,
        marginBottom: 6,
        marginLeft: 2,
    },
    input: {
        width: '100%',
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', // Apenas linha embaixo (estilo moderno)
        fontSize: 16,
        color: '#000',
        paddingHorizontal: 0, // Remove padding lateral para alinhar com label
    },
});

export default styles;