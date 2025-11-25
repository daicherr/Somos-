import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Fundo levemente cinza (Off-white) para destacar os cards
    },
    // A mancha verde do fundo (Simulação visual)
    backgroundBlob: {
        position: 'absolute',
        top: -100,
        left: -100,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: '#E0F2F1', // Tom verde água bem claro
        opacity: 0.8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 10,
    },
    appName: {
        fontSize: 28,
        fontWeight: '900', // Extra Bold
        color: '#000',
        letterSpacing: -0.5,
    },
    // Barra de Busca (Sombra suave e arredondada)
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 25,
        marginTop: 15,
        marginBottom: 20,
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 25, // Bem redondo
        // Sombra suave (Elevation)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    listContent: {
        paddingBottom: 100, // Espaço para a TabBar flutuante
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#999',
    }
});

export default styles;