import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../config/supabase";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.log("Supabase getSession error:", error.message);
        }

        if (mounted) {
          setSession(data?.session ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.log("Session error:", error);

        if (mounted) {
          setSession(null);
          setLoading(false);
        }
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

 const signUp = async (email, password, fullName) => {
  try {
    console.log("Starting Supabase sign up...");

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    console.log("Supabase sign up response:", {
      data,
      error: error?.message,
    });

    return { data, error };
  } catch (err) {
    console.log("Supabase sign up exception:", err);

    return {
      data: null,
      error: {
        message: err?.message || "Unable to connect to Supabase.",
      },
    };
  }
};

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email) => {
    return await supabase.auth.resetPasswordForEmail(email);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}