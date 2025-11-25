import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
    View, Text, FlatList, TextInput, TouchableOpacity, 
    KeyboardAvoidingView, Platform, ActivityIndicator, 
    Image, SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import styles from './styles';

const placeholderAvatar = { uri: 'https://via.placeholder.com/100/CCCCCC/FFFFFF?text=U' };

export default function ChatDetailScreen({ navigation, route }) {
    const { user } = useContext(AuthContext);
    const { chatId, name } = route.params || {};

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);

    // --- CORREÇÃO: NAVEGAÇÃO NATURAL ---
    const handleBackPress = () => {
        // goBack() retorna para a tela anterior da pilha (histórico).
        // Se veio do Perfil -> Volta pro Perfil.
        // Se veio da Lista -> Volta pra Lista.
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            // Fallback de segurança: se não tiver histórico, vai pra Home
            navigation.navigate('HomeTab');
        }
    };

    const fetchMessages = async () => {
        if (!chatId) return;
        try {
            const response = await api.get(`/chat/${chatId}`);
            setMessages(Array.isArray(response.data) ? response.data.reverse() : []);
        } catch (error) {
            console.error("Erro chat:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (text.trim().length === 0) return;
        const msgTemp = text;
        setText('');

        try {
            const response = await api.post('/chat/send', {
                destinatarioId: chatId,
                texto: msgTemp
            });
            setMessages(prev => [response.data, ...prev]);
        } catch (error) {
            console.error("Erro ao enviar:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [chatId]);

    const renderItem = ({ item }) => {
        const remetenteId = item.remetente?._id || item.remetente;
        const meuId = user?._id || user?.id;
        const isMe = remetenteId === meuId;

        return (
            <View style={[styles.bubbleContainer, isMe ? styles.senderWrapper : styles.receiverWrapper]}>
                <View style={[styles.messageBubble, isMe ? styles.senderBubble : styles.receiverBubble]}>
                    <Text style={isMe ? styles.senderText : styles.receiverText}>
                        {item.texto}
                    </Text>
                    <Text style={isMe ? styles.senderTime : styles.receiverTime}>
                        {new Date(item.criadoEm).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F2F4F5' }}>
            <SafeAreaView style={{ backgroundColor: '#fff' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={26} color="#1A1A1A" />
                    </TouchableOpacity>
                    
                    <View style={styles.headerProfileContainer}>
                        <Image source={placeholderAvatar} style={styles.headerAvatar} />
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerTitle} numberOfLines={1}>{name || "Chat"}</Text>
                            <Text style={styles.headerStatus}>Online</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : undefined} 
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
                {loading && messages.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#00BFA5" />
                    </View>
                ) : (
                    <FlatList
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={item => item._id || Math.random().toString()}
                        inverted
                        contentContainerStyle={styles.messagesList}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>Nenhuma mensagem ainda.</Text>
                            </View>
                        }
                    />
                )}

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Digite uma mensagem..."
                        placeholderTextColor="#999"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.8}>
                        <Ionicons name="send" size={20} color="#fff" style={{ marginLeft: 2 }} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}