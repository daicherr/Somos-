import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function ChatListItem({ item, onPress }) {
  
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      
      {/* Imagem/Avatar */}
      <Image 
        source={{ uri: item.avatar }} 
        style={styles.avatar} 
      />
      
      {/* Área de Texto */}
      <View style={styles.textContainer}>
        <View style={styles.nameRow}>
          <Text 
            style={[styles.name, !item.isRead && styles.unreadText]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <Text 
          style={[styles.lastMessage, !item.isRead && styles.unreadText]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
      
      {/* Indicador de Mensagem Não Lida */}
      {!item.isRead && <View style={styles.unreadBadge} />}

    </TouchableOpacity>
  );
}