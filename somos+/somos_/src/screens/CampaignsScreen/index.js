import React, { useState } from 'react';
import { 
    View, Text, FlatList, Image, TouchableOpacity, 
    Modal, TextInput, Alert, ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

// Dados Iniciais (Mock)
const INITIAL_DATA = [
    {
        id: '1',
        title: 'Ração para o Abrigo',
        ong: 'Patinhas Felizes',
        description: 'Nosso estoque de ração está acabando. Precisamos de ajuda para alimentar 50 cães este mês.',
        meta: 2000,
        arrecadado: 1450,
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=400',
    },
    {
        id: '2',
        title: 'Reforma do Telhado',
        ong: 'Lar dos Velhinhos',
        description: 'O telhado da ala norte está com goteiras. Ajude-nos a proteger nossos idosos da chuva.',
        meta: 5000,
        arrecadado: 1200,
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=400',
    }
];

export default function CampaignsScreen() {
    const [campaigns, setCampaigns] = useState(INITIAL_DATA);
    const [modalVisible, setModalVisible] = useState(false);

    // Estados do Formulário
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newMeta, setNewMeta] = useState('');

    // --- CRUD MOCK ---
    
    // CREATE
    const handleCreate = () => {
        if (!newTitle || !newMeta) return Alert.alert("Erro", "Preencha título e meta.");
        
        const newCampaign = {
            id: Date.now().toString(),
            title: newTitle,
            ong: 'Eu (Usuário)', // Simula o usuário logado
            description: newDesc,
            meta: parseFloat(newMeta),
            arrecadado: 0,
            image: 'https://via.placeholder.com/400/00BFA5/FFFFFF?text=Nova+Campanha'
        };

        setCampaigns([newCampaign, ...campaigns]);
        setModalVisible(false);
        // Limpa form
        setNewTitle(''); setNewDesc(''); setNewMeta('');
    };

    // DELETE
    const handleDelete = (id) => {
        Alert.alert("Excluir", "Remover esta campanha?", [
            { text: "Cancelar" },
            { text: "Sim", style: 'destructive', onPress: () => {
                setCampaigns(prev => prev.filter(c => c.id !== id));
            }}
        ]);
    };

    // UPDATE (Simular Doação)
    const handleDonate = (id) => {
        setCampaigns(prev => prev.map(item => {
            if (item.id === id) {
                const novoValor = item.arrecadado + 100; // Doa 100 reais fictícios
                return { ...item, arrecadado: Math.min(novoValor, item.meta + 500) };
            }
            return item;
        }));
        Alert.alert("Obrigado! ❤️", "Sua doação de R$ 100,00 foi registrada.");
    };

    const renderItem = ({ item }) => {
        const progress = (item.arrecadado / item.meta) * 100;
        const progressPercent = `${Math.min(progress, 100)}%`;

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.ongName}>{item.ong}</Text>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <Ionicons name="trash-outline" size={20} color="#ccc" />
                    </TouchableOpacity>
                </View>

                <Image source={{ uri: item.image }} style={styles.cardImage} />
                
                <View style={styles.cardBody}>
                    <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
                    
                    {/* BARRA DE PROGRESSO */}
                    <View style={styles.progressContainer}>
                        <View style={styles.progressLabels}>
                            <Text style={styles.moneyText}>R$ {item.arrecadado}</Text>
                            <Text style={styles.metaText}>Meta: R$ {item.meta}</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: progressPercent }]} />
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.donateButton} 
                        onPress={() => handleDonate(item.id)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.donateButtonText}>Doar R$ 100,00</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Campanhas</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={campaigns}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 15, paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
            />

            {/* MODAL DE CRIAÇÃO RÁPIDA */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Nova Campanha</Text>
                        
                        <TextInput 
                            style={styles.input} 
                            placeholder="Título da Causa" 
                            value={newTitle} onChangeText={setNewTitle} 
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Meta (R$)" 
                            keyboardType="numeric"
                            value={newMeta} onChangeText={setNewMeta} 
                        />
                        <TextInput 
                            style={[styles.input, styles.textArea]} 
                            placeholder="Descrição breve..." 
                            multiline
                            value={newDesc} onChangeText={setNewDesc} 
                        />

                        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                            <Text style={styles.createButtonText}>Criar Campanha</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}