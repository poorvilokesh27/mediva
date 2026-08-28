import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";

import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen({
  navigation,
}) {
  const {
    darkMode,
    toggleTheme,
  } = useTheme();

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

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor:
            colors.bg,
        },
      ]}
      contentContainerStyle={
        styles.content
      }
    >
      <Text
        style={[
          styles.title,
          { color: colors.text },
        ]}
      >
        Settings ⚙️
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: colors.sub },
        ]}
      >
        Customize your MediPal experience
      </Text>

      <View
        style={[
          styles.section,
          {
            backgroundColor:
              colors.card,
            borderColor:
              colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Appearance
        </Text>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.icon}>
              {darkMode
                ? "🌙"
                : "☀️"}
            </Text>

            <View>
              <Text
                style={[
                  styles.rowTitle,
                  {
                    color:
                      colors.text,
                  },
                ]}
              >
                {darkMode
                  ? "Dark Mode"
                  : "Light Mode"}
              </Text>

              <Text
                style={[
                  styles.rowText,
                  {
                    color:
                      colors.sub,
                  },
                ]}
              >
                {darkMode
                  ? "Dark appearance enabled"
                  : "Light appearance enabled"}
              </Text>
            </View>
          </View>

          <Switch
            value={darkMode}
            onValueChange={
              toggleTheme
            }
            trackColor={{
              false: "#D0D7DE",
              true: "#8BBCEB",
            }}
            thumbColor={
              darkMode
                ? "#1E88E5"
                : "#FFFFFF"
            }
          />
        </View>
      </View>

      <View
        style={[
          styles.section,
          {
            backgroundColor:
              colors.card,
            borderColor:
              colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          MediPal
        </Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            navigation.navigate(
              "Chatbot"
            )
          }
        >
          <Text style={styles.icon}>
            🤖
          </Text>

          <View style={styles.optionInfo}>
            <Text
              style={[
                styles.rowTitle,
                { color: colors.text },
              ]}
            >
              AI Assistant
            </Text>

            <Text
              style={[
                styles.rowText,
                { color: colors.sub },
              ]}
            >
              Ask general health questions
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            navigation.navigate(
              "Reminders"
            )
          }
        >
          <Text style={styles.icon}>
            ⏰
          </Text>

          <View style={styles.optionInfo}>
            <Text
              style={[
                styles.rowTitle,
                { color: colors.text },
              ]}
            >
              Medicine Reminders
            </Text>

            <Text
              style={[
                styles.rowText,
                { color: colors.sub },
              ]}
            >
              Manage your reminders
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.about,
          {
            backgroundColor:
              darkMode
                ? "#17283A"
                : "#EEF6FF",
          },
        ]}
      >
        <Text style={styles.aboutTitle}>
          MediPal 💊
        </Text>

        <Text
          style={[
            styles.aboutText,
            { color: colors.sub },
          ]}
        >
          General health information,
          medicine information and AI
          assistance in one place.
        </Text>

        <Text
          style={[
            styles.aboutText,
            { color: colors.sub },
          ]}
        >
          ⚠️ MediPal does not diagnose
          diseases or prescribe medicines.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    fontSize: 27,
    fontWeight: "900",
  },

  subtitle: {
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
  },

  section: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    fontSize: 23,
    width: 38,
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  rowText: {
    fontSize: 11,
    marginTop: 3,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  optionInfo: {
    flex: 1,
    marginLeft: 5,
  },

  arrow: {
    color: "#1E88E5",
    fontSize: 28,
  },

  about: {
    borderRadius: 18,
    padding: 17,
  },

  aboutTitle: {
    color: "#1E88E5",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 7,
  },

  aboutText: {
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 7,
  },
});