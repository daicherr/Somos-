import { StyleSheet, Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Fundo escuro transparente
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Um pouco mais escuro para foco
    justifyContent: 'flex-end', // Modal vem de baixo
  },
  // O Painel Branco
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30, // Mais arredondado
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: height * 0.9, // Ocupa no máximo 90% da tela
    minHeight: height * 0.5, // Garante um tamanho mínimo
    
    // Sombra suave (Elevation)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  
  // Cabeçalho do Modal
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800', // Extra bold
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },

  // Inputs
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    height: 54, // Altura confortável para o dedo
    backgroundColor: '#F7F7F7', // Cinza bem clarinho
    borderRadius: 16, // Borda moderna
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#F0F0F0', // Borda sutil
  },
  
  // Botão Principal (Preto)
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#000',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
    // Sombra sutil no botão
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  // Links e Textos Secundários
  forgotPasswordText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 20,
  },
  footerButton: {
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
  },
  footerLink: {
    color: '#000', // Destaque em preto
    fontWeight: 'bold',
  },

  // Mensagem de Erro
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default styles;