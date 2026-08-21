import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getHistory, clearHistory } from "../services/historyService";
import { useAuth } from "../context/AuthContext";

export default function HistoryScreen() {
  const { user } = useAuth();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    if (!user) {
      setHistory([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data = await getHistory(user.id);
      console.log("HISTORY DATA:", data);
      setHistory(data || []);
    } catch (error) {
      console.log("HISTORY SCREEN ERROR:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const handleClear = () => {
    if (!user) return;

    Alert.alert(
      "Clear history",
      "Delete all your search and chat history?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearHistory(user.id);
            setHistory([]);
          },
        },
      ]
    );
  };

  const renderHistoryItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.type}>
            {item.type === "search" ? "🔎 Search" : "💬 Chat"}
          </Text>

          <Text style={styles.date}>
            {item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : ""}
          </Text>
        </View>

        <Text style={styles.content}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>
            Your recent searches and chats
          </Text>
        </View>

        {history.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* LOADING */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#1E88E5"
          />

          <Text style={styles.loadingText}>
            Loading history...
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderHistoryItem}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            history.length === 0
              ? styles.emptyContainer
              : styles.listContainer
          }
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>🕘</Text>

              <Text style={styles.emptyTitle}>
                No history yet
              </Text>

              <Text style={styles.emptyText}>
                Your medicine searches and chatbot conversations
                will appear here.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E88E5",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
    color: "#777",
  },

  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#FFF0F0",
  },

  clearText: {
    color: "#E53935",
    fontWeight: "700",
  },

  listContainer: {
    padding: 16,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  type: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E88E5",
  },

  date: {
    fontSize: 11,
    color: "#999",
  },

  content: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#777",
    fontSize: 14,
  },

  emptyContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  emptyBox: {
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#333",
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
});