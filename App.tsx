// App.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import { StatusBar } from "expo-status-bar";
import { useFonts, Orbitron_700Bold } from "@expo-google-fonts/orbitron";
import * as SplashScreen from "expo-splash-screen";
import { View, Text, Image, StyleSheet } from "react-native";
import CategoryScreen from "./screens/CategoryScreen";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  scheduleInactivityReminder, // ✅ Use this name
  setupInactivityCancellation,
} from "./utils/notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export type RootStackParamList = {
  Home: undefined;
  Category: { type: string };
  Details: { link: string; bodyType: string; id?: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({ Orbitron_700Bold });


  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        scheduleInactivityReminder(); // ✅ correct call
      }
    });

    const listener = setupInactivityCancellation(); // ✅ optional, cancels if app is reopened

    return () => {
      listener?.remove();
    };
  }, []);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        setAppIsReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Still showing splash
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <NavigationContainer onReady={onLayoutRootView}>
        <StatusBar style="light" backgroundColor="#000" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontFamily: "Orbitron_700Bold" },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: () => (
                <View style={styles.header}>
                  <Image
                    source={require("./assets/splash.jpg")}
                    style={styles.logo}
                  />
                  <Text style={styles.headerText}>Cosmic Explorer</Text>
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={({ route }) => ({
              headerTitle: () => (
                <View style={styles.header}>
                  <Text style={styles.headerText}>
                    {route.params.type.charAt(0).toUpperCase()}
                    {route.params.type.slice(1)}
                  </Text>
                </View>
              ),
            })}
          />

          <Stack.Screen
            name="Details"
            component={DetailScreen}
            options={{
              headerTitle: () => (
                <View style={styles.header}>
                  <Text style={styles.headerText}>Celestial Info</Text>
                </View>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingLeft: 0,
    marginBottom: 8,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Orbitron_700Bold",
    letterSpacing: 1,
    color: "#fff",
  },
});
