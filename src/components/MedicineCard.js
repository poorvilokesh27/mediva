import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function MedicineCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>💊</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>
          {item.disease}
        </Text>

        <Text style={styles.category}>
          {item.category}
        </Text>

        <Text
          style={styles.symptoms}
          numberOfLines={2}
        >
          {item.symptoms?.join(", ")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,

    elevation: 2,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  icon: {
    fontSize: 30,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E88E5",
  },

  category: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },

  symptoms: {
    fontSize: 13,
    color: "#333",
    marginTop: 6,
    lineHeight: 18,
  },
});