module.exports = {
  "roots": [
    "<rootDir>"
  ],
  // modulePaths: ['<rootDir>/src'],
  "preset": 'ts-jest',
  "transform": {
    "^.+\\.(ts||sjs||tsx||jsx)x?$": "babel-jest"
  },
  "testEnvironment": 'node',
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "setupFiles": [
    "<rootDir>/setupEnzyme.ts"
  ],
  "globals": {
    "ts-jest": {
      "babelConfig": true,
      "tsConfig": '<rootDir>/tsconfig.json'
    }
  },
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFilesAfterEnv": ["<rootDir>/setupEnzyme.ts"],
  "transformIgnorePatterns": [
    "/node_modules/(?!@fullcalendar)"
  ]
}
   
    //"setupTestFrameworkScriptFile": "C:\Users\BMWAU\Desktop\FANAKA\fanaka-client/src/setupEnzyme.ts",
  // }

// import type {Config} from '@jest/types';

// // Sync object
// const config: Config.InitialOptions = {
//   verbose: true,
//   coverageDirectory: 'coverage',
//   setupFiles: ['./enzyme.config.ts'],
//   testMatch: ['**/tests/**/*.tsx?(x)', '**/?(*.)+(spec|test).tsx?(x)']
// };
// export default config;