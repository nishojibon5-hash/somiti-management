import { Platform } from 'react-native';

// Import the appropriate app version based on platform
let App;

if (Platform.OS === 'web') {
  // For web, we can use either React or React Native Web
  // This allows for gradual migration and best of both worlds
  try {
    App = require('./client/App.native').default;
  } catch (error) {
    // Fallback to regular React app if native version fails
    App = require('./client/App').default;
  }
} else {
  // For mobile platforms, use React Native version
  App = require('./client/App.native').default;
}

export default App;
