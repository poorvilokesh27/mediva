import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MedicineCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{item.disease}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.symptoms} numberOfLines={1}>
        {item.symptoms?.join(", ")}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 17, fontWeight: "700", color: "#1E88E5" },
  category: { fontSize: 13, color: "#666", marginTop: 2 },
  symptoms: { fontSize: 14, color: "#333", marginTop: 6 },
});
