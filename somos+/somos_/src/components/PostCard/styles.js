import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 40, // Deixa margem nas laterais (20 de cada lado)
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 25, // Bordas bem arredondadas
    marginTop: 15,
    marginBottom: 15,
    
    // Efeito de Sombra do Figma (Neumorfismo leve)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5, // Android
    overflow: 'hidden', // Garante que a imagem respeite a borda
  },
  
  // Cabeçalho dentro do card
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },

  // Imagem ocupando largura total DO CARD
  postImage: {
    width: '100%',
    height: 300, 
    resizeMode: 'cover',
  },

  // Rodapé com ações
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '600',
  },

  descriptionContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default styles;