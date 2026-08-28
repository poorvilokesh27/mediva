import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved =
        await AsyncStorage.getItem("medipal_theme");

      if (saved === "dark") {
        setDarkMode(true);
      }
    } catch (error) {
      console.log("Theme load error:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newValue = !darkMode;

      setDarkMode(newValue);

      await AsyncStorage.setItem(
        "medipal_theme",
        newValue ? "dark" : "light"
      );
    } catch (error) {
      console.log("Theme save error:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}