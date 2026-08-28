import React, { useCallback, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import {
  getFavorites,
  removeFavorite,
} from "../services/FavoriteService";

import { useAuth } from "../context/AuthContext";

export default function FavoriteScreen({ navigation }) {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getFavorites(user.id);

      setFavorites(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("GET FAVORITES ERROR:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const handleRemove = (item) => {
    Alert.alert(
      "Remove Favourite",
      `Remove ${
        item.medicine_name || "this medicine"
      } from favourites?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              const success = await removeFavorite(
                user.id,
                item.medicine_id
              );

              if (success) {
                setFavorites((previous) =>
                  previous.filter(
                    (favorite) => favorite.id !== item.id
                  )
                );
              }
            } catch (error) {
              console.log("REMOVE FAVORITE ERROR:", error);

              Alert.alert(
                "Error",
                "Could not remove this medicine from favourites."
              );
            }
          },
        },
      ]
    );
  };

  const openMedicine = (item) => {
    if (!item.medicine_data) {
      return;
    }

    navigation.navigate("MedicineDetail", {
      item: item.medicine_data,
    });
  };

  const renderItem = ({ item }) => {
    const medicine = item.medicine_data || {};

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => openMedicine(item)}
      >
        <View style={styles.icon}>
          <Text style={styles.iconText}>💊</Text>
        </View>

        <View style={styles.info}>
          <Text
            style={styles.name}
            numberOfLines={2}
          >
            {item.medicine_name || "Medicine"}
          </Text>

          <Text style={styles.category}>
            {medicine.category || "General Health"}
          </Text>

          {Array.isArray(medicine.symptoms) &&
          medicine.symptoms.length > 0 ? (
            <Text
              style={styles.symptoms}
              numberOfLines={2}
            >
              {medicine.symptoms.join(", ")}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.remove}
          activeOpacity={0.7}
          onPress={() => handleRemove(item)}
        >
          <Text style={styles.removeText}>❤️</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favourites</Text>

        <Text style={styles.subtitle}>
          Your saved medicines
        </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#1E88E5"
          />

          <Text style={styles.loadingText}>
            Loading favourites...
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            String(item.id || `favorite-${index}`)
          }
          contentContainerStyle={
            favorites.length === 0
              ? styles.emptyContainer
              : styles.list
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>
                ❤️
              </Text>

              <Text style={styles.emptyTitle}>
                No favourites yet
              </Text>

              <Text style={styles.emptyText}>
                Save medicines you want to find
                quickly later.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E88E5",
  },

  subtitle: {
    color: "#777",
    fontSize: 13,
    marginTop: 3,
  },

  list: {
    padding: 16,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 13,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  icon: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  iconText: {
    fontSize: 27,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222",
  },

  category: {
    color: "#1E88E5",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3,
  },

  symptoms: {
    color: "#687386",
    fontSize: 12,
    marginTop: 4,
  },

  remove: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFF0F2",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
  },

  removeText: {
    fontSize: 19,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#777",
  },

  emptyContainer: {
    flexGrow: 1,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 35,
  },

  emptyIcon: {
    fontSize: 60,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#333",
    marginTop: 12,
  },

  emptyText: {
    color: "#777",
    textAlign: "center",
    marginTop: 7,
    lineHeight: 20,
  },
});