module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './', // Aponta para a raiz do projeto
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'expo-router/babel', // Necessário para Expo Router funcionar
    ],
  };
};
