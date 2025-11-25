import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

import PostCard from '../../components/PostCard';
import StoriesBar from '../../components/StoriesBar';
import styles from './styles';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    const [feedPosts, setFeedPosts] = useState([]);
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPosts = async () => {
        try {
            
            const response = await api.get('/posts/feed'); 
            
            const allData = response.data;
            setStories(allData.filter(item => item.postType === 'story'));
            setFeedPosts(allData.filter(item => item.postType !== 'story'));
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => { fetchPosts(); }, []);
    useFocusEffect(useCallback(() => { fetchPosts(); }, []));

    const onRefresh = () => {
        setRefreshing(true);
        fetchPosts();
    };

    // Ação ao clicar na busca
    const handleSearchPress = () => {
        // Navega para a tela de Explorar (agora registrada no MainAppNavigator)
        navigation.navigate('ExploreMain');
    };

    // Cabeçalho da Lista (Stories + Busca)
    const renderHeaderList = () => (
        <View style={{ paddingBottom: 10 }}>
            
            {/* BARRA DE BUSCA FUNCIONAL */}
            <TouchableOpacity 
                style={styles.searchContainer} 
                activeOpacity={0.9} 
                onPress={handleSearchPress}
            >
                <Ionicons name="search-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                {/* Usamos Text em vez de TextInput para parecer um botão e não abrir teclado aqui */}
                <Text style={{ flex: 1, fontSize: 14, color: '#999' }}>
                    Buscar ONGs...
                </Text>
            </TouchableOpacity>

            {/* STORIES */}
            <StoriesBar stories={stories} />
        </View>
    );

    if (isLoading) return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#000" /></View>;

    return (
        <View style={styles.container}>
            {/* FORMA ORGÂNICA DE FUNDO (A mancha verde do design) */}
            <View style={styles.backgroundBlob} />

            <SafeAreaView style={{ flex: 1 }}>
                {/* CABEÇALHO */}
                <View style={styles.headerBar}>
                    <Text style={styles.appName}>Somos +</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('NotificationsTab')}>
                        <Ionicons name="notifications" size={26} color="#000" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={feedPosts}
                    renderItem={({ item }) => <PostCard item={item} />}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderHeaderList}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma postagem.</Text>}
                />
            </SafeAreaView>
        </View>
    );
}