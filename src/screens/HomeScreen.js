import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import MedicineCard from "../components/MedicineCard";
import { searchMedicines } from "../services/medicineService";
import { addHistory } from "../services/historyService";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }
      setLoading(true);
      const data = await searchMedicines(query);
      setResults(data);
      setLoading(false);
      if (user && data.length > 0) {
        addHistory(user.id, "search", query);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find disease & medicine info</Text>
      <SearchBar value={query} onChangeText={setQuery} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} color="#1E88E5" />}

      {!loading && query.length > 0 && results.length === 0 && (
        <Text style={styles.empty}>No matches found. Try another term.</Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id?.toString() || item.disease}
        renderItem={({ item }) => (
          <MedicineCard
            item={item}
            onPress={() => navigation.navigate("MedicineDetail", { item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", paddingTop: 16 },
  heading: { fontSize: 20, fontWeight: "700", color: "#222", marginHorizontal: 16 },
  empty: { textAlign: "center", color: "#888", marginTop: 20 },
});
