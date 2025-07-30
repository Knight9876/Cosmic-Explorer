import "dotenv/config";

export default {
  expo: {
    name: "Cosmic Explorer",
    slug: "cosmic-explorer",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/splash.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    extra: {
      NASA_API_KEY: process.env.NASA_API_KEY,
      N2YO_API_KEY: process.env.N2YO_API_KEY,
      eas: {
        projectId: "cc4f2557-30b1-471b-934b-0b0d4c110f2b",
      },
    },
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#000000",
    },
    ios: {
      supportsTablet: true,
      buildNumber: "1.0.0",
      bundleIdentifier: "com.knighthuxley.cosmicexplorer",
    },
    android: {
      package: "com.knighthuxley.cosmicexplorer",
      adaptiveIcon: {
        foregroundImage: "./assets/splash.png",
        backgroundColor: "#ffffff",
      },
      notification: {
        icon: "./assets/notification_icon.png",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: "./assets/splash.png",
    },
    plugins: ["expo-font"],
  },
};
