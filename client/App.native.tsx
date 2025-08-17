import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import Index from './pages/Index.native';
import Login from './pages/Login.native';
import Signup from './pages/Signup.native';
import Dashboard from './pages/Dashboard.native';
import AddMember from './pages/AddMember.native';
import MembersList from './pages/MembersList.native';
import MemberProfile from './pages/MemberProfile.native';
import EditMember from './pages/EditMember.native';
import DailyCollection from './pages/DailyCollection.native';
import CollectionsList from './pages/CollectionsList.native';
import MonthlyCollections from './pages/MonthlyCollections.native';
import BackupRestore from './pages/BackupRestore.native';
import AdminDashboard from './pages/AdminDashboard.native';
import SystemManagement from './pages/SystemManagement.native';
import AdminLogin from './pages/AdminLogin.native';

const Stack = createNativeStackNavigator();

// Storage helper functions
export const storage = {
  setItem: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  },
  getItem: async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#2563eb" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Index"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2563eb',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
        >
          <Stack.Screen 
            name="Index" 
            component={Index} 
            options={{ 
              title: 'সমিতি ম্যানেজার',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ title: 'লগইন' }} 
          />
          <Stack.Screen 
            name="Signup" 
            component={Signup} 
            options={{ title: 'রেজিস্ট্রেশন' }} 
          />
          <Stack.Screen 
            name="Dashboard" 
            component={Dashboard} 
            options={{ 
              title: 'ড্যাশবোর্ড',
              headerLeft: () => null,
              gestureEnabled: false,
            }} 
          />
          <Stack.Screen 
            name="AddMember" 
            component={AddMember} 
            options={{ title: 'নতুন সদস্য' }} 
          />
          <Stack.Screen 
            name="MembersList" 
            component={MembersList} 
            options={{ title: 'সদস্য তালিকা' }} 
          />
          <Stack.Screen 
            name="MemberProfile" 
            component={MemberProfile} 
            options={{ title: 'সদস্য প্রোফাইল' }} 
          />
          <Stack.Screen 
            name="EditMember" 
            component={EditMember} 
            options={{ title: 'সদস্য সম্পাদনা' }} 
          />
          <Stack.Screen 
            name="DailyCollection" 
            component={DailyCollection} 
            options={{ title: 'দৈনিক সংগ্রহ' }} 
          />
          <Stack.Screen 
            name="CollectionsList" 
            component={CollectionsList} 
            options={{ title: 'সংগ্রহের তালিকা' }} 
          />
          <Stack.Screen 
            name="MonthlyCollections" 
            component={MonthlyCollections} 
            options={{ title: 'মাসিক সংগ্রহ' }} 
          />
          <Stack.Screen 
            name="BackupRestore" 
            component={BackupRestore} 
            options={{ title: 'ব্যাকআপ ও রিস্টোর' }} 
          />
          <Stack.Screen 
            name="AdminLogin" 
            component={AdminLogin} 
            options={{ title: 'এডমিন লগইন' }} 
          />
          <Stack.Screen 
            name="AdminDashboard" 
            component={AdminDashboard} 
            options={{ title: 'এডমিন প্যানে���' }} 
          />
          <Stack.Screen 
            name="SystemManagement" 
            component={SystemManagement} 
            options={{ title: 'সিস্টেম ব্যবস্থাপনা' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
