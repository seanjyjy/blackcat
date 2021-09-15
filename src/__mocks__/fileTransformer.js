// fileTransformer.js
const path = require("path");

module.exports = {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  process(src, filename, config, options) {
    return "module.exports = " + JSON.stringify(path.basename(filename)) + ";";
  },
};
