
import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useAuth } from "../context/AuthContext";

import {
  isFavorite,
  toggleFavorite,
} from "../services/favoritesService";

export default function MedicineCard({
  item,
  onPress,
}) {
  const { user } = useAuth();

  const [favorite, setFavorite] =
    useState(false);

  const [favoriteLoading, setFavoriteLoading] =
    useState(false);

  // ----------------------------------------
  // Get medicine ID
  // ----------------------------------------

  const medicineId =
    item?.id
      ? String(item.id)
      : null;

  // ----------------------------------------
  // Load favorite status
  // ----------------------------------------

  useEffect(() => {
    let mounted = true;

    async function checkFavorite() {
      if (!user?.id || !medicineId) {
        return;
      }

      try {
        const result =
          await isFavorite(
            user.id,
            medicineId
          );

        if (mounted) {
          setFavorite(result);
        }
      } catch (error) {
        console.log(
          "Favorite check error:",
          error
        );
      }
    }

    checkFavorite();

    return () => {
      mounted = false;
    };
  }, [
    user?.id,
    medicineId,
  ]);

  // ----------------------------------------
  // Toggle favorite
  // ----------------------------------------

  const handleFavorite = async () => {
    if (!user?.id) {
      return;
    }

    if (favoriteLoading) {
      return;
    }

    try {
      setFavoriteLoading(true);

      const newStatus =
        await toggleFavorite(
          user.id,
          item,
          favorite
        );

      setFavorite(newStatus);
    } catch (error) {
      console.log(
        "Favorite toggle error:",
        error
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  // ----------------------------------------
  // Display name
  // ----------------------------------------

  const medicineName =
    item?.name ||
    item?.disease ||
    "Medicine";

  const category =
    item?.category ||
    "General health";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {/* LEFT */}

      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Text style={styles.medicineIcon}>
            💊
          </Text>
        </View>

        <View style={styles.info}>
          <Text
            style={styles.name}
            numberOfLines={2}
          >
            {medicineName}
          </Text>

          <Text
            style={styles.category}
            numberOfLines={1}
          >
            {category}
          </Text>
        </View>
      </View>

      {/* FAVORITE */}

      <TouchableOpacity
        style={styles.favoriteButton}
        activeOpacity={0.7}
        disabled={favoriteLoading}
        onPress={handleFavorite}
      >
        <Text style={styles.favoriteIcon}>
          {favorite ? "❤️" : "♡"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 2,
  },

  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,

    backgroundColor: "#EAF4FF",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  medicineIcon: {
    fontSize: 27,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222222",
  },

  category: {
    fontSize: 12,
    color: "#7B8492",
    marginTop: 5,
  },

  favoriteButton: {
    width: 46,
    height: 46,
    borderRadius: 23,

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 8,
  },

  favoriteIcon: {
    fontSize: 27,
  },
});

