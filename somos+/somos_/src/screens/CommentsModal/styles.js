import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // --- Header ---
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#999',
    },
    // --- Comentário Individual ---
    commentItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
    },
    textBubble: {
        flex: 1,
        flexDirection: 'row', 
        flexWrap: 'wrap',
    },
    commentText: {
        fontSize: 14,
        color: '#333',
        marginRight: 8,
    },
    commentUsername: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    commentTime: {
        fontSize: 12,
        color: '#999',
        alignSelf: 'flex-end',
        marginLeft: 'auto', 
    },
    deleteButton: {
        justifyContent: 'center',
        paddingLeft: 10,
    },
    // --- Barra de Input ---
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 8,
        fontSize: 16,
    },
    sendButton: {
        padding: 5,
    }
});

export default styles;