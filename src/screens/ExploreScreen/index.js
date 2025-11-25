import React, { useState, useEffect } from 'react';
import { 
    View, TextInput, FlatList, Image, TouchableOpacity, 
    ActivityIndicator, Text, Keyboard 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';

const placeholderAvatar = { uri: 'https://via.placeholder.com/50/CCCCCC/FFFFFF?text=U' };

export default function ExploreScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return { uri: path };
        const rootUrl = api.defaults.baseURL.replace('/api', '');
        return { uri: `${rootUrl}${path}` };
    };

    const fetchFeed = async () => {
        setLoading(true);
        try {
            const response = await api.get('/posts');
            const imagesOnly = response.data.filter(post => post.imagens && post.imagens.length > 0);
            setPosts(imagesOnly);
        } catch (error) {
            console.error("Erro feed:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchUsers = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        try {
            const response = await api.get(`/users?search=${query}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Erro busca:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchFeed(); }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchText.length > 0) searchUsers(searchText);
            else setSearchResults([]);
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    const renderGridItem = ({ item }) => (
        <TouchableOpacity style={styles.gridItem}>
             <Image source={getImageUrl(item.imagens[0])} style={styles.gridImage} />
        </TouchableOpacity>
    );

    const renderUserItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.userItem} 
            onPress={() => navigation.navigate('UserProfile', { userId: item._id })}
        >
            <Image 
                source={item.profilePic ? getImageUrl(item.profilePic) : placeholderAvatar} 
                style={styles.userAvatar} 
            />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.username}</Text>
                <Text style={styles.userFullName}>{item.nome}</Text>
            </View>
        </TouchableOpacity>
    );

    const isSearching = searchText.length > 0;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* HEADER COM BUSCA ESTILIZADA E VOLTAR */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                
                <View style={styles.searchBarWrapper}>
                    <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="Pesquisar"
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                        autoFocus={true}
                    />
                    {isSearching && (
                        <TouchableOpacity onPress={() => { setSearchText(''); setSearchResults([]); }}>
                            <Ionicons name="close-circle" size={20} color="#ccc" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {loading && isSearching ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    key={isSearching ? 'list' : 'grid'}
                    data={isSearching ? searchResults : posts}
                    renderItem={isSearching ? renderUserItem : renderGridItem}
                    keyExtractor={item => item._id}
                    numColumns={isSearching ? 1 : 3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            {isSearching ? "Nenhum resultado." : "Nada para explorar."}
                        </Text>
                    }
                />
            )}
        </SafeAreaView>
    );
}