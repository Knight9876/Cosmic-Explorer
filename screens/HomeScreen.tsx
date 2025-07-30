import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFonts, Orbitron_500Medium } from "@expo-google-fonts/orbitron";
import StarBackground from "../components/StarBackground";
import * as Notifications from "expo-notifications";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

type Category = {
  key: string;
  label: string;
  icon: string;
};

const categories: Category[] = [
  { key: "planets", label: "Planets", icon: "🪐" },
  { key: "moons", label: "Moons", icon: "🌕" },
  { key: "asteroids", label: "Asteroids", icon: "🪨" },
  { key: "comets", label: "Comets", icon: "☄️" },
  { key: "stars", label: "Stars", icon: "🌟" },
  { key: "satellites", label: "Satellites", icon: "🛰️" },
  { key: "dwarfs", label: "Dwarf Planets", icon: "🔭" },
  { key: "all", label: "All", icon: "🌌" },
];

export default function HomeScreen({ navigation }: Props) {
  const [fontsLoaded] = useFonts({ Orbitron_500Medium });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <StarBackground />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StarBackground />

      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Choose a Celestial Topic</Text>
        </View>
        <View style={styles.gridContainer}>
          {categories.map((item, index) => {
            const isLastOddItem =
              categories.length % 2 === 1 && index === categories.length - 1;

            return (
              <TouchableOpacity
                key={item.key}
                onPress={() =>
                  navigation.navigate("Category", { type: item.key })
                }
                style={[styles.gridItem, isLastOddItem && styles.fullWidthItem]}
              >
                <Text style={styles.text}>
                  {item.icon} {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "System",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 24,
    color: "#ffffff",
    fontFamily: "Orbitron_500Medium",
    textAlign: "center",
    letterSpacing: 1.2,
    textShadowColor: "#5ac8fa",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  overlay: {
    flex: 1,
    padding: 16,
    backgroundColor: "transparent",
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },

  gridItem: {
    width: "45%", // 2 items per row with margin
    paddingVertical: 20,
    margin: 8,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(90, 200, 250, 0.4)",
    shadowColor: "#5ac8fa",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    justifyContent: "center",
    alignItems: "center",
  },

  fullWidthItem: {
    width: "94%", // Full width with padding/margin on sides
    alignSelf: "center",
  },

  text: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: "Orbitron_500Medium",
  },
});
