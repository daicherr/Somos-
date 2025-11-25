import React, { useState, useContext } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView,
    ActivityIndicator,
    Alert,
    Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../context/AuthContext'; 
import api from '../../services/api'; 
import styles from './styles'; 

// VERIFIQUE SE ESTA LINHA "export default" ESTÁ PRESENTE
export default function EditProfileModal({ navigation }) {
    const { user, token, signIn } = useContext(AuthContext); 
    
    const [name, setName] = useState(user?.nome || '');
    const [username, setUsername] = useState(user?.username || '');
    const [isLoading, setIsLoading] = useState(false);
    
    // Helper para URL
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        const rootUrl = api.defaults.baseURL.replace('/api', ''); 
        return `${rootUrl}${path}`; 
    };

    const [imageUri, setImageUri] = useState(getImageUrl(user?.profilePic));

    const handlePickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                Alert.alert('Permissão', 'Precisamos de acesso à sua galeria.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Erro image picker:", error);
            Alert.alert("Erro", "Não foi possível abrir a galeria.");
        }
    };

    const handleUpdate = async () => {
        if (!name || !username) {
            Alert.alert('Erro', 'Nome e username são obrigatórios.');
            return;
        }

        setIsLoading(true);

        try {
            let response;
            
            if (imageUri && !imageUri.startsWith('http')) {
                const formData = new FormData();
                formData.append('nome', name);
                formData.append('username', username);
                
                const filename = imageUri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image/jpeg`;

                formData.append('profilePic', { 
                    uri: imageUri,
                    name: filename,
                    type: type,
                });

                response = await api.put('/auth/profile', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

            } else {
                 response = await api.put('/auth/profile', { 
                     nome: name,
                     username 
                 });
            }

            const updatedUser = response.data.user;
            const currentToken = token || await AsyncStorage.getItem('userToken');
            
            signIn(currentToken, updatedUser); 

            Alert.alert('Sucesso', 'Perfil atualizado!');
            navigation.goBack(); 

        } catch (error) {
            console.error('Erro ao atualizar:', error);
            const msg = error.response?.data?.message || 'Erro ao atualizar perfil.';
            Alert.alert('Erro', msg);
        } finally {
            setIsLoading(false);
        }
    };
    
    const displayImage = imageUri ? { uri: imageUri } : { uri: 'https://via.placeholder.com/100/CCCCCC/FFFFFF?text=U' };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Editar Perfil</Text>
                <TouchableOpacity onPress={handleUpdate} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator color="#3897f0" />
                    ) : (
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    )}
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.content}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    
                    <TouchableOpacity style={styles.avatarSection} onPress={handlePickImage}>
                        <Image source={displayImage} style={styles.avatar} />
                        <Text style={styles.changeAvatarText}>Mudar Foto</Text>
                    </TouchableOpacity>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Seu nome"
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nome de usuário</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="usuario"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}