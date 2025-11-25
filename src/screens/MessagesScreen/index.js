import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import styles from './styles';

export default function MessagesScreen({ navigation }) {
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/chat');
            setUsersList(response.data);
        } catch (error) {
            console.error("Erro ao buscar contatos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUsers();
        }, [])
    );

    const handleChatPress = (contactUser) => {
        navigation.navigate('ChatDetail', { 
            chatId: contactUser._id, 
            name: contactUser.nome || contactUser.username,
            profilePic: contactUser.profilePic // Passamos a foto para usar no banner
        });
    };

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return { uri: path };
        const rootUrl = api.defaults.baseURL.replace('/api', '');
        return { uri: `${rootUrl}${path}` };
    };

    const renderItem = ({ item }) => {
        const isBot = item.username === 'assistente_ia';
        const avatarUrl = item.profilePic 
            ? getImageUrl(item.profilePic)
            : { uri: `https://via.placeholder.com/100/${isBot ? '000000' : 'CCCCCC'}/FFFFFF?text=${item.nome.charAt(0)}` };

        return (
            <TouchableOpacity style={styles.cardItem} onPress={() => handleChatPress(item)} activeOpacity={0.7}>
                <Image source={avatarUrl} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.nome} {isBot && "🤖"}</Text>
                    <Text style={styles.lastMessage} numberOfLines={2}>
                        {isBot ? "Clique para pedir ajuda." : "Toque para iniciar uma conversa."}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const filteredUsers = usersList.filter(u => 
        u.nome.toLowerCase().includes(searchText.toLowerCase()) || 
        u.username.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.bgDecoration} />
            
            {/* Header Customizado */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <Ionicons name="menu" size={28} color="#000" />
            </View>

            <Text style={styles.headerTitle}>Mensagens</Text>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" />
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar ONGs ou contatos..."
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {isLoading ? (
                <ActivityIndicator style={{marginTop: 20}} color="#000" />
            ) : (
                <FlatList
                    data={filteredUsers}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={styles.emptyText}>Nenhum contato encontrado.</Text>}
                />
            )}
        </View>
    );
}