import { AppRegistry } from 'react-native';
import App from './App';

// Register the app for web
AppRegistry.registerComponent('SomitiManager', () => App);

// Run the app
AppRegistry.runApplication('SomitiManager', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
