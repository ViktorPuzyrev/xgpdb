module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["<rootDir>/tests/setup.js"],
  transform: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/tests/img-test-transformer.js",
  },
};
