import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../context/AuthContext";

import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../services/FavoriteService";

import { useTheme } from "../context/ThemeContext";

export default function MedicineDetailScreen({
  route,
  navigation,
}) {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  const item = route?.params?.item;

  const [favorite, setFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const colors = darkMode
    ? {
        bg: "#101418",
        card: "#1A2026",
        text: "#FFFFFF",
        sub: "#AAB4BE",
        border: "#29323B",
        soft: "#202830",
      }
    : {
        bg: "#F5F7FA",
        card: "#FFFFFF",
        text: "#222222",
        sub: "#687386",
        border: "#EEEEEE",
        soft: "#F5F8FC",
      };

  // ======================================================
  // CHECK IF MEDICINE IS ALREADY FAVORITE
  // ======================================================

  useEffect(() => {
    let mounted = true;

    const checkFavorite = async () => {
      if (!user || !item?.id) {
        if (mounted) {
          setFavorite(false);
        }
        return;
      }

      try {
        const result = await isFavorite(
          user.id,
          item.id
        );

        if (mounted) {
          setFavorite(Boolean(result));
        }
      } catch (error) {
        console.log(
          "FAVORITE CHECK ERROR:",
          error
        );
      }
    };

    checkFavorite();

    return () => {
      mounted = false;
    };
  }, [user, item]);

  // ======================================================
  // TOGGLE FAVORITE
  // ======================================================

  const toggleFavorite = async () => {
    if (!user) {
      Alert.alert(
        "Login required",
        "Please sign in to save favorites."
      );
      return;
    }

    if (!item?.id) {
      Alert.alert(
        "Medicine error",
        "This medicine cannot be saved."
      );
      return;
    }

    setLoadingFavorite(true);

    try {
      if (favorite) {
        const success = await removeFavorite(
          user.id,
          item.id
        );

        if (success) {
          setFavorite(false);
        }
      } else {
        const success = await addFavorite(
          user.id,
          item.id,
          item
        );

        if (success) {
          setFavorite(true);
        }
      }
    } catch (error) {
      console.log(
        "FAVORITE ERROR:",
        error
      );

      Alert.alert(
        "Error",
        "Could not update favorites."
      );
    } finally {
      setLoadingFavorite(false);
    }
  };

  // ======================================================
  // MEDICINE NOT FOUND
  // ======================================================

  if (!item) {
    return (
      <View
        style={[
          styles.empty,
          {
            backgroundColor: colors.bg,
          },
        ]}
      >
        <Text style={styles.emptyIcon}>
          💊
        </Text>

        <Text
          style={[
            styles.emptyTitle,
            {
              color: colors.text,
            },
          ]}
        >
          Medicine not found
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ======================================================
  // SUPPORT BOTH OLD AND NEW MEDICINE DATA
  // ======================================================

  const symptoms = Array.isArray(item.symptoms)
    ? item.symptoms
    : [];

  const usedFor = Array.isArray(item.usedFor)
    ? item.usedFor
    : item.uses
      ? [item.uses]
      : [];

  const sideEffects = Array.isArray(
    item.sideEffects
  )
    ? item.sideEffects
    : [];

  const description =
    item.description ||
    item.uses ||
    "Medicine information is available here.";

  const precautions =
    item.precautions ||
    "Follow the advice of a qualified healthcare professional.";

  const category =
    item.category ||
    "General Medicine";

  const subcategory =
    item.subcategory ||
    "";

  const disease =
    item.disease ||
    subcategory ||
    "Health information";

  const howItWorks =
    item.howItWorks ||
    "This medicine works according to its specific medical action. Use it only as directed by a healthcare professional.";

  const whenToSeekHelp =
    item.whenToSeekHelp ||
    "Seek medical help if symptoms become severe, unusual, or do not improve.";

  const disclaimer =
    item.disclaimer ||
    "This information is for educational purposes only and is not a substitute for professional medical advice.";

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
        },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ==================================================
          HERO
      ================================================== */}

      <View style={styles.hero}>
        <View style={styles.medicineIconBox}>
          <Text style={styles.medicineIcon}>
            💊
          </Text>
        </View>

        <View style={styles.heroInfo}>
          <Text style={styles.heroName}>
            {item.name}
          </Text>

          <Text style={styles.heroDisease}>
            {disease}
          </Text>

          <Text style={styles.heroCategory}>
            {category}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
          disabled={loadingFavorite}
        >
          {loadingFavorite ? (
            <ActivityIndicator
              size="small"
              color="#1E88E5"
            />
          ) : (
            <Text style={styles.favoriteIcon}>
              {favorite ? "❤️" : "🤍"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* ==================================================
          WHAT IS IT?
      ================================================== */}

      <InfoCard
        title="💊 What is it?"
        text={description}
        colors={colors}
      />

      {/* ==================================================
          USED FOR
      ================================================== */}

      <InfoCard
        title="🎯 What is it used for?"
        colors={colors}
      >
        {usedFor.length > 0 ? (
          usedFor.map((value, index) => (
            <Text
              key={index}
              style={[
                styles.bullet,
                {
                  color: colors.sub,
                },
              ]}
            >
              • {value}
            </Text>
          ))
        ) : (
          <Text
            style={[
              styles.bodyText,
              {
                color: colors.sub,
              },
            ]}
          >
            Information about its uses is not
            available.
          </Text>
        )}
      </InfoCard>

      {/* ==================================================
          SYMPTOMS
      ================================================== */}

      {symptoms.length > 0 && (
        <InfoCard
          title="🩺 Related symptoms"
          colors={colors}
        >
          {symptoms.map((value, index) => (
            <Text
              key={index}
              style={[
                styles.bullet,
                {
                  color: colors.sub,
                },
              ]}
            >
              • {value}
            </Text>
          ))}
        </InfoCard>
      )}

      {/* ==================================================
          HOW IT WORKS
      ================================================== */}

      <InfoCard
        title="⚙️ How does it work?"
        text={howItWorks}
        colors={colors}
      />

      {/* ==================================================
          SIDE EFFECTS
      ================================================== */}

      {sideEffects.length > 0 && (
        <InfoCard
          title="⚠️ Common side effects"
          colors={colors}
        >
          {sideEffects.map((value, index) => (
            <Text
              key={index}
              style={[
                styles.bullet,
                {
                  color: colors.sub,
                },
              ]}
            >
              • {value}
            </Text>
          ))}
        </InfoCard>
      )}

      {/* ==================================================
          PRECAUTIONS
      ================================================== */}

      <View
        style={[
          styles.warningCard,
          {
            backgroundColor: darkMode
              ? "#332B18"
              : "#FFF8E8",
          },
        ]}
      >
        <Text style={styles.warningTitle}>
          ⚠️ Precautions
        </Text>

        <Text
          style={[
            styles.warningText,
            {
              color: darkMode
                ? "#E6D49A"
                : "#6E5A28",
            },
          ]}
        >
          {precautions}
        </Text>
      </View>

      {/* ==================================================
          WHEN TO SEEK HELP
      ================================================== */}

      <InfoCard
        title="🏥 When to seek medical help"
        text={whenToSeekHelp}
        colors={colors}
      />

      {/* ==================================================
          DISCLAIMER
      ================================================== */}

      <View
        style={[
          styles.disclaimer,
          {
            backgroundColor: darkMode
              ? "#17283A"
              : "#EEF6FF",
          },
        ]}
      >
        <Text style={styles.disclaimerTitle}>
          ℹ️ Important
        </Text>

        <Text
          style={[
            styles.disclaimerText,
            {
              color: colors.sub,
            },
          ]}
        >
          {disclaimer}
        </Text>
      </View>

      {/* ==================================================
          LARGE FAVORITE BUTTON
      ================================================== */}

      <TouchableOpacity
        style={[
          styles.favoriteLarge,
          {
            opacity: loadingFavorite ? 0.7 : 1,
          },
        ]}
        onPress={toggleFavorite}
        disabled={loadingFavorite}
      >
        {loadingFavorite ? (
          <ActivityIndicator
            color="#FFFFFF"
          />
        ) : (
          <Text
            style={styles.favoriteLargeText}
          >
            {favorite
              ? "❤️ Saved to Favorites"
              : "🤍 Add to Favorites"}
          </Text>
        )}
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

// ======================================================
// INFO CARD
// ======================================================

function InfoCard({
  title,
  text,
  children,
  colors,
}) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
          },
        ]}
      >
        {title}
      </Text>

      {text ? (
        <Text
          style={[
            styles.bodyText,
            {
              color: colors.sub,
            },
          ]}
        >
          {text}
        </Text>
      ) : null}

      {children}
    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
  },

  hero: {
    backgroundColor: "#1E88E5",
    borderRadius: 22,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  medicineIconBox: {
    width: 75,
    height: 75,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  medicineIcon: {
    fontSize: 38,
  },

  heroInfo: {
    flex: 1,
    marginLeft: 13,
  },

  heroName: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
  },

  heroDisease: {
    color: "#E2F0FF",
    fontSize: 13,
    marginTop: 4,
  },

  heroCategory: {
    color: "#C7E3FF",
    fontSize: 11,
    marginTop: 3,
  },

  favoriteButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteIcon: {
    fontSize: 22,
  },

  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 9,
  },

  bodyText: {
    fontSize: 14,
    lineHeight: 21,
  },

  bullet: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 3,
  },

  warningCard: {
    borderRadius: 18,
    padding: 17,
    marginBottom: 13,
  },

  warningTitle: {
    color: "#9A6A00",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8,
  },

  warningText: {
    fontSize: 13,
    lineHeight: 20,
  },

  disclaimer: {
    borderRadius: 18,
    padding: 17,
    marginBottom: 15,
  },

  disclaimerTitle: {
    color: "#1E88E5",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 7,
  },

  disclaimerText: {
    fontSize: 13,
    lineHeight: 20,
  },

  favoriteLarge: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#1E88E5",
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteLargeText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 55,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 10,
  },

  backButton: {
    marginTop: 20,
    backgroundColor: "#1E88E5",
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 13,
  },

  backText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});