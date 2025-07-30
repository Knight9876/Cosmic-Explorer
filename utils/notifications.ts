// utils/notifications.ts

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform, AppState } from "react-native";

// 🔹 Register for Push Notifications (FCM/APNs)
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  if (!Device.isDevice) {
    alert("Must use physical device for Push Notifications");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return null;
  }

  const tokenResponse = await Notifications.getExpoPushTokenAsync();
  const token = tokenResponse.data;
  console.log("Expo Push Token:", token);

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

// 🔹 Schedule reminder after 24 hours (86400 seconds)
export async function scheduleInactivityReminder() {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "👀 Still exploring?",
        body: "Come back to Cosmic Explorer and discover more!",
        data: { reason: "inactivity" },
      },
      trigger: {
        seconds: 86400, // 24 hours
        repeats: false,
      } as any, // workaround for TS type compatibility
    });
  } catch (err) {
    console.error("Failed to schedule inactivity reminder:", err);
  }
}

// 🔹 Cancel all scheduled notifications (e.g., on app open)
export async function cancelScheduledNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (err) {
    console.error("Failed to cancel scheduled notifications:", err);
  }
}

// 🔹 Optional: Watch for app foreground to cancel 24hr reminder
export function setupInactivityCancellation() {
  return AppState.addEventListener("change", async (state) => {
    if (state === "active") {
      await cancelScheduledNotifications();
    }
  });
}
