import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, View, Text } from "react-native";

import { useAuth } from "../context/AuthContext";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import MedicineDetailScreen from "../screens/MedicineDetailScreen";
import ChatbotScreen from "../screens/ChatbotScreen";
import HistoryScreen from "../screens/HistoryScreen";
import RemindersScreen from "../screens/RemindersScreen";
import ProfileScreen from "../screens/ProfileScreen";

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Search" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="MedicineDetail"
        component={MedicineDetailScreen}
        options={{ title: "" }}
      />
    </HomeStack.Navigator>
  );
}

function tabIcon(emoji) {
  return () => <Text style={{ fontSize: 20 }}>{emoji}</Text>;
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "#1E88E5" }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarIcon: tabIcon("🔍") }}
      />
      <Tab.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{ headerShown: true, title: "Chat Assistant", tabBarIcon: tabIcon("💬") }}
      />
      <Tab.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{ tabBarIcon: tabIcon("⏰") }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ tabBarIcon: tabIcon("🕘") }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: true, tabBarIcon: tabIcon("👤") }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {session ? <MainTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
