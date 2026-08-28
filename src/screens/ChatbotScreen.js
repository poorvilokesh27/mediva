
import React, {
  useRef,
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  askChatbot,
} from "../services/chatbotService";

import {
  addHistory,
} from "../services/historyService";

import {
  useAuth,
} from "../context/AuthContext";

export default function ChatbotScreen({
  route,
}) {
  const { user } = useAuth();

  const [messages, setMessages] =
    useState([
      {
        id: "welcome",
        role: "bot",
        text:
          "Hi! 👋 I'm MediPal's health information assistant.\n\nAsk me about a disease, symptom, or medicine.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const listRef =
    useRef(null);

  // =====================================================
  // HANDLE HISTORY MESSAGE
  // =====================================================

  useEffect(() => {
    const historyMessage =
      route?.params?.historyMessage;

    if (!historyMessage) {
      return;
    }

    setMessages([
      {
        id: "welcome",
        role: "bot",
        text:
          "Hi! 👋 I'm MediPal's health information assistant.",
      },
      {
        id:
          "history-" +
          Date.now(),
        role: "user",
        text: historyMessage,
      },
    ]);

    setTimeout(() => {
      sendMessage(historyMessage);
    }, 300);
  }, []);

  // =====================================================
  // SCROLL TO BOTTOM
  // =====================================================

  const scrollToBottom = () => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessage = async (
    messageText
  ) => {
    const text =
      String(messageText || "").trim();

    if (!text || loading) {
      return;
    }

    const userMessage = {
      id:
        "user-" +
        Date.now(),
      role: "user",
      text: text,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");

    scrollToBottom();

    setLoading(true);

    try {
      const reply =
        await askChatbot(text);

      const botMessage = {
        id:
          "bot-" +
          Date.now(),
        role: "bot",
        text:
          reply ||
          "Sorry, I couldn't find an answer.",
      };

      setMessages((previous) => [
        ...previous,
        botMessage,
      ]);

      // Save USER QUESTION to Supabase
      if (user?.id) {
        const saved =
          await addHistory(
            user.id,
            "chat",
            text
          );

        console.log(
          "CHAT HISTORY SAVED:",
          saved
        );
      }

      scrollToBottom();
    } catch (error) {
      console.log(
        "CHAT SEND ERROR:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          id:
            "error-" +
            Date.now(),
          role: "bot",
          text:
            "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEND BUTTON
  // =====================================================

  const handleSend = () => {
    sendMessage(input);
  };

  // =====================================================
  // CLEAR CHAT
  // =====================================================

  const clearChat = () => {
    Alert.alert(
      "New chat",
      "Clear the current conversation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            setMessages([
              {
                id:
                  "welcome-" +
                  Date.now(),
                role: "bot",
                text:
                  "Hi! 👋 I'm MediPal's health information assistant.\n\nAsk me about a disease, symptom, or medicine.",
              },
            ]);

            setInput("");
          },
        },
      ]
    );
  };

  // =====================================================
  // MESSAGE CARD
  // =====================================================

  const renderMessage = ({
    item,
  }) => {
    const isUser =
      item.role === "user";

    return (
      <View
        style={[
          styles.messageRow,
          isUser
            ? styles.userRow
            : styles.botRow,
        ]}
      >
        {!isUser && (
          <View
            style={styles.botAvatar}
          >
            <Text
              style={styles.avatarText}
            >
              🤖
            </Text>
          </View>
        )}

        <View
          style={[
            styles.bubble,
            isUser
              ? styles.userBubble
              : styles.botBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUser
                ? styles.userText
                : styles.botText,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  // =====================================================
  // TYPING INDICATOR
  // =====================================================

  const renderTyping =
    () => {
      if (!loading) {
        return null;
      }

      return (
        <View
          style={styles.typingRow}
        >
          <View
            style={styles.botAvatar}
          >
            <Text
              style={styles.avatarText}
            >
              🤖
            </Text>
          </View>

          <View
            style={styles.typingBubble}
          >
            <ActivityIndicator
              size="small"
              color="#1E88E5"
            />

            <Text
              style={styles.typingText}
            >
              MediPal is thinking...
            </Text>
          </View>
        </View>
      );
    };

  // =====================================================
  // SCREEN
  // =====================================================

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
      keyboardVerticalOffset={
        Platform.OS === "ios"
          ? 80
          : 0
      }
    >
      {/* TOP BAR */}

      <View
        style={styles.topBar}
      >
        <View>
          <Text
            style={styles.title}
          >
            MediPal Assistant 🤖
          </Text>

          <Text
            style={styles.subtitle}
          >
            General health information
          </Text>
        </View>

        <TouchableOpacity
          style={styles.newChatButton}
          onPress={clearChat}
        >
          <Text
            style={styles.newChatText}
          >
            New
          </Text>
        </TouchableOpacity>
      </View>

      {/* MESSAGES */}

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={
          renderMessage
        }
        contentContainerStyle={
          styles.messageList
        }
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={
          scrollToBottom
        }
        ListFooterComponent={
          renderTyping
        }
      />

      {/* DISCLAIMER */}

      <View
        style={styles.disclaimer}
      >
        <Text
          style={
            styles.disclaimerText
          }
        >
          ⚠️ General information only.
          MediPal does not diagnose or
          prescribe medicines.
        </Text>
      </View>

      {/* INPUT */}

      <View
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask about a disease, symptom or medicine..."
          placeholderTextColor="#999"
          multiline={true}
          maxLength={500}
          editable={!loading}
          returnKeyType="send"
          blurOnSubmit={false}
          onSubmitEditing={
            handleSend
          }
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            (!input.trim() ||
              loading) &&
              styles.disabledButton,
          ]}
          onPress={handleSend}
          disabled={
            !input.trim() ||
            loading
          }
          activeOpacity={0.8}
        >
          <Text
            style={styles.sendIcon}
          >
            ➤
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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

    topBar: {
      backgroundColor:
        "#FFFFFF",
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor:
        "#EEEEEE",
    },

    title: {
      fontSize: 18,
      fontWeight: "800",
      color: "#1E88E5",
    },

    subtitle: {
      fontSize: 11,
      color: "#777",
      marginTop: 2,
    },

    newChatButton: {
      backgroundColor:
        "#EAF4FF",
      paddingHorizontal: 13,
      paddingVertical: 8,
      borderRadius: 10,
    },

    newChatText: {
      color: "#1E88E5",
      fontWeight: "800",
      fontSize: 12,
    },

    messageList: {
      padding: 15,
      paddingBottom: 20,
    },

    messageRow: {
      flexDirection: "row",
      marginBottom: 12,
      alignItems: "flex-end",
    },

    userRow: {
      justifyContent:
        "flex-end",
    },

    botRow: {
      justifyContent:
        "flex-start",
    },

    botAvatar: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor:
        "#EAF4FF",
      alignItems: "center",
      justifyContent:
        "center",
      marginRight: 7,
    },

    avatarText: {
      fontSize: 18,
    },

    bubble: {
      maxWidth: "82%",
      paddingHorizontal: 14,
      paddingVertical: 11,
      borderRadius: 17,
    },

    userBubble: {
      backgroundColor:
        "#1E88E5",
      borderBottomRightRadius: 5,
    },

    botBubble: {
      backgroundColor:
        "#FFFFFF",
      borderBottomLeftRadius: 5,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 3,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },

    messageText: {
      fontSize: 15,
      lineHeight: 22,
    },

    userText: {
      color: "#FFFFFF",
    },

    botText: {
      color: "#222222",
    },

    typingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },

    typingBubble: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 16,
      paddingHorizontal: 13,
      paddingVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      elevation: 1,
    },

    typingText: {
      color: "#777",
      fontSize: 12,
      marginLeft: 8,
    },

    disclaimer: {
      backgroundColor:
        "#FFF8E8",
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderTopWidth: 1,
      borderTopColor:
        "#F0E5C8",
    },

    disclaimerText: {
      textAlign: "center",
      fontSize: 10,
      color: "#806A35",
      lineHeight: 14,
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      backgroundColor:
        "#FFFFFF",
      paddingHorizontal: 10,
      paddingTop: 9,
      paddingBottom: 10,
      borderTopWidth: 1,
      borderTopColor:
        "#EEEEEE",
    },

    input: {
      flex: 1,
      minHeight: 45,
      maxHeight: 110,
      backgroundColor:
        "#F2F4F7",
      borderRadius: 22,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 10,
      fontSize: 15,
      color: "#222",
    },

    sendButton: {
      width: 45,
      height: 45,
      borderRadius: 23,
      backgroundColor:
        "#1E88E5",
      alignItems: "center",
      justifyContent:
        "center",
      marginLeft: 8,
    },

    disabledButton: {
      backgroundColor:
        "#B9CDE0",
    },

    sendIcon: {
      color: "#FFFFFF",
      fontSize: 21,
      fontWeight: "800",
    },
  });

