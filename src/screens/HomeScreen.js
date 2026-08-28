import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import medicineCatalog from "../data/medicineCatalog";

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

  // --------------------------------------------------
  // MEDICINE CATEGORIES
  // --------------------------------------------------

  const categories = [
    {
      id: "allergy",
      title: "Allergy",
      subtitle: "Allergy relief",
      icon: "flower-outline",
      color: "#E8F5E9",
      iconColor: "#2E7D32",
    },
    {
      id: "pain",
      title: "Pain & Fever",
      subtitle: "Pain relief",
      icon: "bandage-outline",
      color: "#FFF3E0",
      iconColor: "#EF6C00",
    },
    {
      id: "antiinfective",
      title: "Anti-Infectives",
      subtitle: "Infection care",
      icon: "shield-checkmark-outline",
      color: "#E3F2FD",
      iconColor: "#1565C0",
    },
    {
      id: "cardiovascular",
      title: "Heart & BP",
      subtitle: "Cardiovascular",
      icon: "heart-outline",
      color: "#FCE4EC",
      iconColor: "#C2185B",
    },
    {
      id: "cns",
      title: "Brain & Nerves",
      subtitle: "CNS medicines",
      icon: "pulse-outline",
      color: "#F3E5F5",
      iconColor: "#7B1FA2",
    },
    {
      id: "gastrointestinal",
      title: "Digestive",
      subtitle: "Stomach & gut",
      icon: "nutrition-outline",
      color: "#FFF8E1",
      iconColor: "#F9A825",
    },
    {
      id: "respiratory",
      title: "Respiratory",
      subtitle: "Cough & breathing",
      icon: "cloud-outline",
      color: "#E0F7FA",
      iconColor: "#00838F",
    },
    {
      id: "endocrine",
      title: "Endocrine",
      subtitle: "Hormonal & metabolic",
      icon: "water-outline",
      color: "#EDE7F6",
      iconColor: "#512DA8",
    },
    {
      id: "antiinflammatory",
      title: "Anti-Inflammatory",
      subtitle: "Inflammation care",
      icon: "medical-outline",
      color: "#FBE9E7",
      iconColor: "#D84315",
    },
  ];

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const medicineList = useMemo(() => {
    if (Array.isArray(medicineCatalog)) {
      return medicineCatalog;
    }

    if (medicineCatalog?.medicines) {
      return medicineCatalog.medicines;
    }

    return [];
  }, []);

  const searchResults = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return medicineList
      .filter((medicine) => {
        const name = String(
          medicine.name ||
            medicine.medicineName ||
            medicine.genericName ||
            ""
        ).toLowerCase();

        const category = String(
          medicine.category || ""
        ).toLowerCase();

        return (
          name.includes(query) ||
          category.includes(query)
        );
      })
      .slice(0, 5);
  }, [searchText, medicineList]);

 const openMedicine = (medicine) => {
  navigation.navigate("MedicineDetail", {
    item: medicine,
  });
};
  // --------------------------------------------------
  // CATEGORY PRESS
  // --------------------------------------------------

  const openCategory = (category) => {
  navigation.navigate("Search", {
    category: category.title,
    categoryId: category.id,
  });
};
  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.smallTitle}>
              Welcome to
            </Text>

            <Text style={styles.logoText}>
              Medi<Text style={styles.logoAccent}>Pal</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color="#1976D2"
            />
          </TouchableOpacity>
        </View>

        {/* WELCOME CARD */}

        <View style={styles.welcomeCard}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>
              Your health companion
            </Text>

            <Text style={styles.welcomeSubtitle}>
              Find medicines and health information easily.
            </Text>
          </View>

          <View style={styles.healthIcon}>
            <Ionicons
              name="medical"
              size={38}
              color="#FFFFFF"
            />
          </View>
        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={23}
            color="#7A8793"
          />

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search medicine or category..."
            placeholderTextColor="#9AA5AF"
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (searchText.trim()) {
                navigation.navigate("Search", {
                  query: searchText.trim(),
                });
              }
            }}
          />

          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchText("")}
            >
              <Ionicons
                name="close-circle"
                size={21}
                color="#9AA5AF"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* SEARCH RESULTS */}

        {searchResults.length > 0 && (
          <View style={styles.searchResults}>
            {searchResults.map((medicine, index) => (
              <TouchableOpacity
                key={
                  medicine.id ||
                  medicine.name ||
                  index
                }
                style={styles.resultItem}
                onPress={() => openMedicine(medicine)}
              >
                <View style={styles.resultIcon}>
                  <Ionicons
                    name="medical-outline"
                    size={21}
                    color="#1976D2"
                  />
                </View>

                <View style={styles.resultText}>
                  <Text style={styles.resultName}>
                    {medicine.name ||
                      medicine.medicineName ||
                      medicine.genericName}
                  </Text>

                  <Text style={styles.resultCategory}>
                    {medicine.category ||
                      "Medicine"}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#9AA5AF"
                />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() =>
                navigation.navigate("Search", {
                  query: searchText.trim(),
                })
              }
            >
              <Text style={styles.viewAllText}>
                View all results
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* QUICK AI */}

        <TouchableOpacity
          style={styles.aiCard}
          onPress={() => navigation.navigate("Chatbot")}
        >
          <View style={styles.aiIcon}>
            <Ionicons
              name="chatbubbles-outline"
              size={29}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTitle}>
              Ask MediPal AI
            </Text>

            <Text style={styles.aiSubtitle}>
              Ask about symptoms, diseases or medicines
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={23}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* CATEGORY TITLE */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Explore categories
            </Text>

            <Text style={styles.sectionSubtitle}>
              Find medicines by health category
            </Text>
          </View>
        </View>

        {/* CATEGORY GRID */}

        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                {
                  backgroundColor:
                    category.color,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => openCategory(category)}
            >
              <View
                style={[
                  styles.categoryIcon,
                  {
                    backgroundColor:
                      "#FFFFFF",
                  },
                ]}
              >
                <Ionicons
                  name={category.icon}
                  size={27}
                  color={category.iconColor}
                />
              </View>

              <Text style={styles.categoryTitle}>
                {category.title}
              </Text>

              <Text style={styles.categorySubtitle}>
                {category.subtitle}
              </Text>

              <View style={styles.arrowCircle}>
                <Ionicons
                  name="arrow-forward"
                  size={15}
                  color={category.iconColor}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* SAFETY MESSAGE */}

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#1976D2"
          />

          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>
              Health information
            </Text>

            <Text style={styles.infoDescription}>
              MediPal provides general health information.
              Always consult a qualified healthcare
              professional for medical advice.
            </Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FAFD",
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  smallTitle: {
    fontSize: 13,
    color: "#7A8793",
    marginBottom: 2,
  },

  logoText: {
    fontSize: 29,
    fontWeight: "800",
    color: "#12344D",
    letterSpacing: -0.5,
  },

  logoAccent: {
    color: "#1976D2",
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7EAFB",
  },

  welcomeCard: {
    minHeight: 125,
    borderRadius: 22,
    padding: 20,
    backgroundColor: "#1976D2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    marginBottom: 18,
  },

  welcomeTextContainer: {
    flex: 1,
    paddingRight: 12,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 7,
  },

  welcomeSubtitle: {
    color: "#EAF4FF",
    fontSize: 13,
    lineHeight: 19,
  },

  healthIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E1E9F0",
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#243746",
    marginLeft: 10,
    paddingVertical: 0,
  },

  searchResults: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E1E9F0",
    marginBottom: 14,
    overflow: "hidden",
  },

  resultItem: {
    minHeight: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1F5",
  },

  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  resultText: {
    flex: 1,
  },

  resultName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#253746",
  },

  resultCategory: {
    fontSize: 12,
    color: "#7C8994",
    marginTop: 3,
  },

  viewAllButton: {
    paddingVertical: 14,
    alignItems: "center",
  },

  viewAllText: {
    color: "#1976D2",
    fontSize: 14,
    fontWeight: "700",
  },

  aiCard: {
    minHeight: 76,
    borderRadius: 19,
    backgroundColor: "#5E35B1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 24,
  },

  aiIcon: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  aiTextContainer: {
    flex: 1,
  },

  aiTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 3,
  },

  aiSubtitle: {
    color: "#EDE7F6",
    fontSize: 12,
    lineHeight: 17,
  },

  sectionHeader: {
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#203746",
  },

  sectionSubtitle: {
    fontSize: 12.5,
    color: "#7A8793",
    marginTop: 4,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  categoryCard: {
    width: "48%",
    minHeight: 165,
    borderRadius: 20,
    padding: 15,
    marginBottom: 14,
    position: "relative",
  },

  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    elevation: 1,
  },

  categoryTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#253746",
    marginBottom: 5,
  },

  categorySubtitle: {
    fontSize: 11.5,
    color: "#687781",
    lineHeight: 16,
    paddingRight: 5,
  },

  arrowCircle: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  infoCard: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E1E9F0",
  },

  infoText: {
    flex: 1,
    marginLeft: 11,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#263B4A",
    marginBottom: 4,
  },

  infoDescription: {
    fontSize: 11.5,
    color: "#73808A",
    lineHeight: 17,
  },
});