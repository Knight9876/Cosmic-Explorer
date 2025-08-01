<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Cosmic Explorer</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #0a0a0a;
      color: #f0f0f0;
      line-height: 1.6;
      padding: 2rem;
    }
    h1, h2, h3 {
      color: #f9f871;
    }
    code, pre {
      background-color: #1e1e1e;
      padding: 0.4rem;
      border-radius: 4px;
      color: #ffd580;
      font-size: 0.95rem;
    }
    img {
      max-width: 100%;
      border-radius: 8px;
    }
    ul {
      list-style-type: '🚀 ';
      padding-left: 1.5rem;
    }
    a {
      color: #66d9ef;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <h1>🌌 Cosmic Explorer</h1>

  <p><strong>Cosmic Explorer</strong> is a mobile app built with 
    <a href="https://reactnative.dev/" target="_blank">React Native</a> and 
    <a href="https://expo.dev" target="_blank">Expo</a> that lets users explore all the celestial bodies 
    in our solar system — from planets and moons to asteroids and beyond. Designed for space enthusiasts, learners, 
    and anyone curious about the cosmos.
  </p>

  <p align="center">
    <img src="./assets/splash.png" alt="Cosmic Explorer splash screen" width="400">
  </p>

  <hr>

  <h2>🚀 Features</h2>
  <ul>
    <li>Browse planets, moons, and other celestial objects</li>
    <li>Tap to view detailed information and imagery</li>
    <li>Custom space-themed UI with Orbitron fonts</li>
    <li>Seamless navigation using React Navigation</li>
    <li>Scheduled push notifications to encourage daily space exploration</li>
    <li>Immersive dark mode with starfield background</li>
  </ul>

  <h2>🧰 Tech Stack</h2>
  <ul>
    <li>React Native (Expo SDK)</li>
    <li>Expo Notifications (local push reminders)</li>
    <li>React Navigation</li>
    <li>Google Fonts (Orbitron)</li>
    <li>TypeScript</li>
    <li>NASA APIs</li>
    <li>N2YO API</li>
  </ul>

  <h2>📲 Installation</h2>

  <h3>Prerequisites</h3>
  <ul>
    <li><a href="https://nodejs.org/" target="_blank">Node.js</a></li>
    <li><a href="https://docs.expo.dev/get-started/installation/" target="_blank">Expo CLI</a></li>
    <li>A physical device (for push notifications)</li>
  </ul>

  <h3>Getting Started</h3>
  <pre><code>git clone https://github.com/your-username/cosmic-explorer.git
cd cosmic-explorer
npm install</code></pre>

  <h3>Run in Development</h3>
  <pre><code>npx expo start</code></pre>
  <p>Scan the QR code in Expo Go on your mobile device to launch the app.</p>

  <h2>📦 Building the App</h2>
  <p><strong>Note:</strong> Requires <a href="https://docs.expo.dev/eas/" target="_blank">EAS CLI</a>, Expo account, and Expo-managed workflow.</p>

  <h3>Android (APK or AAB)</h3>
  <pre><code># Build APK
npx eas build --platform android --profile apk

# Build AAB
npx eas build --platform android --profile production</code></pre>

  <h3>iOS</h3>
  <p><strong>Note:</strong> Requires an Apple Developer Account</p>
  <pre><code>npx eas build --platform ios --profile production</code></pre>

  <h2>🔔 Push Notifications</h2>
  <ul>
    <li>The app requests notification permissions on first use</li>
    <li>A local reminder is scheduled 24 hours later</li>
    <li>The reminder is cancelled if the user opens the app again</li>
  </ul>

  <h2>🌠 Contributions</h2>
  <p>Pull requests and feedback are welcome! Feel free to fork the repo and contribute to Cosmic Explorer.</p>

</body>
</html>
