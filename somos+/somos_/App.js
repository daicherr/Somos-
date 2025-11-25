import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { AuthContext, AuthProvider } from './src/context/AuthContext'; 

import OnboardingScreen from './src/screens/OnboardingScreen';
import MainAppNavigator from './src/navigation/MainAppNavigator';

// Modais Globais
import CreatePostScreen from './src/screens/CreatePostScreen'; 
import CommentsModal from './src/screens/CommentsModal'; 
import EditPostModal from './src/screens/EditPostModal';
import EditProfileModal from './src/screens/EditProfileModal'; // 1. NOVO IMPORT

const Stack = createNativeStackNavigator();

const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
    </View>
);

const AppStack = () => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <LoadingScreen />;
    }
    
    return (
        <Stack.Navigator 
            key={user ? "userStack" : "guestStack"} 
            screenOptions={{ headerShown: false }}
        >
            {user ? (
                <>
                    <Stack.Screen name="AppMain" component={MainAppNavigator} />
                    
                    <Stack.Screen 
                        name="CreatePost" 
                        component={CreatePostScreen} 
                        options={{ presentation: 'modal', animation: 'slide_from_bottom' }} 
                    />
                    <Stack.Screen 
                        name="CommentsModal" 
                        component={CommentsModal} 
                        options={{ presentation: 'modal', animation: 'slide_from_bottom' }} 
                    />
                    <Stack.Screen 
                        name="EditPostModal" 
                        component={EditPostModal} 
                        options={{ presentation: 'modal', animation: 'slide_from_bottom' }} 
                    />
                    
                    {/* 2. REGISTRO DO NOVO MODAL */}
                    <Stack.Screen 
                        name="EditProfileModal" 
                        component={EditProfileModal} 
                        options={{ presentation: 'modal', animation: 'slide_from_bottom' }} 
                    />
                </>
            ) : (
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            )}
        </Stack.Navigator>
    );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </AuthProvider>
  );
}