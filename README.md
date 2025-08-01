# 🌌 Cosmic Explorer

Cosmic Explorer is a React Native mobile app built with [Expo](https://expo.dev) that lets users explore all the celestial bodies in our solar system — including planets, moons, and more. Designed for space enthusiasts, learners, and anyone curious about the cosmos.

![splash](./assets/splash.png)

---

## 🚀 Features

- 📖 Browse planets, moons, and other celestial bodies in the solar system
- 🔍 Tap for detailed information and imagery
- 🎨 Custom space-themed UI with Orbitron fonts
- 📱 Smooth navigation using React Navigation
- 🔔 Scheduled push notifications to encourage daily exploration
- 🌑 Dark-themed star background for immersive experience

---

## 📦 Tech Stack

- **React Native (Expo SDK)**
- **Expo Notifications** (local notifications)
- **React Navigation**
- **Google Fonts** (Orbitron)
- **TypeScript**
- **NASA APIs**
- **N2YO APIs**

---

## 📲 Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Physical device (for push notifications)

### Setup

```bash
git clone https://github.com/your-username/cosmic-explorer.git
cd cosmic-explorer
npm install
```

### Start in development

```bash
npx expo start
```

### Build the app

#### Android APK or AAB

```bash
npx eas build --platform android --profile apk  # For APK
npx eas build --platform android --profile production  # For AAB
```
#### iOS

Note: Requires Apple Developer account

```bash
npx eas build --platform ios --profile production
```

## 🔔 Notifications

- App requests permission and schedules a reminder 24 hours after first use
- Reminder is cancelled when the app is opened again  
