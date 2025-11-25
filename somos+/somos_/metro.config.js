// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

// 1. Pega a configuração padrão do Expo
const defaultConfig = getDefaultConfig(__dirname);

// 2. Tira "svg" da lista de ASSETS (o "Registry")
// (Para que ele não seja tratado como imagem)
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext) => ext !== 'svg'
);

// 3. Adiciona "svg" na lista de CÓDIGO FONTE
// (Para que ele seja lido como JS/TS)
defaultConfig.resolver.sourceExts.push('svg');

// 4. Diz ao Babel (transformador) para usar o 'react-native-svg-transformer'
// para qualquer arquivo que agora é "código fonte" (incluindo .svg)
defaultConfig.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer'
);

// 5. Exporta a configuração modificada
module.exports = defaultConfig;