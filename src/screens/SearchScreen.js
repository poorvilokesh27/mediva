import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import medicineCatalog from "../data/medicineCatalog";

import { useTheme } from "../context/ThemeContext";

export default function SearchScreen({
  navigation,
  route,
}) {
  const { darkMode } = useTheme();

  const queryFromHome =
    route?.params?.query || "";

  const categoryFromHome =
    route?.params?.category || "";

  const categoryIdFromHome =
    route?.params?.categoryId || "";

  const [query, setQuery] =
    useState(queryFromHome);

  const [results, setResults] =
    useState([]);

  const colors = darkMode
    ? {
        bg: "#101418",
        card: "#1A2026",
        text: "#FFFFFF",
        sub: "#AAB4BE",
        border: "#29323B",
      }
    : {
        bg: "#F5F7FA",
        card: "#FFFFFF",
        text: "#222222",
        sub: "#707780",
        border: "#EEEEEE",
      };

  // ==================================================
  // SEARCH MEDICINES
  // ==================================================

  const searchMedicines = (
    searchValue,
    categoryValue,
    categoryIdValue
  ) => {
    const q = String(
      searchValue || ""
    )
      .trim()
      .toLowerCase();

    const category = String(
      categoryValue || ""
    )
      .trim()
      .toLowerCase();

    const categoryId = String(
      categoryIdValue || ""
    )
      .trim()
      .toLowerCase();

    const filtered =
      medicineCatalog.filter((item) => {
        const itemName = String(
          item.name || ""
        ).toLowerCase();

        const itemCategory = String(
          item.category || ""
        ).toLowerCase();

        const itemSubcategory =
          String(
            item.subcategory || ""
          ).toLowerCase();

        const itemDisease =
          String(
            item.disease || ""
          ).toLowerCase();

        const itemDescription =
          String(
            item.description || ""
          ).toLowerCase();

        const itemHowItWorks =
          String(
            item.howItWorks || ""
          ).toLowerCase();

        const itemCategoryId =
          String(
            item.categoryId || ""
          ).toLowerCase();

        const usedFor =
          Array.isArray(item.usedFor)
            ? item.usedFor
                .join(" ")
                .toLowerCase()
            : "";

        const symptoms =
          Array.isArray(item.symptoms)
            ? item.symptoms
                .join(" ")
                .toLowerCase()
            : "";

        // ------------------------------------------
        // CATEGORY FILTER
        // ------------------------------------------

        const matchesCategory =
          !category &&
          !categoryId
            ? true
            : itemCategory === category ||
              itemCategoryId === categoryId;

        if (!matchesCategory) {
          return false;
        }

        // ------------------------------------------
        // SEARCH FILTER
        // ------------------------------------------

        if (!q) {
          return true;
        }

        const searchable = [
          itemName,
          itemCategory,
          itemSubcategory,
          itemDisease,
          itemDescription,
          itemHowItWorks,
          usedFor,
          symptoms,
        ].join(" ");

        return searchable.includes(q);
      });

    setResults(filtered);
  };

  // ==================================================
  // RUN SEARCH
  // ==================================================

  useEffect(() => {
    searchMedicines(
      queryFromHome,
      categoryFromHome,
      categoryIdFromHome
    );
  }, [
    queryFromHome,
    categoryFromHome,
    categoryIdFromHome,
  ]);

  // ==================================================
  // SEARCH TEXT CHANGE
  // ==================================================

  const handleSearch = (value) => {
    setQuery(value);

    searchMedicines(
      value,
      categoryFromHome,
      categoryIdFromHome
    );
  };

  // ==================================================
  // SCREEN TITLE
  // ==================================================

  const screenTitle =
    categoryFromHome
      ? categoryFromHome
      : "Search MediPal";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
        },
      ]}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          {screenTitle}
        </Text>

        {categoryFromHome ? (
          <Text
            style={[
              styles.subtitle,
              {
                color: colors.sub,
              },
            ]}
          >
            Medicines in this category
          </Text>
        ) : null}
      </View>

      {/* SEARCH BOX */}

      <View
        style={[
          styles.searchBox,
          {
            borderColor:
              colors.border,
            backgroundColor:
              colors.card,
          },
        ]}
      >
        <Text style={styles.icon}>
          🔎
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
            },
          ]}
          value={query}
          onChangeText={handleSearch}
          placeholder="Medicine, disease or symptom"
          placeholderTextColor="#999"
        />
      </View>

      {/* RESULT COUNT */}

      <Text
        style={[
          styles.resultCount,
          {
            color: colors.sub,
          },
        ]}
      >
        {results.length} medicine
        {results.length === 1
          ? ""
          : "s"} found
      </Text>

      {/* RESULTS */}

      <FlatList
        data={results}
        keyExtractor={(item, index) =>
          String(
            item.id ||
              item.name ||
              index
          )
        }
        contentContainerStyle={
          styles.list
        }
        showsVerticalScrollIndicator={
          false
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor:
                  colors.card,
                borderColor:
                  colors.border,
              },
            ]}
            onPress={() =>
              navigation.navigate(
                "MedicineDetail",
                {
                  item: item,
                }
              )
            }
          >
            {/* MEDICINE IMAGE */}

           <Image
  source={
    item.image
      ? item.image
      : require("../../assets/icon.png")
  }
  style={styles.image}
/>

            {/* MEDICINE INFORMATION */}

            <View
              style={styles.cardInfo}
            >
              <Text
                style={[
                  styles.name,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {item.name}
              </Text>

              <Text
                style={[
                  styles.disease,
                  {
                    color: colors.sub,
                  },
                ]}
              >
                {item.disease ||
                  item.subcategory ||
                  item.category ||
                  "Medicine"}
              </Text>

              <Text
                style={styles.use}
                numberOfLines={2}
              >
                Used for:{" "}
                {Array.isArray(
                  item.usedFor
                )
                  ? item.usedFor.join(
                      ", "
                    )
                  : item.uses ||
                    "General use"}
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>
              🔍
            </Text>

            <Text
              style={[
                styles.emptyTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              No information found
            </Text>

            <Text
              style={[
                styles.emptyText,
                {
                  color: colors.sub,
                },
              ]}
            >
              Try searching for a medicine,
              disease or symptom.
            </Text>
          </View>
        }
      />
    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    marginBottom: 15,
  },

  title: {
    fontSize: 23,
    fontWeight: "900",
  },

  subtitle: {
    fontSize: 12,
    marginTop: 4,
  },

  searchBox: {
    height: 54,
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  icon: {
    fontSize: 19,
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 14,
  },

  resultCount: {
    fontSize: 12,
    marginTop: 12,
    marginBottom: 8,
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    minHeight: 92,
    borderRadius: 17,
    borderWidth: 1,
    padding: 11,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 65,
    height: 65,
    borderRadius: 14,
    backgroundColor: "#EAF4FF",
  },

  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
  },

  disease: {
    fontSize: 12,
    marginTop: 3,
  },

  use: {
    color: "#1E88E5",
    fontSize: 11,
    marginTop: 5,
  },

  arrow: {
    color: "#1E88E5",
    fontSize: 30,
  },

  empty: {
    alignItems: "center",
    paddingTop: 80,
  },

  emptyIcon: {
    fontSize: 50,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 12,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 30,
    textAlign: "center",
  },
});