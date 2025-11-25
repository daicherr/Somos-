// 1. REMOVIDO 'Dimensions' DO IMPORT
import { StyleSheet } from 'react-native';

// 2. REMOVIDO 'const { width, height } = ...'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa', // Ajuste a cor
    alignItems: 'center',
  },
  scrollView: {
    width: '100%', // Usa 100% em vez de 'width'
  },
  page: {
    flex: 1,
    alignItems: 'center',
    width: '100%', // Garante que a página tenha 100% (será sobrescrito pelo index.js)
  },
  topContainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 18,
    color: '#555',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  imageContainer: {
    flex: 3,
    width: '90%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '100%', 
    resizeMode: 'contain',
  },
  spacer: {
    flex: 2, 
  },
  dotContainer: {
    position: 'absolute',
    // 'bottom' será definido no index.js
    flexDirection: 'row',
    zIndex: 5, 
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#555',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#000',
    borderWidth: 0,
  },
  
  // 3. ESTILOS INCOMPLETOS (SÓ O QUE É FIXO)
  svgShape: {
    position: 'absolute', 
    bottom: -1, 
    zIndex: 1, 
  },
  button: {
    position: 'absolute',
    zIndex: 10, 
  },
  
  // 4. MANTIDO O ESTILO DO SEU TEXTO
  buttonText: {
    color: '#fff',
    fontSize: 38, 
    fontWeight: 'bold',
  },
});

export default styles;