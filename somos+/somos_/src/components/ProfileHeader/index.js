import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import styles from './styles';

// Imagem padrão garantida
const placeholderPic = { uri: 'https://via.placeholder.com/100/CCCCCC/FFFFFF?text=U' };

export default function ProfileHeader({ profileData, onLogout, isMyProfile }) {
  const navigation = useNavigation();

  const StatItem = ({ count, label }) => (
      <View style={styles.statItem}>
          <Text style={styles.statCount}>{count}</Text>
          <Text style={styles.statLabel}>{label}</Text>
      </View>
  );

  // Lógica reforçada: Se tiver profilePic, usa. Se for null/undefined, usa placeholder.
  const imageSource = profileData?.profilePic ? profileData.profilePic : placeholderPic;

  return (
    <View style={styles.container}>
      
      <View style={styles.userInfoSection}>
        {/* Adicionei key para forçar re-render se a URL mudar (opcional, mas ajuda) */}
        <Image 
            key={imageSource.uri} 
            source={imageSource} 
            style={styles.profilePic} 
        />
        
        <View style={styles.nameAndAction}>
          <Text style={styles.profileName}>{profileData?.name || 'Usuário'}</Text>
          <Text style={styles.profileUsername}>{profileData?.username || '@usuario'}</Text>
          
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              
              {isMyProfile && (
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: '#eee', flex: 1 }]} 
                    onPress={() => navigation.navigate('EditProfileModal')}
                  >
                      <Text style={[styles.actionButtonText, { color: '#000' }]}>Editar Perfil</Text>
                  </TouchableOpacity>
              )}

              {onLogout && (
                <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: '#ffeded', width: 40 }]} 
                    onPress={onLogout}
                >
                    <Ionicons name="log-out-outline" size={20} color="#d44" />
                </TouchableOpacity>
              )}
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <StatItem count={profileData?.posts || 0} label="Posts" />
        <StatItem count={profileData?.followers || 0} label="seguidores" />
        <StatItem count={profileData?.following || 0} label="Seguindo" />
      </View>
      
      <View style={styles.internalMenu}>
        <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="grid-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="bookmark-outline" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="people-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

    </View>
  );
}