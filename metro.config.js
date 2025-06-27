const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Permite que o Metro Bundler entenda arquivos .cjs (CommonJS usados internamente pelo Firebase)
defaultConfig.resolver.sourceExts.push('cjs');

// Corrige conflitos de pacotes com exports não estáveis
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
