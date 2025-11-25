import React, { useContext, useState, useCallback } from 'react';
import { View, FlatList, Image, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import styles from './styles';

const placeholderPic = { uri: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=U' };

export default function ProfileScreen({ navigation }) {
    const { user, signOut } = useContext(AuthContext); 
    const [myPosts, setMyPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- HELPER DE DEBUG DA IMAGEM ---
    const getImageUrl = (path) => {
        if (!path) return null;
        
        // 1. Se for link externo (http)
        if (path.startsWith('http')) return { uri: path };
        
        // 2. Monta a URL do servidor local
        const rootUrl = api.defaults.baseURL.replace('/api', ''); 
        const finalUrl = `${rootUrl}${path}`;
        
        // LOG DE DEBUG (Vai aparecer no seu terminal)
        console.log("--- DEBUG IMAGEM ---");
        console.log("Caminho no Banco:", path);
        console.log("URL Final Gerada:", finalUrl);
        
        return { uri: finalUrl };
    };

    const fetchMyData = async () => {
        try {
            const response = await api.get('/posts/me');
            setMyPosts(response.data);
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchMyData();
        }, [])
    );

    const handleEditProfile = () => {
        navigation.navigate('EditProfileModal');
    };

    const handleDeletePost = (postId) => {
        Alert.alert(
            "Excluir", "Apagar esta postagem?",
            [{ text: "Não", style: "cancel" }, { 
                text: "Sim", style: "destructive", 
                onPress: async () => {
                    try {
                        await api.delete(`/posts/${postId}`);
                        setMyPosts(prev => prev.filter(p => p._id !== postId));
                    } catch (e) { Alert.alert("Erro", "Falha ao excluir."); }
                }
            }]
        );
    };

    if (isLoading) return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#000" /></View>;

    const profileImageSource = user?.profilePic ? getImageUrl(user.profilePic) : placeholderPic;

    const renderProfileHeader = () => (
        <View style={styles.headerContainer}>
            <Image 
                source={profileImageSource} 
                style={styles.bigProfilePic}
                // LOG DE ERRO DO COMPONENTE
                onError={(e) => console.log("ERRO NO COMPONENTE IMAGE:", e.nativeEvent.error)}
            />

            <Text style={styles.fullName}>{user?.nome || 'Usuário'}</Text>
            <Text style={styles.username}>@{user?.username || 'usuario'}</Text>

            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statCount}>{myPosts.length}</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statCount}>{user?.seguidores?.length || 0}</Text>
                    <Text style={styles.statLabel}>Seguidores</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statCount}>{user?.seguindo?.length || 0}</Text>
                    <Text style={styles.statLabel}>Seguindo</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
                <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
            </TouchableOpacity>

            <View style={styles.tabsContainer}>
                <View style={styles.activeTab}>
                    <Text style={styles.activeTabText}>Postagens</Text>
                </View>
                <Text style={styles.inactiveTabText}>Curtidas</Text>
            </View>
        </View>
    );

    const renderGridItem = ({ item }) => (
        <View style={styles.postGridItem}>
            <Image 
                source={item.imagens?.length ? getImageUrl(item.imagens[0]) : placeholderPic} 
                style={styles.postImage} 
            />
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePost(item._id)}>
                <Ionicons name="trash-outline" size={16} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <Text style={styles.navTitle}>{user?.username}</Text>
                <TouchableOpacity onPress={signOut}>
                    <Ionicons name="log-out-outline" size={24} color="#D32F2F" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={myPosts}
                renderItem={renderGridItem}
                keyExtractor={item => item._id}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderProfileHeader}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma postagem ainda.</Text>}
            />
        </SafeAreaView>
    );
}