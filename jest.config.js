module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileTransformer.js",
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    "node_modules",
    "src",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setUpTest.js"],
};
