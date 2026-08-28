import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { supabase } from "../config/supabase";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      Alert.alert(
        "Missing name",
        "Please enter your name."
      );
      return;
    }

    if (!cleanEmail) {
      Alert.alert(
        "Missing email",
        "Please enter your email."
      );
      return;
    }

    if (!password) {
      Alert.alert(
        "Missing password",
        "Please enter a password."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Password too short",
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match",
        "Please enter the same password twice."
      );
      return;
    }

    try {
      setLoading(true);

      console.log("CREATING MEDIPAL ACCOUNT...");

      const { data, error } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password: password,

          options: {
            data: {
              full_name: cleanName,
              name: cleanName,
            },
          },
        });

      console.log("SIGN UP RESPONSE:", {
        user: data?.user,
        session: data?.session,
        error: error?.message,
      });

      if (error) {
        Alert.alert(
          "Account creation failed",
          error.message
        );
        return;
      }

      /*
       * If email confirmation is enabled,
       * Supabase normally returns user but no session.
       */

      if (data?.user && !data?.session) {

        Alert.alert(
          "Account created!",
          "We sent a verification email to:\n\n" +
            cleanEmail +
            "\n\nPlease verify your email and then sign in.",
          [
            {
              text: "Go to Login",
              onPress: () =>
                navigation.replace("Login"),
            },
          ]
        );

        return;
      }

      /*
       * If email confirmation is disabled,
       * Supabase may immediately create a session.
       */

      if (data?.session) {
        Alert.alert(
          "Account created!",
          "Your Medipal account has been created.",
          [
            {
              text: "Continue",
              onPress: () =>
                navigation.replace("Login"),
            },
          ]
        );

        return;
      }

    } catch (error) {
      console.log(
        "SIGN UP EXCEPTION:",
        error
      );

      Alert.alert(
        "Sign up failed",
        error?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.logoBox}>
          <Text style={styles.logo}>💊</Text>
        </View>

        <Text style={styles.title}>
          Create your Medipal account
        </Text>

        <Text style={styles.subtitle}>
          Start managing your medicine companion
        </Text>

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Sign up
          </Text>

          <Text style={styles.cardSubtitle}>
            Create an account to continue
          </Text>

          <Text style={styles.label}>
            Name
          </Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#9AA3AF"
            autoCapitalize="words"
            editable={!loading}
          />

          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#9AA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            placeholderTextColor="#9AA3AF"
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />

          <Text style={styles.label}>
            Confirm Password
          </Text>

          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor="#9AA3AF"
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
            onSubmitEditing={handleSignUp}
          />

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.signinRow}>

            <Text style={styles.signinText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.replace("Login")
              }
              disabled={loading}
            >
              <Text style={styles.signinLink}>
                Sign In
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  logoBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#1E88E5",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
    elevation: 4,
  },

  logo: {
    fontSize: 36,
  },

  title: {
    textAlign: "center",
    color: "#1E88E5",
    fontSize: 24,
    fontWeight: "800",
  },

  subtitle: {
    textAlign: "center",
    color: "#7B8492",
    fontSize: 13,
    marginTop: 5,
    marginBottom: 22,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#222222",
  },

  cardSubtitle: {
    color: "#7B8492",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 18,
  },

  label: {
    color: "#333333",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 7,
  },

  input: {
    height: 50,
    backgroundColor: "#F5F7FA",
    borderRadius: 13,
    paddingHorizontal: 15,
    color: "#222222",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E1E6EC",
  },

  signupButton: {
    height: 52,
    backgroundColor: "#1E88E5",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 23,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  signinRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  signinText: {
    color: "#777777",
    fontSize: 13,
  },

  signinLink: {
    color: "#1E88E5",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 5,
  },
});