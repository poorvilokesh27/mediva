import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function formatTime(hour, minute) {
  const period = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const m = minute.toString().padStart(2, "0");
  return `${h}:${m} ${period}`;
}

export default function ReminderCard({ reminder, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{reminder.medicine_name}</Text>
        <Text style={styles.time}>{formatTime(reminder.hour, reminder.minute)} - Daily</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "700", color: "#222" },
  time: { fontSize: 14, color: "#1E88E5", marginTop: 4 },
  deleteBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  deleteText: { color: "#E53935", fontWeight: "600" },
});
