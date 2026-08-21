import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function MedicineDetailScreen({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        bounces={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* MEDICINE IMAGE */}
        <View style={styles.imageBox}>
          <Text style={styles.medicineEmoji}>💊</Text>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>
          {item.disease}
        </Text>

        {/* CATEGORY */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {item.category || "General health"}
          </Text>
        </View>

        {/* INTRO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🩺 What is it generally used for?
          </Text>

          <Text style={styles.paragraph}>
            This information is related to {item.disease}. It is provided
            for general educational purposes and should not be treated as a
            diagnosis or prescription.
          </Text>
        </View>

        {/* SYMPTOMS */}
        {item.symptoms?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Common symptoms
            </Text>

            {item.symptoms.map((symptom, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>

                <Text style={styles.bulletText}>
                  {symptom}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* MEDICINES */}
        {item.medicines?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              💊 Commonly mentioned medicines
            </Text>

            {item.medicines.map((medicine, index) => (
              <View
                key={index}
                style={styles.medicineCard}
              >
                <View style={styles.medicineIcon}>
                  <Text style={styles.smallMedicineEmoji}>
                    💊
                  </Text>
                </View>

                <View style={styles.medicineInfo}>
                  <Text style={styles.medicineName}>
                    {medicine.name}
                  </Text>

                  <Text style={styles.medicineNotes}>
                    {medicine.notes}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* PRECAUTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ⚠️ General precautions
          </Text>

          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              {item.precautions ||
                "Follow the advice of a qualified healthcare professional."}
            </Text>
          </View>
        </View>

        {/* PROFESSIONAL ADVICE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            👨‍⚕️ When should you seek professional advice?
          </Text>

          <Text style={styles.paragraph}>
            Seek advice from a qualified healthcare professional if
            symptoms are severe, persistent, getting worse, or if you
            are unsure whether a medicine is appropriate for you.
          </Text>
        </View>

        {/* REMINDER */}
        <TouchableOpacity
          style={styles.reminderButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Reminders")}
        >
          <Text style={styles.reminderButtonText}>
            ⏰ Set Medicine Reminder
          </Text>
        </TouchableOpacity>

        {/* DISCLAIMER */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>
            Important
          </Text>

          <Text style={styles.disclaimerText}>
            {item.disclaimer ||
              "This information is for general educational purposes only."}

            {"\n\n"}

            Do not start, stop, or change a medicine based only on
            information shown in this app. Speak with a qualified
            healthcare professional when you need medical advice.
          </Text>
        </View>

        {/* EXTRA SPACE FOR BOTTOM NAVIGATION */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  scrollView: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  imageBox: {
    height: 180,
    backgroundColor: "#EAF4FF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  medicineEmoji: {
    fontSize: 75,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#1E88E5",
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#DDEEFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },

  categoryText: {
    color: "#1E88E5",
    fontSize: 13,
    fontWeight: "700",
  },

  section: {
    marginTop: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#222",
    marginBottom: 10,
  },

  paragraph: {
    fontSize: 15,
    lineHeight: 23,
    color: "#444",
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 7,
  },

  bullet: {
    fontSize: 20,
    color: "#1E88E5",
    marginRight: 8,
  },

  bulletText: {
    flex: 1,
    fontSize: 15,
    color: "#444",
    lineHeight: 21,
  },

  medicineCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 2,
  },

  medicineIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  smallMedicineEmoji: {
    fontSize: 25,
  },

  medicineInfo: {
    flex: 1,
  },

  medicineName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E88E5",
  },

  medicineNotes: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    lineHeight: 18,
  },

  warningBox: {
    backgroundColor: "#FFF4E5",
    borderRadius: 14,
    padding: 14,
  },

  warningText: {
    color: "#6D4C41",
    fontSize: 14,
    lineHeight: 21,
  },

  reminderButton: {
    backgroundColor: "#1E88E5",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 26,
  },

  reminderButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  disclaimerBox: {
    backgroundColor: "#F1F1F1",
    borderRadius: 14,
    padding: 15,
    marginTop: 18,
  },

  disclaimerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#555",
    marginBottom: 6,
  },

  disclaimerText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
});