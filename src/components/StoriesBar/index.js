import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

const { width, height } = Dimensions.get('window');
const placeholderAvatar = { uri: 'https://via.placeholder.com/100/CCCCCC/FFFFFF?text=U' };

export default function StoriesBar({ stories }) {
    const [selectedStory, setSelectedStory] = useState(null);

    // Helper robusto para imagem
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return { uri: path };
        const rootUrl = api.defaults.baseURL.replace('/api', '');
        return { uri: `${rootUrl}${path}` };
    };

    const handleStoryPress = (story) => setSelectedStory(story);
    const closeStory = () => setSelectedStory(null);

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Botão "Seu Story" */}
                <TouchableOpacity style={styles.storyItem}>
                    <View style={[styles.avatarContainer, { borderColor: '#ddd', borderStyle: 'dashed' }]}>
                        <Image source={placeholderAvatar} style={styles.avatar} />
                        <View style={styles.addIcon}>
                            <Ionicons name="add" size={14} color="#fff" />
                        </View>
                    </View>
                    <Text style={styles.username}>Criar</Text>
                </TouchableOpacity>

                {/* Lista de Stories */}
                {stories && stories.map((story) => {
                    // Tenta pegar a imagem com segurança
                    const profileUri = story.autorId?.profilePic;
                    const avatarSource = profileUri ? getImageUrl(profileUri) : placeholderAvatar;

                    return (
                        <TouchableOpacity 
                            key={story._id} 
                            style={styles.storyItem}
                            onPress={() => handleStoryPress(story)}
                        >
                            <View style={[styles.avatarContainer, styles.activeStoryBorder]}>
                                <Image 
                                    source={avatarSource} 
                                    style={styles.avatar} 
                                    resizeMode="cover"
                                />
                            </View>
                            <Text style={styles.username} numberOfLines={1}>
                                {story.autorId?.nome?.split(' ')[0] || 'Usuário'}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* MODAL DE VISUALIZAÇÃO */}
            <Modal
                visible={selectedStory !== null}
                transparent={true}
                animationType="slide"
                onRequestClose={closeStory}
            >
                <View style={styles.modalContainer}>
                    {selectedStory && selectedStory.imagens.length > 0 && (
                        <Image 
                            source={getImageUrl(selectedStory.imagens[0])} 
                            style={styles.fullImage} 
                            resizeMode="cover"
                        />
                    )}
                    
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBar} />
                    </View>

                    <View style={styles.storyHeader}>
                        <Image 
                            source={selectedStory?.autorId?.profilePic ? getImageUrl(selectedStory.autorId.profilePic) : placeholderAvatar} 
                            style={styles.headerAvatar} 
                        />
                        <Text style={styles.headerName}>
                            {selectedStory?.autorId?.nome || 'Usuário'}
                        </Text>
                        <TouchableOpacity onPress={closeStory}>
                            <Ionicons name="close" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {selectedStory?.descricao && (
                        <View style={styles.storyFooter}>
                            <Text style={styles.caption}>{selectedStory.descricao}</Text>
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        backgroundColor: 'transparent', // Transparente para o fundo da Home aparecer
    },
    scrollContent: {
        paddingHorizontal: 15,
    },
    storyItem: {
        alignItems: 'center',
        marginRight: 15,
        width: 70,
    },
    avatarContainer: {
        width: 68,
        height: 68,
        borderRadius: 34,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderWidth: 2,
        backgroundColor: '#fff',
    },
    activeStoryBorder: {
        borderColor: '#3897f0', // Azul estilo Instagram ou Verde do seu tema
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 34,
        backgroundColor: '#eee',
    },
    username: {
        fontSize: 11,
        color: '#333',
        textAlign: 'center',
        fontWeight: '500',
    },
    addIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#000',
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    // Modal Styles
    modalContainer: { flex: 1, backgroundColor: '#000' },
    fullImage: { width: width, height: height },
    storyHeader: {
        position: 'absolute', top: 50, left: 0, width: '100%',
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, zIndex: 10
    },
    headerAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10, borderWidth: 1, borderColor: '#fff' },
    headerName: { color: '#fff', fontWeight: 'bold', fontSize: 16, flex: 1 },
    storyFooter: {
        position: 'absolute', bottom: 50, width: '100%', paddingHorizontal: 20, alignItems: 'center'
    },
    caption: { color: '#fff', fontSize: 16, textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 5 },
    progressBarContainer: {
        position: 'absolute', top: 40, width: '90%', height: 3, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, alignSelf: 'center'
    },
    progressBar: { width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 2 }
});