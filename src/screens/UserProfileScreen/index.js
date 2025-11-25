import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Image, Dimensions, ActivityIndicator, TouchableOpacity, Text, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import styles from './styles';

// Placeholder de alta qualidade
const placeholderPic = { uri: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=U' };
const { width } = Dimensions.get('window');

export default function UserProfileScreen({ route, navigation }) {
    const { userId } = route.params;
    const { user: myUser, signOut } = useContext(AuthContext);

    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);

    const myIdString = String(myUser?._id || myUser?.id);
    const targetIdString = String(userId);
    const isMyProfile = myIdString === targetIdString;

    // FUNÇÃO ROBUSTA PARA PEGAR A FOTO
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return { uri: path };
        const rootUrl = api.defaults.baseURL.replace('/api', '');
        return { uri: `${rootUrl}${path}` };
    };

    useEffect(() => {
        fetchUserProfile();
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            const response = await api.get(`/users/${userId}`);
            const data = response.data;
            setUserData(data.user);
            setUserPosts(data.posts);
            setFollowersCount(data.user.seguidores ? data.user.seguidores.length : 0);
            if (data.user.seguidores) {
                setIsFollowing(data.user.seguidores.includes(myIdString));
            }
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
            Alert.alert("Erro", "Não foi possível carregar o perfil.");
            navigation.goBack();
        } finally {
            setIsLoading(false);
        }
    };

    const handleFollow = async () => {
        if (isMyProfile) return;
        const prevFollowing = isFollowing;
        const prevCount = followersCount;
        setIsFollowing(!isFollowing);
        setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
        try {
            await api.post(`/users/${userId}/follow`);
        } catch (error) {
            setIsFollowing(prevFollowing);
            setFollowersCount(prevCount);
        }
    };

    const handleMessage = () => {
        if (!userData) return;
        navigation.navigate('MessagesTab', {
            screen: 'ChatDetail',
            params: { chatId: userData._id, name: userData.nome || userData.username }
        });
    };

    if (isLoading) return (<View style={styles.loadingContainer}><ActivityIndicator size="large" color="#000" /></View>);

    const profileImageSource = getImageUrl(userData?.profilePic) || placeholderPic;

    const renderGridItem = ({ item }) => {
        const imageUri = (item.imagens && item.imagens.length > 0) ? getImageUrl(item.imagens[0]) : null;
        return (
            <View style={styles.postGridItem}>
                {imageUri ? <Image source={imageUri} style={styles.postImage} /> : <View style={styles.postImagePlaceholder} />}
            </View>
        );
    };

    // --- LAYOUT DO HEADER IDENTICO AO DESIGN ---
    const renderProfileHeader = () => (
        <View style={styles.headerContainer}>
            {/* 1. Foto Grande Centralizada */}
            <Image source={profileImageSource} style={styles.bigProfilePic} />

            {/* 2. Nome e Username */}
            <Text style={styles.fullName}>{userData?.nome || 'Usuário'}</Text>
            <Text style={styles.username}>@{userData?.username || 'usuario'}</Text>

            {/* 3. Estatísticas Lado a Lado (Seguidores | Seguindo) */}
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statCount}>{followersCount}</Text>
                    <Text style={styles.statLabel}>Seguidores</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statCount}>{userData?.seguindo?.length || 0}</Text>
                    <Text style={styles.statLabel}>Seguindo</Text>
                </View>
            </View>

            {/* 4. Botão de Ação Largo */}
            {!isMyProfile && (
                <TouchableOpacity
                    style={[styles.actionButton, isFollowing && styles.followingButton]}
                    onPress={handleFollow}
                >
                    <Text style={[styles.actionButtonText, isFollowing && styles.followingButtonText]}>
                        {isFollowing ? 'Seguindo' : 'Seguir'}
                    </Text>
                </TouchableOpacity>
            )}

            {/* 5. Abas (Visual) */}
            <View style={styles.tabsContainer}>
                <View style={styles.activeTab}>
                    <Text style={styles.activeTabText}>Postagens</Text>
                </View>
                <Text style={styles.inactiveTabText}>Sobre</Text>
                <Text style={styles.inactiveTabText}>Fotos</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Barra Superior de Navegação */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>{userData?.username}</Text>
                <TouchableOpacity style={{ padding: 5 }} onPress={handleMessage}>
                     {!isMyProfile && <Ionicons name="chatbubble-ellipses-outline" size={24} color="#000" />}
                </TouchableOpacity>
            </View>

            <FlatList
                data={userPosts}
                renderItem={renderGridItem}
                keyExtractor={item => item._id}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderProfileHeader}
                style={styles.gallery}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma publicação.</Text>}
            />
        </SafeAreaView>
    );
}