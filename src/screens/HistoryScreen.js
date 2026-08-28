
import React, {
  useCallback,
  useState,
} from "react";

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

import {
  getHistory,
  clearHistory,
  deleteHistory,
} from "../services/historyService";

import { useAuth } from "../context/AuthContext";

export default function HistoryScreen({
  navigation,
}) {
  const { user } = useAuth();

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // LOAD HISTORY
  // =====================================================

  const loadHistory =
    useCallback(async () => {
      if (!user?.id) {
        setHistory([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const data =
          await getHistory(user.id);

        console.log(
          "HISTORY DATA:",
          data
        );

        setHistory(data || []);
      } catch (error) {
        console.log(
          "HISTORY SCREEN ERROR:",
          error
        );

        setHistory([]);
      } finally {
        setLoading(false);
      }
    }, [user?.id]);

  // =====================================================
  // RELOAD WHEN SCREEN OPENS
  // =====================================================

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  // =====================================================
  // CLEAR ALL
  // =====================================================

  const handleClear = () => {
    if (!user?.id || history.length === 0) {
      return;
    }

    Alert.alert(
      "Clear history",
      "Are you sure you want to delete all your history?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            const success =
              await clearHistory(
                user.id
              );

            if (success) {
              setHistory([]);
            } else {
              Alert.alert(
                "Error",
                "Could not clear history."
              );
            }
          },
        },
      ]
    );
  };

  // =====================================================
  // DELETE ONE ITEM
  // =====================================================

  const handleDelete = (
    historyId
  ) => {
    if (!user?.id) {
      return;
    }

    Alert.alert(
      "Delete history",
      "Delete this history item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const success =
              await deleteHistory(
                historyId,
                user.id
              );

            if (success) {
              setHistory(
                (previous) =>
                  previous.filter(
                    (item) =>
                      item.id !==
                      historyId
                  )
              );
            } else {
              Alert.alert(
                "Error",
                "Could not delete this item."
              );
            }
          },
        },
      ]
    );
  };

  // =====================================================
  // OPEN HISTORY ITEM
  // =====================================================

  const handleOpen = (item) => {
    if (
      item.type === "search" &&
      item.content
    ) {
      navigation.navigate(
        "Home",
        {
          screen: "Search",
          params: {
            searchQuery:
              item.content,
          },
        }
      );

      return;
    }

    if (
      item.type === "chat"
    ) {
      navigation.navigate(
        "Chatbot",
        {
          historyMessage:
            item.content,
        }
      );
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (
    dateString
  ) => {
    if (!dateString) {
      return "";
    }

    const date =
      new Date(dateString);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return date.toLocaleString(
      undefined,
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =====================================================
  // HISTORY CARD
  // =====================================================

  const renderHistoryItem =
    ({ item }) => {
      const isSearch =
        item.type === "search";

      return (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() =>
            handleOpen(item)
          }
        >
          <View
            style={styles.cardHeader}
          >
            <View
              style={styles.typeContainer}
            >
              <View
                style={
                  styles.iconCircle
                }
              >
                <Text
                  style={
                    styles.icon
                  }
                >
                  {isSearch
                    ? "🔎"
                    : "💬"}
                </Text>
              </View>

              <View>
                <Text
                  style={
                    styles.type
                  }
                >
                  {isSearch
                    ? "Medicine Search"
                    : "Chat"}
                </Text>

                <Text
                  style={
                    styles.date
                  }
                >
                  {formatDate(
                    item.created_at
                  )}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={
                styles.deleteButton
              }
              onPress={() =>
                handleDelete(
                  item.id
                )
              }
            >
              <Text
                style={
                  styles.deleteIcon
                }
              >
                🗑️
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={styles.content}
            numberOfLines={3}
          >
            {item.content}
          </Text>

          <Text
            style={styles.openText}
          >
            Tap to open →
          </Text>
        </TouchableOpacity>
      );
    };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text
              style={styles.title}
            >
              History
            </Text>

            <Text
              style={styles.subtitle}
            >
              Your recent activity
            </Text>
          </View>
        </View>

        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#1E88E5"
          />

          <Text
            style={styles.loadingText}
          >
            Loading history...
          </Text>
        </View>
      </View>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text
            style={styles.title}
          >
            History
          </Text>

          <Text
            style={styles.subtitle}
          >
            Your recent searches
            and chats
          </Text>
        </View>

        {history.length > 0 && (
          <TouchableOpacity
            style={
              styles.clearButton
            }
            activeOpacity={0.8}
            onPress={handleClear}
          >
            <Text
              style={
                styles.clearText
              }
            >
              Clear all
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* HISTORY LIST */}

      <FlatList
        data={history}
        renderItem={
          renderHistoryItem
        }
        keyExtractor={(
          item,
          index
        ) =>
          item.id
            ? String(item.id)
            : `history-${index}`
        }
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          history.length === 0
            ? styles.emptyContainer
            : styles.listContainer
        }
        ListEmptyComponent={
          <View
            style={
              styles.emptyBox
            }
          >
            <Text
              style={
                styles.emptyIcon
              }
            >
              🕘
            </Text>

            <Text
              style={
                styles.emptyTitle
              }
            >
              No history yet
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              Your medicine searches
              and chatbot conversations
              will appear here.
            </Text>
          </View>
        }
      />
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#F5F7FA",
    },

    header: {
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 15,
      backgroundColor:
        "#FFFFFF",
      flexDirection: "row",
      justifyContent:
        "space-between",
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
      backgroundColor:
        "#FFF0F0",
      paddingHorizontal: 13,
      paddingVertical: 9,
      borderRadius: 10,
    },

    clearText: {
      color: "#E53935",
      fontWeight: "800",
      fontSize: 12,
    },

    listContainer: {
      padding: 16,
      paddingBottom: 120,
    },

    card: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 17,
      padding: 15,
      marginBottom: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.07,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },

    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
    },

    typeContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },

    iconCircle: {
      width: 45,
      height: 45,
      borderRadius: 13,
      backgroundColor:
        "#EAF4FF",
      alignItems: "center",
      justifyContent:
        "center",
      marginRight: 11,
    },

    icon: {
      fontSize: 22,
    },

    type: {
      fontSize: 14,
      fontWeight: "800",
      color: "#1E88E5",
    },

    date: {
      fontSize: 11,
      color: "#999",
      marginTop: 3,
    },

    deleteButton: {
      width: 38,
      height: 38,
      borderRadius: 10,
      backgroundColor:
        "#FFF5F5",
      alignItems: "center",
      justifyContent:
        "center",
    },

    deleteIcon: {
      fontSize: 16,
    },

    content: {
      fontSize: 16,
      fontWeight: "600",
      color: "#222",
      lineHeight: 23,
      marginTop: 14,
    },

    openText: {
      color: "#1E88E5",
      fontSize: 12,
      fontWeight: "700",
      marginTop: 10,
    },

    center: {
      flex: 1,
      alignItems: "center",
      justifyContent:
        "center",
    },

    loadingText: {
      marginTop: 10,
      color: "#777",
      fontSize: 14,
    },

    emptyContainer: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent:
        "center",
      padding: 30,
    },

    emptyBox: {
      alignItems: "center",
      maxWidth: 300,
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

