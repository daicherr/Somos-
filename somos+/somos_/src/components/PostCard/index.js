import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// 1. IMPORTA A API CENTRALIZADA (Que tem o Token)
import api from '../../services/api';
import styles from './styles';
import { AuthContext } from '../../context/AuthContext';

const placeholderUserPic = { uri: 'https://via.placeholder.com/40/CCCCCC/FFFFFF?text=U' };

// Função auxiliar para formatar a data
const formatPostDate = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = (now - postDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return `${Math.round(diffInHours)}h atrás`;
    }
    return postDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
};

export default function PostCard({ item }) {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  
  const authorName = item.autorId?.nome || 'Usuário Desconhecido';
  const authorUsername = item.autorId?.username; 
  const authorId = item.autorId?._id || item.autorId;
  
  // Verificação segura de ID
  const myUserId = user?._id || user?.id; 
  const isMyPost = String(authorId) === String(myUserId);

  // --- TRATAMENTO DE IMAGEM DINÂMICO ---
  const getImageUrl = (path) => {
      if (!path) return null;
      if (path.startsWith('http')) return { uri: path };
      
      // Pega o IP do api.js e remove o '/api' do final para chegar na raiz
      // Ex: http://192.168.x.x:8000/api -> http://192.168.x.x:8000
      const rootUrl = api.defaults.baseURL.replace('/api', '');
      return { uri: `${rootUrl}${path}` };
  };

  const profilePic = getImageUrl(item.autorId?.profilePic) || placeholderUserPic;
  const formattedDate = formatPostDate(item.data);
  const postImage = (item.imagens && item.imagens.length > 0) ? getImageUrl(item.imagens[0]) : null;

  // Estados de Interação
  const userHasLiked = item.likes ? item.likes.includes(myUserId) : false;
  const [liked, setLiked] = useState(userHasLiked);
  const [likeCount, setLikeCount] = useState(item.likes ? item.likes.length : 0);
  const [commentsCount, setCommentsCount] = useState(item.commentsCount || 0);

  // --- HANDLERS ---

  const handleLike = async () => {
    const previousLiked = liked;
    const previousCount = likeCount;
    
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    try {
      // 2. USA api.post (O token vai automático)
      await api.post(`/posts/${item._id}/like`);
    } catch (error) {
      console.error("Erro no like:", error);
      // Reverte se der erro
      setLiked(previousLiked);
      setLikeCount(previousCount);
      if (error.response?.status === 401) {
          Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
      }
    }
  };

  const handleDeletePost = async () => {
    try {
        // 3. USA api.delete
        await api.delete(`/posts/${item._id}`); 
        Alert.alert("Sucesso", "Postagem excluída.");
        navigation.navigate('HomeFeedMain'); // Força refresh na Home
    } catch (error) {
        Alert.alert("Erro", "Não foi possível excluir a postagem.");
    }
  };

  const handleCommentPress = () => {
      navigation.navigate('CommentsModal', { 
          postId: item._id,
          onCommentCountUpdate: (newCount) => {
              setCommentsCount(newCount);
          }
      });
  };
  
  const handleProfilePress = () => {
      navigation.navigate('UserProfile', { userId: authorId });
  };

  const handleEditPress = () => {
        navigation.navigate('EditPostModal', { 
            postId: item._id, 
            currentTitle: item.titulo, 
            currentDescription: item.descricao,
        });
  };

  const handleMenuPress = () => {
    const options = [{ text: "Cancelar", style: "cancel" }];

    if (isMyPost) {
        options.unshift({ 
            text: "Excluir Postagem", 
            style: "destructive", 
            onPress: () => {
                Alert.alert(
                    "Confirmar Exclusão",
                    "Tem certeza que deseja apagar esta postagem?",
                    [{ text: "Não", style: "cancel" }, { text: "Sim", style: "destructive", onPress: handleDeletePost }]
                );
            }
        });
        options.unshift({
            text: "Editar Postagem",
            onPress: handleEditPress,
        });
    } else {
        options.unshift({ text: "Reportar Postagem", onPress: () => Alert.alert("Reportar", "Funcionalidade em desenvolvimento.")});
    }

    Alert.alert("Opções da Postagem", "", options);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} onPress={handleProfilePress}>
            <Image source={profilePic} style={styles.profilePic} />
            <View style={styles.headerInfo}>
                <Text style={styles.username}>{authorUsername || authorName}</Text> 
                {item.postType === 'campanha' && <Text style={{ color: 'orange', fontSize: 10, fontWeight: 'bold' }}>CAMPANHA</Text>}
                <Text style={styles.timestamp}>{formattedDate}</Text>
            </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleMenuPress}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {item.titulo && <Text style={[styles.description, { fontWeight: 'bold', marginBottom: 5 }]}>{item.titulo}</Text>}
      <Text style={styles.description}>{item.descricao}</Text>
      
      {postImage && <Image source={postImage} style={styles.postImage} />}
      
      <View style={styles.footer}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Ionicons name={liked ? "heart" : "heart-outline"} size={24} color={liked ? "#e91e63" : "#333"} />
            <Text style={[styles.actionText, liked && { color: '#e91e63', fontWeight: 'bold' }]}>{likeCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleCommentPress}>
            <Ionicons name="chatbubble-outline" size={24} color="#333" />
            <Text style={styles.actionText}>{commentsCount}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity><Ionicons name="share-outline" size={24} color="#333" /></TouchableOpacity>
      </View>
    </View>
  );
}