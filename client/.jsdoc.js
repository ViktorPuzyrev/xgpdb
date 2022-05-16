module.exports = {
  plugins: ["node_modules/jsdoc-vuejs"],
  source: {
    include: [
      "src/",
      "src/components",
      "src/mixins",
      "src/router",
      "src/store",
      "src/store/modules",
      "src/views",
      "README.md",
    ],
    includePattern: "\\.(vue|js)$",
  },
  opts: {
    encoding: "utf8",
  },
};
