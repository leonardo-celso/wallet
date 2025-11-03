/** @type {import('jest').Config} */
module.exports = {
  
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },

    transformIgnorePatterns: [
    // Diz ao Jest para ignorar node_modules, EXCETO os pacotes listados abaixo
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  
  // Se for um projeto Expo, use o preset
  preset: 'jest-expo', 
  
  // Opcional: Para resolver o Path Alias
moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
     '^expo-asset$': '<rootDir>/__mocks__/expo-asset.js',
  },

};
