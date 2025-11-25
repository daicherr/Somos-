import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: '#fff',
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    userInfoSection: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 20,
    },
    nameAndAction: {
        flex: 1,
        justifyContent: 'center',
    },
    profileName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
    },
    profileUsername: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    // Estilo genérico para botões de ação no header
    actionButton: {
        borderRadius: 5,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 15,
    },
    statItem: {
        alignItems: 'center',
    },
    statCount: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    internalMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    menuItem: {
        paddingVertical: 10,
    }
});

export default styles;