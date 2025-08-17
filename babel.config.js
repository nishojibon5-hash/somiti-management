module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      'react-native-web/babel',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-transform-runtime',
      [
        'module-resolver',
        {
          alias: {
            '@': './client',
            '@shared': './shared',
          },
        },
      ],
    ],
  };
};
