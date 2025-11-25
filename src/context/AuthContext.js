import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Importa a nossa instância centralizada (NÃO o axios puro)
import api from '../services/api'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função de Login
  const signIn = async (newToken, userData) => {
    await AsyncStorage.setItem('userToken', newToken);
    setToken(newToken);
    setUser(userData);
    
    // 2. CORREÇÃO: Configura o token na instância 'api'
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`; 
  };

  // Função de Logout
  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    setToken(null);
    setUser(null);
    
    // 3. Remove o token da instância 'api'
    delete api.defaults.headers.common['Authorization']; 
  };

  const checkLoginStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      
      if (storedToken) {
        // 4. Configura o token antes de chamar a rota
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        
        // Chama a rota /me usando 'api'
        const response = await api.get('/auth/me');
        
        setToken(storedToken);
        setUser(response.data); 
      }
    } catch (e) {
      console.log("Sessão expirada ou inválida.");
      await AsyncStorage.removeItem('userToken');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};