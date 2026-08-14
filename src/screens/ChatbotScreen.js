import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { askChatbot } from "../services/chatbotService";
import { addHistory } from "../services/historyService";
import { useAuth } from "../context/AuthContext";

export default function ChatbotScreen() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: "welcome", role: "bot", text: "Hi! Ask me about any disease, symptom, or medicine." },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const reply = await askChatbot(text);
    const botMsg = { id: Date.now().toString() + "-bot", role: "bot", text: reply };
    setMessages((prev) => [...prev, botMsg]);

    if (user) addHistory(user.id, "chat", text);

    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.role === "user" ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={item.role === "user" ? styles.userText : styles.botText}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your question..."
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  bubble: { maxWidth: "80%", borderRadius: 14, padding: 12, marginBottom: 10 },
  userBubble: { backgroundColor: "#1E88E5", alignSelf: "flex-end" },
  botBubble: { backgroundColor: "#fff", alignSelf: "flex-start", elevation: 1 },
  userText: { color: "#fff", fontSize: 15 },
  botText: { color: "#222", fontSize: 15, lineHeight: 21 },
  inputRow: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#1E88E5",
    borderRadius: 20,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  sendText: { color: "#fff", fontWeight: "700" },
});
