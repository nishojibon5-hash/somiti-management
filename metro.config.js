const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// React Native Web support
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.alias = {
  'react-native': 'react-native-web',
  'react-native-svg': 'react-native-svg-web',
};

// Support for shared client folder
config.resolver.alias['@'] = path.resolve(__dirname, './client');
config.resolver.alias['@shared'] = path.resolve(__dirname, './shared');

// Web extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'web.js', 'web.ts', 'web.tsx'];

module.exports = config;
