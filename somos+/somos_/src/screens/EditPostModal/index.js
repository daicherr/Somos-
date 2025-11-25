import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
// 1. Importa API
import api from '../../services/api';
import styles from './styles';

export default function EditPostModal({ route, navigation }) {
    const { postId, currentTitle, currentDescription } = route.params;
    const [title, setTitle] = useState(currentTitle);
    const [description, setDescription] = useState(currentDescription);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async () => {
        if (!title || !description) {
            Alert.alert('Erro', 'Título e descrição não podem ficar vazios.');
            return;
        }
        setIsLoading(true);
        try {
            // 2. Usa api.put
            await api.put(`/posts/${postId}`, {
                titulo: title,
                descricao: description,
            });
            Alert.alert('Sucesso', 'Postagem atualizada!');
            navigation.goBack(); 
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível atualizar a postagem.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="close" size={30} color="#000" /></TouchableOpacity>
                <Text style={styles.title}>Editar Postagem</Text>
                <TouchableOpacity onPress={handleUpdate} disabled={isLoading}><Text style={styles.saveButtonText}>Salvar</Text></TouchableOpacity>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <TextInput style={styles.input} placeholder="Título da Postagem" placeholderTextColor="#999" value={title} onChangeText={setTitle} />
                    <TextInput style={[styles.input, styles.textArea]} placeholder="Descrição..." placeholderTextColor="#999" value={description} onChangeText={setDescription} multiline />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}