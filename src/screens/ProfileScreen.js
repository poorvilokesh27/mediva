import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  useAuth,
} from "../context/AuthContext";

export default function ProfileScreen({
  navigation,
}) {
  const {
    user,
    signOut,
  } = useAuth();

  const email =
    user?.email || "No email available";

  async function handleSignOut() {
    Alert.alert(
      "Sign out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Sign out",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              console.log(
                "Sign out error:",
                error
              );
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.goBack()
          }
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Profile
        </Text>

        <View style={{ width: 42 }} />

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* PROFILE */}

        <View style={styles.profileCard}>

          <View style={styles.avatar}>

            <MaterialCommunityIcons
              name="account"
              size={45}
              color="#1976D2"
            />

          </View>

          <Text style={styles.profileName}>
            MediPal User
          </Text>

          <Text style={styles.email}>
            {email}
          </Text>

        </View>

        {/* ACCOUNT */}

        <Text style={styles.sectionTitle}>
          Account
        </Text>

        <View style={styles.menuCard}>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate(
                "Favorites"
              )
            }
          >

            <View style={styles.menuIcon}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={23}
                color="#1976D2"
              />
            </View>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                My Favorites
              </Text>

              <Text style={styles.menuSubtitle}>
                Saved medicines
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={23}
              color="#9AA4B2"
            />

          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate(
                "Reminders"
              )
            }
          >

            <View style={styles.menuIcon}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={23}
                color="#1976D2"
              />
            </View>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                Medicine Reminders
              </Text>

              <Text style={styles.menuSubtitle}>
                Manage your reminder schedule
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={23}
              color="#9AA4B2"
            />

          </TouchableOpacity>

        </View>

        {/* APP */}

        <Text style={styles.sectionTitle}>
          App
        </Text>

        <View style={styles.menuCard}>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate(
                "Settings"
              )
            }
          >

            <View style={styles.menuIcon}>
              <MaterialCommunityIcons
                name="cog-outline"
                size={23}
                color="#1976D2"
              />
            </View>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                Settings
              </Text>

              <Text style={styles.menuSubtitle}>
                App preferences
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={23}
              color="#9AA4B2"
            />

          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate(
                "Chatbot"
              )
            }
          >

            <View style={styles.menuIcon}>
              <MaterialCommunityIcons
                name="robot-outline"
                size={23}
                color="#1976D2"
              />
            </View>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                Ask MediPal
              </Text>

              <Text style={styles.menuSubtitle}>
                Health information assistant
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={23}
              color="#9AA4B2"
            />

          </TouchableOpacity>

        </View>

        {/* SIGN OUT */}

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.8}
        >

          <MaterialCommunityIcons
            name="logout"
            size={22}
            color="#D32F2F"
          />

          <Text style={styles.signOutText}>
            Sign out
          </Text>

        </TouchableOpacity>

        <Text style={styles.version}>
          MediPal
        </Text>

        <View style={{ height: 40 }} />

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  header: {
    height: 70,
    backgroundColor: "#1976D2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  content: {
    padding: 16,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 25,
    borderWidth: 1,
    borderColor: "#E1E8F0",
    elevation: 2,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#EAF3FC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  profileName: {
    fontSize: 19,
    fontWeight: "800",
    color: "#243B53",
  },

  email: {
    fontSize: 12,
    color: "#718096",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#243B53",
    marginTop: 24,
    marginBottom: 10,
  },

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E1E8F0",
    elevation: 1,
  },

  menuItem: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  menuIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#EAF3FC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  menuText: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#243B53",
  },

  menuSubtitle: {
    fontSize: 11,
    color: "#7A8795",
    marginTop: 3,
  },

  separator: {
    height: 1,
    backgroundColor: "#EDF1F5",
    marginLeft: 69,
  },

  signOutButton: {
    marginTop: 25,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#FFF1F1",
    borderWidth: 1,
    borderColor: "#F5D4D4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  signOutText: {
    color: "#D32F2F",
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 9,
  },

  version: {
    textAlign: "center",
    color: "#9AA4B2",
    fontSize: 11,
    marginTop: 20,
  },

});