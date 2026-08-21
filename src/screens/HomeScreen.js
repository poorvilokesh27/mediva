import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";

import localData from "../data/medicineData.json";
import { searchMedicines } from "../services/medicineService";
import { addHistory, getHistory } from "../services/historyService";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    loadRecentSearches();
  }, [user]);

  async function loadRecentSearches() {
    if (!user) return;

    const history = await getHistory(user.id);

    const searches = history
      .filter((item) => item.type === "search")
      .slice(0, 5);

    setRecentSearches(searches);
  }

  async function handleSearch() {
    const text = query.trim();

    if (!text) {
      return;
    }

    Keyboard.dismiss();
    setSearching(true);

    try {
      const data = await searchMedicines(text);
      setResults(data);

      if (user) {
        await addHistory(user.id, "search", text);
        await loadRecentSearches();
      }
    } catch (error) {
      console.log("Search error:", error);
      setResults([]);
    }

    setSearching(false);
  }

  function openMedicine(item) {
    navigation.navigate("MedicineDetail", {
      item,
    });
  }

  const popularMedicines = [
    {
      name: "Paracetamol",
      icon: "💊",
      description: "Pain & fever",
    },
    {
      name: "Cetirizine",
      icon: "💊",
      description: "Allergy",
    },
    {
      name: "Ibuprofen",
      icon: "💊",
      description: "Pain relief",
    },
    {
      name: "Omeprazole",
      icon: "💊",
      description: "Acidity",
    },
    {
      name: "Metformin",
      icon: "💊",
      description: "Diabetes",
    },
  ];

  const categories = [
    {
      name: "Cold & Cough",
      icon: "🤧",
      search: "cold",
    },
    {
      name: "Pain Relief",
      icon: "🩹",
      search: "pain",
    },
    {
      name: "Allergy",
      icon: "🌼",
      search: "allergy",
    },
    {
      name: "Vitamins",
      icon: "💊",
      search: "vitamin",
    },
    {
      name: "Digestive",
      icon: "🍃",
      search: "digestive",
    },
    {
      name: "First Aid",
      icon: "⛑️",
      search: "first",
    },
  ];

  function searchFromCard(text) {
    setQuery(text);

    setTimeout(() => {
      handleSearch();
    }, 100);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text style={styles.logo}>💊 MediPal</Text>
            <Text style={styles.subtitle}>
              Your health information companion
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicine or disease..."
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonText}>🔎</Text>
          </TouchableOpacity>
        </View>

        {/* SEARCH RESULTS */}
        {searching && (
          <ActivityIndicator
            size="small"
            color="#1E88E5"
            style={styles.loader}
          />
        )}

        {!searching && results.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>
              Search Results
            </Text>

            {results.map((item, index) => (
              <TouchableOpacity
                key={item.id?.toString() || index.toString()}
                style={styles.resultCard}
                onPress={() => openMedicine(item)}
              >
                <View style={styles.resultIcon}>
                  <Text style={styles.medicineEmoji}>💊</Text>
                </View>

                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>
                    {item.disease}
                  </Text>

                  <Text style={styles.resultCategory}>
                    {item.category}
                  </Text>

                  <Text
                    style={styles.resultSymptoms}
                    numberOfLines={2}
                  >
                    {item.symptoms?.join(", ")}
                  </Text>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!searching &&
          query.trim().length > 0 &&
          results.length === 0 && (
            <Text style={styles.noResults}>
              No matches found. Try another medicine or disease.
            </Text>
          )}

        {/* POPULAR MEDICINES */}
        {query.trim().length === 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                ⭐ Popular medicines
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalContent}
            >
              {popularMedicines.map((medicine) => (
                <TouchableOpacity
                  key={medicine.name}
                  style={styles.popularCard}
                  onPress={() => searchFromCard(medicine.name)}
                >
                  <View style={styles.popularIcon}>
                    <Text style={styles.popularEmoji}>
                      {medicine.icon}
                    </Text>
                  </View>

                  <Text style={styles.popularName}>
                    {medicine.name}
                  </Text>

                  <Text style={styles.popularDescription}>
                    {medicine.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* CATEGORIES */}
            <Text style={styles.sectionTitle}>
              🩺 Medicine categories
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalContent}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.name}
                  style={styles.categoryCard}
                  onPress={() => searchFromCard(category.search)}
                >
                  <Text style={styles.categoryIcon}>
                    {category.icon}
                  </Text>

                  <Text style={styles.categoryName}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* RECENT SEARCHES */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                📋 Recent searches
              </Text>
            </View>

            {recentSearches.length === 0 ? (
              <Text style={styles.emptyText}>
                Your recent searches will appear here.
              </Text>
            ) : (
              recentSearches.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.historyCard}
                  onPress={() => searchFromCard(item.content)}
                >
                  <Text style={styles.historyIcon}>🔎</Text>

                  <View>
                    <Text style={styles.historyText}>
                      {item.content}
                    </Text>

                    <Text style={styles.historySubtext}>
                      Search again
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}

            {/* REMINDERS */}
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>⏰</Text>

              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>
                  Today's reminders
                </Text>

                <Text style={styles.featureSubtitle}>
                  Keep track of your medicine schedule.
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("Reminders")}
              >
                <Text style={styles.featureButton}>
                  Open
                </Text>
              </TouchableOpacity>
            </View>

            {/* CHATBOT */}
            <TouchableOpacity
              style={styles.chatCard}
              onPress={() => navigation.navigate("Chatbot")}
            >
              <Text style={styles.chatIcon}>💬</Text>

              <View style={{ flex: 1 }}>
                <Text style={styles.chatTitle}>
                  Ask MediPal
                </Text>

                <Text style={styles.chatSubtitle}>
                  Have a question about a medicine or disease?
                </Text>
              </View>

              <Text style={styles.chatArrow}>›</Text>
            </TouchableOpacity>
          </>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  scrollContent: {
    paddingBottom: 100,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
  },

  welcome: {
    fontSize: 14,
    color: "#777",
  },

  logo: {
    fontSize: 27,
    fontWeight: "800",
    color: "#1E88E5",
    marginTop: 2,
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E8F3FF",
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    fontSize: 23,
  },

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 14,
    paddingLeft: 16,
    paddingRight: 5,
    height: 54,
    alignItems: "center",
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#222",
  },

  searchButton: {
    width: 46,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#1E88E5",
    alignItems: "center",
    justifyContent: "center",
  },

  searchButtonText: {
    fontSize: 20,
  },

  loader: {
    marginTop: 20,
  },

  sectionHeader: {
    marginTop: 24,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#222",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },

  horizontalContent: {
    paddingHorizontal: 16,
  },

  popularCard: {
    width: 145,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 14,
    marginRight: 12,
    elevation: 2,
  },

  popularIcon: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  popularEmoji: {
    fontSize: 28,
  },

  popularName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },

  popularDescription: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  categoryCard: {
    width: 125,
    height: 110,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  categoryName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },

  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
    elevation: 2,
  },

  resultIcon: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  medicineEmoji: {
    fontSize: 29,
  },

  resultInfo: {
    flex: 1,
  },

  resultTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E88E5",
  },

  resultCategory: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },

  resultSymptoms: {
    fontSize: 13,
    color: "#444",
    marginTop: 5,
  },

  arrow: {
    fontSize: 28,
    color: "#999",
    marginLeft: 8,
  },

  noResults: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    marginHorizontal: 20,
  },

  emptyText: {
    color: "#888",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 5,
  },

  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 9,
    padding: 13,
    borderRadius: 12,
    elevation: 1,
  },

  historyIcon: {
    fontSize: 20,
    marginRight: 12,
  },

  historyText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  historySubtext: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 22,
    padding: 16,
    borderRadius: 15,
    elevation: 2,
  },

  featureIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  featureText: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  featureSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },

  featureButton: {
    color: "#1E88E5",
    fontWeight: "700",
  },

  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E88E5",
    marginHorizontal: 16,
    marginTop: 14,
    padding: 17,
    borderRadius: 15,
  },

  chatIcon: {
    fontSize: 30,
    marginRight: 13,
  },

  chatTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
  },

  chatSubtitle: {
    fontSize: 12,
    color: "#E8F3FF",
    marginTop: 3,
  },

  chatArrow: {
    fontSize: 30,
    color: "#fff",
    marginLeft: 8,
  },
});