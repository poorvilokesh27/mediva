import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getHistory, clearHistory } from "../services/historyService";
import { useAuth } from "../context/AuthContext";

export default function HistoryScreen() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getHistory(user.id).then(setHistory);
      }
    }, [user])
  );

  const handleClear = () => {
    Alert.alert("Clear history", "This will delete all your search and chat history.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await clearHistory(user.id);
          setHistory([]);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Your History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clear}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 && (
        <Text style={styles.empty}>Your searches and chats will appear here.</Text>
      )}

      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.badge}>{item.type === "search" ? "🔍 Search" : "💬 Chat"}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  heading: { fontSize: 20, fontWeight: "700", color: "#222" },
  clear: { color: "#E53935", fontWeight: "600" },
  empty: { textAlign: "center", color: "#888", marginTop: 40 },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
  },
  badge: { fontSize: 12, color: "#1E88E5", fontWeight: "700", marginBottom: 4 },
  content: { fontSize: 15, color: "#222" },
  date: { fontSize: 12, color: "#999", marginTop: 6 },
});
