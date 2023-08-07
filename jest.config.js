
module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'esm'
  ],
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    testEnvironment: 'node',
    
    
  };

 