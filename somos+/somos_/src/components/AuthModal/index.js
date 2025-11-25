import React, { useState, useContext } from 'react';
import { 
  View, Text, Modal, TextInput, TouchableOpacity, 
  TouchableWithoutFeedback, KeyboardAvoidingView, Platform, 
  ActivityIndicator, ScrollView, Keyboard 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para ícones se precisar
import styles from './styles';
import { AuthContext } from '../../context/AuthContext'; 
import api from '../../services/api'; 

export default function AuthModal({ isVisible, onClose }) {
  const { signIn } = useContext(AuthContext); 
  const [authMode, setAuthMode] = useState('login'); // 'login' ou 'register'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Campos
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Limpa estados ao trocar de modo
  const switchMode = () => {
      setAuthMode(authMode === 'login' ? 'register' : 'login');
      setError('');
  };

  const handleAuth = async () => {
    setError('');
    
    // Validação Básica
    if (!email || !password) return setError('Preencha todos os campos.');
    if (authMode === 'register') {
        if (!name || !username) return setError('Nome e usuário são obrigatórios.');
        if (password !== confirmPassword) return setError('As senhas não conferem.');
        if (password.length < 6) return setError('A senha deve ter no mínimo 6 caracteres.');
    }

    setIsLoading(true);

    try {
        const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
        const payload = authMode === 'login' 
            ? { email, senha: password }
            : { nome: name, username, email, senha: password };

        const response = await api.post(endpoint, payload);
        
        // Sucesso
        signIn(response.data.token, response.data.user); 
        onClose(); 
    } catch (apiError) {
        const msg = apiError.response?.data?.message || 'Ocorreu um erro. Tente novamente.';
        setError(msg);
    } finally { 
        setIsLoading(false); 
    }
  };

  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={isVisible} 
        onRequestClose={onClose}
    >
        {/* Estrutura para lidar com Teclado */}
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{ flex: 1 }}
        >
            {/* Fundo Escuro (Fecha ao clicar) */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    
                    {/* Container Branco (Impede fechar ao clicar dentro) */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContainer}>
                            
                            {/* Barra indicadora de "puxar" */}
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.indicator} />
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {/* Cabeçalho */}
                                <View style={styles.header}>
                                    <Text style={styles.title}>
                                        {authMode === 'login' ? 'Bem-vindo de volta' : 'Criar conta'}
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        {authMode === 'login' ? 'Entre para continuar' : 'Preencha seus dados para começar'}
                                    </Text>
                                </View>

                                {/* Erro */}
                                {error ? (
                                    <View style={styles.errorContainer}>
                                        <Ionicons name="alert-circle" size={20} color="#D32F2F" style={{marginRight: 8}} />
                                        <Text style={styles.errorText}>{error}</Text>
                                    </View>
                                ) : null}

                                {/* Inputs Dinâmicos */}
                                {authMode === 'register' && (
                                    <>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.inputLabel}>Nome Completo</Text>
                                            <TextInput 
                                                style={styles.input} 
                                                placeholder="Ex: João Silva" 
                                                placeholderTextColor="#999"
                                                value={name} onChangeText={setName} 
                                            />
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.inputLabel}>Usuário (@)</Text>
                                            <TextInput 
                                                style={styles.input} 
                                                placeholder="Ex: joaosilva" 
                                                autoCapitalize="none"
                                                placeholderTextColor="#999"
                                                value={username} onChangeText={setUsername} 
                                            />
                                        </View>
                                    </>
                                )}

                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>Email</Text>
                                    <TextInput 
                                        style={styles.input} 
                                        placeholder="seu@email.com" 
                                        keyboardType="email-address" 
                                        autoCapitalize="none"
                                        placeholderTextColor="#999"
                                        value={email} onChangeText={setEmail} 
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>Senha</Text>
                                    <TextInput 
                                        style={styles.input} 
                                        placeholder="******" 
                                        secureTextEntry 
                                        placeholderTextColor="#999"
                                        value={password} onChangeText={setPassword} 
                                    />
                                </View>

                                {authMode === 'register' && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputLabel}>Confirmar Senha</Text>
                                        <TextInput 
                                            style={styles.input} 
                                            placeholder="******" 
                                            secureTextEntry 
                                            placeholderTextColor="#999"
                                            value={confirmPassword} onChangeText={setConfirmPassword} 
                                        />
                                    </View>
                                )}

                                {/* Botão de Ação */}
                                <TouchableOpacity 
                                    style={styles.primaryButton} 
                                    onPress={handleAuth} 
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.primaryButtonText}>
                                            {authMode === 'login' ? 'Entrar' : 'Cadastrar'}
                                        </Text>
                                    )}
                                </TouchableOpacity>

                                {authMode === 'login' && (
                                    <TouchableOpacity>
                                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                                    </TouchableOpacity>
                                )}

                                {/* Rodapé (Trocar modo) */}
                                <TouchableOpacity style={styles.footerButton} onPress={switchMode}>
                                    <Text style={styles.footerText}>
                                        {authMode === 'login' ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
                                        <Text style={styles.footerLink}>
                                            {authMode === 'login' ? 'Cadastre-se' : 'Faça Login'}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                                
                                {/* Espaço extra para garantir scroll se teclado subir */}
                                <View style={{ height: 20 }} />
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </Modal>
  );
}