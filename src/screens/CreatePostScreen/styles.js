import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
    },
    scrollContent: {
        paddingTop: 15,
        paddingBottom: 20,
    },
    typeSelector: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 4,
    },
    typeButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
    },
    typeButtonActive: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    typeText: {
        color: '#666',
        fontWeight: '600',
    },
    typeTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },
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
    textArea: {
        minHeight: 120,
        textAlignVertical: 'top',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6e6e6',
        borderRadius: 8,
        paddingVertical: 15,
        marginBottom: 20,
        gap: 10,
    },
    uploadButtonText: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16,
    },
    postButton: {
        width: '90%',
        backgroundColor: '#000',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    postButtonDisabled: {
        backgroundColor: '#666',
    },
    postButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    // Estilos da Imagem
    imagePreviewContainer: {
        marginBottom: 20,
        position: 'relative',
        alignSelf: 'center',
    },
    imagePreview: {
        width: 300, // Maior para ver bem
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    removeImageButton: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#fff',
        borderRadius: 15,
        zIndex: 10,
    },
});

export default styles;