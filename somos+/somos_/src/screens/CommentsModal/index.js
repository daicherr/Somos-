import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// 1. CORREÇÃO: Importar a API centralizada (que carrega o Token)
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import styles from './styles';

export default function CommentsModal({ route, navigation }) {
    const { user } = useContext(AuthContext); 
    const { postId, onCommentCountUpdate } = route.params; 

    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const flatListRef = useRef(null);

    // --- BUSCA COMENTÁRIOS ---
    const fetchComments = async () => {
        try {
            // 2. CORREÇÃO: Usar api.get com rota relativa
            const response = await api.get(`/comments/${postId}`);
            setComments(response.data);
        } catch (error) {
            console.error("Erro ao buscar comentários:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    // --- ENVIAR COMENTÁRIO ---
    const handleSendComment = async () => {
        if (newCommentText.trim() === '') return;

        const textToSend = newCommentText.trim();
        setNewCommentText('');
        
        // Simulação Otimista (aparece na hora)
        const tempComment = {
            _id: Date.now().toString(),
            autorId: { 
                _id: user._id || user.id, 
                nome: user.nome, 
                username: user.username,
                profilePic: user.profilePic // Se tiver foto, usa ela
            },
            texto: textToSend,
            criadoEm: new Date(),
        };

        setComments(prev => [...prev, tempComment]);
        
        try {
            // 3. CORREÇÃO: Usar api.post (O token vai automático)
            await api.post(`/comments/${postId}`, { texto: textToSend });

            // Atualiza o contador lá no PostCard
            if (onCommentCountUpdate) {
                const newCount = comments.length + 1;
                onCommentCountUpdate(newCount);
            }

        } catch (error) {
            console.error("Erro ao enviar comentário:", error);
            // Remove o comentário da lista se der erro
            setComments(prev => prev.filter(c => c._id !== tempComment._id));
            alert('Não foi possível enviar o comentário. Verifique seu login.');
        }
    };

    const renderComment = ({ item }) => {
        const username = item.autorId?.username || item.autorId?.nome || 'Usuário';
        
        // Tratamento da imagem de perfil
        const getProfilePic = () => {
            if (item.autorId?.profilePic) {
                if (item.autorId.profilePic.startsWith('http')) {
                    return { uri: item.autorId.profilePic };
                }
                // Monta a URL usando a base do api.js
                const rootUrl = api.defaults.baseURL.replace('/api', '');
                return { uri: `${rootUrl}${item.autorId.profilePic}` };
            }
            return { uri: 'https://via.placeholder.com/40' };
        };

        return (
            <View style={styles.commentItem}>
                <Image source={getProfilePic()} style={styles.avatar} />
                <View style={styles.textBubble}>
                    <Text style={styles.commentText}>
                        <Text style={styles.commentUsername}>{username}</Text> {item.texto}
                    </Text>
                    <Text style={styles.commentTime}>
                        {new Date(item.criadoEm).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <SafeAreaView style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="close" size={30} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Comentários ({comments.length})</Text>
                    <View style={{ width: 30 }} />
                </View>
            </SafeAreaView>

            {isLoading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginVertical: 20 }} />
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={comments}
                    renderItem={renderComment}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListEmptyComponent={<Text style={styles.emptyText}>Seja o primeiro a comentar!</Text>}
                />
            )}

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Adicione um comentário..."
                    placeholderTextColor="#999"
                    value={newCommentText}
                    onChangeText={setNewCommentText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
                    <Ionicons name="send" size={24} color="#3897f0" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}