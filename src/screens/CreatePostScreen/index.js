import React, { useState, useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
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
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; 
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import api from '../../services/api'; 
import styles from './styles'; 

export default function CreatePostScreen({ navigation }) {
    const { token } = useContext(AuthContext); 
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [imageUri, setImageUri] = useState(null); 
    const [postType, setPostType] = useState('post'); 

    const handleImageUpload = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                Alert.alert('Permissão negada', 'Precisamos de acesso à sua galeria para postar fotos.');
                return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                // VOLTAMOS PARA MediaTypeOptions (Funciona, mesmo com aviso)
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true, 
                aspect: [4, 3],
                quality: 0.7,
            });

            if (!pickerResult.canceled) {
                setImageUri(pickerResult.assets[0].uri);
            }
        } catch (error) {
            console.error("Erro ao abrir galeria:", error);
            Alert.alert("Erro", "Não foi possível abrir a galeria.");
        }
    };

    const handlePost = async () => {
        if (!title || !description) {
            Alert.alert('Atenção', 'Por favor, preencha o título e a descrição.');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('titulo', title);
        formData.append('descricao', description);
        formData.append('postType', postType);
        
        if (imageUri) {
            const filename = imageUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image/jpeg`;

            // Adiciona o arquivo
            formData.append('imagens', { 
                uri: imageUri,
                name: filename,
                type: type,
            });
        }

        try {
            await api.post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });

            Alert.alert('Sucesso', `${postType === 'story' ? 'Story' : 'Post'} publicado!`);
            
            setTitle('');
            setDescription('');
            setPostType('post');
            setImageUri(null); 
            
            navigation.navigate('AppMain', { screen: 'HomeTab' }); 

        } catch (error) {
            console.error("Erro no post:", error);
            const apiError = error.response?.data?.message || 'Não foi possível publicar. Tente novamente.';
            Alert.alert('Erro', apiError);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Criar Nova Publicação</Text>

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.content}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    
                    {/* SELETOR DE TIPO */}
                    <View style={styles.typeSelector}>
                        <TouchableOpacity 
                            style={[styles.typeButton, postType === 'post' && styles.typeButtonActive]}
                            onPress={() => setPostType('post')}
                        >
                            <Text style={[styles.typeText, postType === 'post' && styles.typeTextActive]}>Feed Post</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.typeButton, postType === 'story' && styles.typeButtonActive]}
                            onPress={() => setPostType('story')}
                        >
                            <Text style={[styles.typeText, postType === 'story' && styles.typeTextActive]}>Story</Text>
                        </TouchableOpacity>
                    </View>

                    {/* INPUTS */}
                    <TextInput
                        style={styles.input}
                        placeholder="Título"
                        placeholderTextColor="#999"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder={postType === 'story' ? "O que está acontecendo?" : "Descreva sua causa..."}
                        placeholderTextColor="#999"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                    
                    {/* PREVIEW DA IMAGEM */}
                    {imageUri && (
                        <View style={styles.imagePreviewContainer}>
                            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                            <TouchableOpacity style={styles.removeImageButton} onPress={() => setImageUri(null)}>
                                <Ionicons name="close-circle" size={28} color="#FF5555" />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* BOTÃO ADICIONAR MÍDIA */}
                    <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                        <Ionicons name="image-outline" size={24} color="#000" />
                        <Text style={styles.uploadButtonText}>
                            {imageUri ? 'Trocar Mídia' : 'Adicionar Mídia (Foto)'}
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
            
            {/* BOTÃO PUBLICAR */}
            <TouchableOpacity 
                style={[styles.postButton, isLoading && styles.postButtonDisabled]} 
                onPress={handlePost}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.postButtonText}>
                        Publicar {postType === 'story' ? 'Story' : 'no Feed'}
                    </Text>
                )}
            </TouchableOpacity>

        </SafeAreaView>
    );
}