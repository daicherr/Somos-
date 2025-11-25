import React, { useState, useRef, useEffect } from 'react'; 
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView,
  Dimensions,
  Animated 
} from 'react-native'; 
import styles from './styles'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomShape from '../../assets/bottom-shape.svg'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa o modal
import AuthModal from '../../components/AuthModal'; 

const illustration = require('../../assets/splash-illustration.png'); 

const { width, height } = Dimensions.get('window');

// 1. GARANTA QUE 'navigation' ESTÁ SENDO RECEBIDO AQUI
export default function OnboardingScreen({ navigation }) { 
  const [activeIndex, setActiveIndex] = useState(0);
  const [buttonText, setButtonText] = useState('Avançar →'); 
  const [userHasToken, setUserHasToken] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  
  const scrollRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current; 
  const isButtonScroll = useRef(false);

  // useEffect (Checagem de Token - SEM MUDANÇAS)
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); 
        if (token !== null) {
          setUserHasToken(true);
        } else {
          setUserHasToken(false);
        }
      } catch (e) {
        console.error("Falha ao ler o AsyncStorage", e);
      }
    };
    checkToken(); 
  }, []); 

  // useEffect (Animação de Texto - SEM MUDANÇAS)
  useEffect(() => {
    const newText = activeIndex === 0 ? 'Avançar →' : (userHasToken ? 'Entrar' : 'Crie sua conta →');
    if (newText === buttonText) return;

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setButtonText(newText); 
      Animated.timing(fadeAnim, { 
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  }, [activeIndex, userHasToken]); 

  // onScroll (SEM MUDANÇAS)
  const onScroll = (event) => {
    if (isButtonScroll.current) {
      isButtonScroll.current = false; 
      return;
    }
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };
  
  // handleButtonPress (SEM MUDANÇAS)
  const handleButtonPress = () => {
    if (activeIndex === 0) {
      isButtonScroll.current = true;
      scrollRef.current.scrollTo({ x: width, animated: true });
      setActiveIndex(1);
    } else {
      setIsModalVisible(true); 
    }
  };

  // Estilos Dinâmicos (SEM MUDANÇAS)
  const dynamicButtonTextStyle = {
    fontSize: buttonText === 'Crie sua conta →' ? 24 : (buttonText === 'Entrar' ? 32 : 38),
  };
  const dynamicSvgStyle = {
    width: width * 1,
    left: '-(25%)',
    height: height * 0.29,
  };
  const dynamicButtonStyle = {
    left: '44.6%',
    bottom: height * 0.08,
  };
  const dynamicDotContainerStyle = {
    bottom: height * 0.38,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        scrollEnabled={activeIndex > 0} 
      >
        <View style={[styles.page, { width: width }]}>
          <View style={styles.topContainer}>
            <Text style={styles.welcomeText}>Bem vindo ao</Text>
            <Text style={styles.appName}>Somos +</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={illustration} style={styles.illustration} />
          </View>
          <View style={styles.spacer} /> 
        </View>
        <View style={[styles.page, { width: width }]}>
          <View style={styles.topContainer}>
            <Text style={styles.welcomeText}>Bem vindo ao</Text>
            <Text style={styles.appName}>Somos +</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={illustration} style={styles.illustration} />
          </View>
          <View style={styles.spacer} />
        </View>
      </ScrollView>

      <View style={[styles.dotContainer, dynamicDotContainerStyle]}>
        <View style={[styles.dot, activeIndex === 0 && styles.dotActive]} />
        <View style={[styles.dot, activeIndex === 1 && styles.dotActive]} />
        <View style={styles.dot} /> 
      </View>
      
      <BottomShape style={[styles.svgShape, dynamicSvgStyle]} />

      <TouchableOpacity 
        style={[styles.button, dynamicButtonStyle]} 
        onPress={handleButtonPress}
      >
        <Animated.Text style={[
          styles.buttonText, 
          dynamicButtonTextStyle, 
          { opacity: fadeAnim }
        ]}>
          {buttonText}
        </Animated.Text>
      </TouchableOpacity>
      
      {/* 2. PASSE A PROP 'navigation' AQUI */}
      <AuthModal 
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}