import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones

const placeholderAvatar = { uri: 'https://via.placeholder.com/40/38bdf8/FFFFFF?text=P' };

export default function NotificationItem({ item, onPress }) {
    
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <Image 
                    source={item.avatar ? { uri: item.avatar } : placeholderAvatar} 
                    style={styles.avatar} 
                />
                
                {/* Ícone Sobreposto (Badge) - Bonito e Clean */}
                {item.actionType === 'follow' && (
                    <View style={[styles.iconBadge, { backgroundColor: '#0095F6' }]}>
                        <Ionicons name="person-add" size={10} color="#fff" />
                    </View>
                )}
                {item.actionType === 'like' && (
                    <View style={[styles.iconBadge, { backgroundColor: '#FF3B30' }]}>
                        <Ionicons name="heart" size={10} color="#fff" />
                    </View>
                )}
                {item.actionType === 'comment' && (
                    <View style={[styles.iconBadge, { backgroundColor: '#34C759' }]}>
                        <Ionicons name="chatbubble" size={10} color="#fff" />
                    </View>
                )}
            </View>
            
            {/* Texto */}
            <View style={styles.textContainer}>
                <Text style={styles.notificationText} numberOfLines={2}>
                    <Text style={styles.usernameText}>{item.username}</Text> 
                    <Text style={styles.actionText}> {item.action}</Text>
                </Text>
                <Text style={styles.timestamp}>{item.time}</Text>
            </View>

            {/* Opcional: Miniatura do post se for like */}
            {item.actionType === 'like' && (
                <View style={styles.postThumbnail}>
                     {/* Se tiver a imagem do post no item, renderize aqui */}
                     <Ionicons name="image-outline" size={16} color="#ccc" />
                </View>
            )}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#eee',
        borderWidth: 1, // Borda sutil
        borderColor: '#f0f0f0',
    },
    iconBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff', // Cria separação branca do avatar
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    notificationText: {
        fontSize: 14,
        color: '#262626',
        lineHeight: 18,
    },
    usernameText: {
        fontWeight: 'bold',
    },
    actionText: {
        color: '#262626',
    },
    timestamp: {
        fontSize: 12,
        color: '#8e8e8e',
        marginTop: 2,
    },
    postThumbnail: {
        width: 40,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});