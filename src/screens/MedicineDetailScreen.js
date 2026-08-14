import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function MedicineDetailScreen({ route }) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>{item.disease}</Text>
      <Text style={styles.category}>{item.category}</Text>

      <Text style={styles.sectionTitle}>Symptoms</Text>
      {item.symptoms?.map((s, i) => (
        <Text key={i} style={styles.listItem}>• {s}</Text>
      ))}

      <Text style={styles.sectionTitle}>Typical Medicines</Text>
      {item.medicines?.map((m, i) => (
        <View key={i} style={styles.medBox}>
          <Text style={styles.medName}>{m.name}</Text>
          <Text style={styles.medDetail}>Dosage: {m.dosage}</Text>
          <Text style={styles.medDetail}>{m.notes}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Precautions</Text>
      <Text style={styles.paragraph}>{item.precautions}</Text>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimer}>
          ⚠ {item.disclaimer || "This is general information, not medical advice."} Always
          consult a licensed doctor before starting, stopping, or changing any medication.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "800", color: "#1E88E5" },
  category: { fontSize: 14, color: "#666", marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginTop: 18, marginBottom: 8, color: "#222" },
  listItem: { fontSize: 15, color: "#333", marginBottom: 4 },
  medBox: {
    backgroundColor: "#F0F6FF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  medName: { fontSize: 16, fontWeight: "700", color: "#1E88E5" },
  medDetail: { fontSize: 14, color: "#333", marginTop: 2 },
  paragraph: { fontSize: 15, color: "#333", lineHeight: 22 },
  disclaimerBox: {
    marginTop: 24,
    padding: 14,
    backgroundColor: "#FFF3E0",
    borderRadius: 10,
  },
  disclaimer: { fontSize: 13, color: "#795548", lineHeight: 19 },
});
