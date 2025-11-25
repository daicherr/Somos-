import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

import NotificationItem from '../../components/NotificationItem';
import { AuthContext } from '../../context/AuthContext'; 
import styles from './styles'; 

export default function NotificationsScreen({ navigation }) {
    const { token } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const response = await api.get('/notifications');
            setNotifications(response.data);
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchNotifications();
        });
        return unsubscribe;
    }, [navigation]);

    const handleClearAll = () => {
        if (notifications.length === 0) return;
        Alert.alert("Limpar", "Apagar todas as notificações?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Sim", style: "destructive", onPress: async () => {
                try {
                    await api.delete('/notifications');
                    setNotifications([]); 
                } catch (error) { Alert.alert("Erro", "Falha ao limpar."); }
            }}
        ]);
    };

    const handleNotificationPress = (item) => {
        // Agora navega na mesma Stack, permitindo voltar!
        if (item.remetente?._id) {
            navigation.navigate('UserProfile', { userId: item.remetente._id });
        }
    };

    const renderItem = ({ item }) => {
        const getImageUrl = (path) => {
            if (!path) return null;
            if (path.startsWith('http')) return path;
            const rootUrl = api.defaults.baseURL.replace('/api', '');
            return `${rootUrl}${path}?t=${new Date().getTime()}`;
        };

        // Texto bonito e limpo
        let actionText = 'interagiu com você.';
        if (item.tipo === 'like') actionText = 'curtiu sua publicação.';
        if (item.tipo === 'follow') actionText = 'começou a seguir você.';
        if (item.tipo === 'comment') actionText = 'comentou no seu post.';

        const adaptedItem = {
            id: item._id,
            username: item.remetente?.nome || 'Usuário',
            avatar: getImageUrl(item.remetente?.profilePic),
            time: new Date(item.criadoEm).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
            actionType: item.tipo,
            action: actionText,
            remetente: item.remetente // Passamos o objeto completo se precisar
        };

        return (
            <NotificationItem 
                item={adaptedItem} 
                onPress={() => handleNotificationPress(item)} 
            />
        );
    };

    if (isLoading) return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#000" /></View>;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* HEADER PIXEL PERFECT */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Atividades</Text>
                {notifications.length > 0 && (
                    <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
                        <Ionicons name="trash-outline" size={22} color="#FF3B30" />
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma notificação recente.</Text>}
            />
        </SafeAreaView>
    );
}