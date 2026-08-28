import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MedicineDetailScreen from "../screens/MedicineDetailScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import RemindersScreen from "../screens/RemindersScreen";
import ChatbotScreen from "../screens/ChatbotScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

import ProfileScreen from "../screens/ProfileScreen";
import HistoryScreen from "../screens/HistoryScreen";

import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#8A94A6",

        tabBarStyle: {
          height: 68,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          backgroundColor: "#FFFFFF",
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },

        tabBarIcon: ({ focused, color }) => {

          let iconName;

          switch (route.name) {

            case "Home":
              iconName = focused
                ? "home"
                : "home-outline";
              break;

            case "Favorites":
              iconName = focused
                ? "heart"
                : "heart-outline";
              break;

            case "Reminders":
              iconName = focused
                ? "alarm"
                : "alarm-outline";
              break;

            case "History":
              iconName = focused
                ? "time"
                : "time-outline";
              break;

            case "Profile":
              iconName = focused
                ? "person-circle"
                : "person-circle-outline";
              break;

            default:
              iconName = "ellipse-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? 25 : 23}
              color={color}
            />
          );
        },
      })}
    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
      />

      <Tab.Screen
        name="Reminders"
        component={RemindersScreen}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

    </Tab.Navigator>
  );
}

export default function AppNavigator() {

  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>

      {!user ? (

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >

          <Stack.Screen
            name="Login"
            component={SignInScreen}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
          />

        </Stack.Navigator>

      ) : (

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >

          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
          />

          <Stack.Screen
            name="Search"
            component={SearchScreen}
          />

          <Stack.Screen
            name="MedicineDetail"
            component={MedicineDetailScreen}
          />

          <Stack.Screen
            name="Chatbot"
            component={ChatbotScreen}
          />

          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
          />

        </Stack.Navigator>

      )}

    </NavigationContainer>
  );
}