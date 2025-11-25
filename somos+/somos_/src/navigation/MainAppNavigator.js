import React from 'react';
import { View, Platform } from 'react-native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
    
// Telas
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ExploreScreen from '../screens/ExploreScreen'; 
import NotificationsScreen from '../screens/NotificationsScreen'; 
import ProfileScreen from '../screens/ProfileScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen'; 
import UserProfileScreen from '../screens/UserProfileScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import CampaignsScreen from '../screens/CampaignsScreen'; // NOVA IMPORTAÇÃO

const Tab = createBottomTabNavigator();

const PRIMARY_COLOR = '#000000'; 
const ACTIVE_COLOR = '#000000';
const INACTIVE_COLOR = '#999999';

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Default';
    const hideOnScreens = ['ChatDetail', 'UserProfile', 'ExploreMain']; 
    if (hideOnScreens.includes(routeName)) return 'none';
    return 'flex';
};

// 1. Home Stack (A Home já tem o sino que leva para NotificationsScreen)
const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeFeedMain" component={HomeScreen} />
        <HomeStack.Screen name="ExploreMain" component={ExploreScreen} />
        <HomeStack.Screen name="UserProfile" component={UserProfileScreen} />
        <HomeStack.Screen name="ChatDetail" component={ChatDetailScreen} />
        <HomeStack.Screen name="NotificationsTab" component={NotificationsScreen} /> 
    </HomeStack.Navigator>
);

// 2. Message Stack
const MessageStack = createNativeStackNavigator();
const MessageStackScreen = () => (
    <MessageStack.Navigator screenOptions={{ headerShown: false }}>
        <MessageStack.Screen name="MessagesList" component={MessagesScreen} /> 
        <MessageStack.Screen name="ChatDetail" component={ChatDetailScreen} /> 
        <MessageStack.Screen name="UserProfile" component={UserProfileScreen} />
    </MessageStack.Navigator>
);

// 3. NOVO: Campaign Stack (Para navegação interna se precisar)
const CampaignStack = createNativeStackNavigator();
const CampaignStackScreen = () => (
    <CampaignStack.Navigator screenOptions={{ headerShown: false }}>
        <CampaignStack.Screen name="CampaignsList" component={CampaignsScreen} />
    </CampaignStack.Navigator>
);

const EmptyComponent = () => null;
    
export default function MainAppNavigator() {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: ACTIVE_COLOR,
                    tabBarInactiveTintColor: INACTIVE_COLOR,
                    tabBarStyle: { 
                        display: getTabBarVisibility(route),
                        backgroundColor: '#fff', 
                        height: Platform.OS === 'ios' ? 85 : 65, 
                        paddingBottom: Platform.OS === 'ios' ? 25 : 10,
                        paddingTop: 10,
                        borderTopWidth: 1,
                        borderTopColor: '#f0f0f0',
                        elevation: 0, 
                    },
                })}
            >
                <Tab.Screen 
                    name="HomeTab" 
                    component={HomeStackScreen} 
                    options={{
                        tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={color} />
                    }}
                />
                
                <Tab.Screen 
                    name="MessagesTab" 
                    component={MessageStackScreen} 
                    options={{
                        tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} size={26} color={color} />
                    }}
                />

                <Tab.Screen 
                    name="CreatePostTab" 
                    component={EmptyComponent} 
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate('CreatePost');
                        },
                    })}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                width: 52, height: 52, backgroundColor: PRIMARY_COLOR, 
                                borderRadius: 26, justifyContent: 'center', alignItems: 'center',
                                marginBottom: Platform.OS === 'ios' ? 10 : 20, 
                                shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3, shadowRadius: 4, elevation: 6,
                            }}>
                                <Ionicons name="add" size={32} color="#fff" />
                            </View>
                        )
                    }}
                />

                {/* ABA 4: CAMPANHAS (No lugar do coração) */}
                <Tab.Screen 
                    name="CampaignsTab" 
                    component={CampaignStackScreen} 
                    options={{
                        // Ícone de coração com mão (solidariedade) ou coração normal
                        tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} size={28} color={color} />
                    }}
                />

                <Tab.Screen 
                    name="ProfileTab" 
                    component={ProfileScreen} 
                    options={{
                        tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? 'person' : 'person-outline'} size={26} color={color} />
                    }}
                />
            </Tab.Navigator>
        </View>
    );

}
