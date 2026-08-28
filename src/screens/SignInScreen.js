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

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Alert.alert(
        "Missing details",
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (error) {
        console.log("SIGN IN ERROR:", error);

        Alert.alert(
          "Sign in failed",
          error.message
        );

        return;
      }

      console.log("SIGN IN SUCCESS:", data?.user);

      // AuthContext will automatically detect the session
      // and AppNavigator will open MainTabs.

    } catch (error) {
      console.log("SIGN IN EXCEPTION:", error);

      Alert.alert(
        "Sign in failed",
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      Alert.alert(
        "Enter email",
        "Please enter your email first."
      );
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          cleanEmail
        );

      if (error) {
        Alert.alert(
          "Reset failed",
          error.message
        );
        return;
      }

      Alert.alert(
        "Check your email",
        "Password reset instructions have been sent to your email."
      );

    } catch (error) {
      console.log("RESET ERROR:", error);

      Alert.alert(
        "Reset failed",
        "Something went wrong. Please try again."
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
          Welcome to Medipal
        </Text>

        <Text style={styles.subtitle}>
          Your medicine companion
        </Text>

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Sign in
          </Text>

          <Text style={styles.cardSubtitle}>
            Enter your account details to continue
          </Text>

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
            placeholder="Enter your password"
            placeholderTextColor="#9AA3AF"
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
            onSubmitEditing={handleSignIn}
          />

          <TouchableOpacity
            onPress={handleForgotPassword}
            disabled={loading}
            style={styles.forgotButton}
          >
            <Text style={styles.forgotText}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signinButton}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupRow}>

            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SignUp")
              }
              disabled={loading}
            >
              <Text style={styles.signupLink}>
                Create Account
              </Text>
            </TouchableOpacity>

          </View>

        </View>

        <Text style={styles.footer}>
          Medipal helps you search medicines,
          manage reminders, history and chat.
        </Text>

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
    fontSize: 25,
    fontWeight: "800",
  },

  subtitle: {
    textAlign: "center",
    color: "#7B8492",
    fontSize: 14,
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

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },

  forgotText: {
    color: "#1E88E5",
    fontWeight: "700",
    fontSize: 13,
  },

  signinButton: {
    height: 52,
    backgroundColor: "#1E88E5",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  signupText: {
    color: "#777777",
    fontSize: 13,
  },

  signupLink: {
    color: "#1E88E5",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 5,
  },

  footer: {
    textAlign: "center",
    color: "#9AA3AF",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 18,
  },
});