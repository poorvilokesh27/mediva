import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: signOut },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {(user?.user_metadata?.full_name || user?.email || "U")[0].toUpperCase()}
        </Text>
      </View>
      <Text style={styles.name}>{user?.user_metadata?.full_name || "MediPal User"}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", alignItems: "center", paddingTop: 60 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1E88E5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: { color: "#fff", fontSize: 36, fontWeight: "800" },
  name: { fontSize: 20, fontWeight: "700", color: "#222" },
  email: { fontSize: 14, color: "#666", marginTop: 4, marginBottom: 40 },
  signOutBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  signOutText: { color: "#E53935", fontWeight: "700", fontSize: 15 },
});
