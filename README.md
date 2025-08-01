<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #0a0a0a; color: #f0f0f0; line-height: 1.6; padding: 2rem;">

  <h1 style="color: #f9f871;">🌌 Cosmic Explorer</h1>

  <p><strong>Cosmic Explorer</strong> is a mobile app built with 
    <a href="https://reactnative.dev/" target="_blank" style="color: #66d9ef;">React Native</a> and 
    <a href="https://expo.dev" target="_blank" style="color: #66d9ef;">Expo</a> that lets users explore all the celestial bodies 
    in our solar system — from planets and moons to asteroids and beyond. Designed for space enthusiasts, learners, 
    and anyone curious about the cosmos.
  </p>

  <p style="text-align: center;">
    <img src="./assets/splash.png" alt="Cosmic Explorer splash screen" width="400" style="border-radius: 8px;">
  </p>

  <hr style="border-color: #333;">

  <h2 style="color: #f9f871;">🚀 Features</h2>
  <ul style="padding-left: 1.5rem;">
    <li>Browse planets, moons, and other celestial objects</li>
    <li>Tap to view detailed information and imagery</li>
    <li>Custom space-themed UI with Orbitron fonts</li>
    <li>Seamless navigation using React Navigation</li>
    <li>Scheduled push notifications to encourage daily space exploration</li>
    <li>Immersive dark mode with starfield background</li>
  </ul>

  <h2 style="color: #f9f871;">🧰 Tech Stack</h2>
  <ul style="padding-left: 1.5rem;">
    <li>React Native (Expo SDK)</li>
    <li>Expo Notifications (local push reminders)</li>
    <li>React Navigation</li>
    <li>Google Fonts (Orbitron)</li>
    <li>TypeScript</li>
    <li>NASA APIs</li>
    <li>N2YO API</li>
  </ul>

  <h2 style="color: #f9f871;">📲 Installation</h2>

  <h3 style="color: #f9f871;">Prerequisites</h3>
  <ul style="padding-left: 1.5rem;">
    <li><a href="https://nodejs.org/" target="_blank" style="color: #66d9ef;">Node.js</a></li>
    <li><a href="https://docs.expo.dev/get-started/installation/" target="_blank" style="color: #66d9ef;">Expo CLI</a></li>
    <li>A physical device (for push notifications)</li>
  </ul>

  <h3 style="color: #f9f871;">Getting Started</h3>
  <pre style="background-color: #1e1e1e; padding: 0.8rem; border-radius: 4px; color: #ffd580;">
git clone https://github.com/your-username/cosmic-explorer.git
cd cosmic-explorer
npm install
  </pre>

  <h3 style="color: #f9f871;">Run in Development</h3>
  <pre style="background-color: #1e1e1e; padding: 0.8rem; border-radius: 4px; color: #ffd580;">
npx expo start
  </pre>
  <p>Scan the QR code in Expo Go on your mobile device to launch the app.</p>

  <h2 style="color: #f9f871;">📦 Building the App</h2>
  <p><strong>Note:</strong> Requires 
    <a href="https://docs.expo.dev/eas/" target="_blank" style="color: #66d9ef;">EAS CLI</a>, 
    Expo account, and Expo-managed workflow.
  </p>

  <h3 style="color: #f9f871;">Android (APK or AAB)</h3>
  <pre style="background-color: #1e1e1e; padding: 0.8rem; border-radius: 4px; color: #ffd580;">
# Build APK
npx eas build --platform android --profile apk

# Build AAB
npx eas build --platform android --profile production
  </pre>

  <h3 style="color: #f9f871;">iOS</h3>
  <p><strong>Note:</strong> Requires an Apple Developer Account</p>
  <pre style="background-color: #1e1e1e; padding: 0.8rem; border-radius: 4px; color: #ffd580;">
npx eas build --platform ios --profile production
  </pre>

  <h2 style="color: #f9f871;">🔔 Push Notifications</h2>
  <ul style="padding-left: 1.5rem;">
    <li>The app requests notification permissions on first use</li>
    <li>A local reminder is scheduled 24 hours later</li>
    <li>The reminder is cancelled if the user opens the app again</li>
  </ul>

  <h2 style="color: #f9f871;">🌠 Contributions</h2>
  <p>Pull requests and feedback are welcome! Feel free to fork the repo and contribute to Cosmic Explorer.</p>

</body>
</html>
