module.exports = {
  "roots": [
    "<rootDir>"
  ],
  "preset": 'ts-jest',
  "transform": {
    "^.+\\.(ts||sjs||tsx||jsx)x?$": "babel-jest"
  },
  "testEnvironment": 'node',
  "collectCoverage":true,
  // "coverageReporters": ["json-summary"],
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
    "/node_modules/(?!MODULE_NAME_HERE).+\\.js$"
  ]
}
   