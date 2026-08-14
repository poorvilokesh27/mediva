import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Search disease, symptom or medicine..."}
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginHorizontal: 16,
    marginVertical: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    height: 46,
    fontSize: 16,
    color: "#222",
  },
});
