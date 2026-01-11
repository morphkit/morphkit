const { getDefaultConfig } = require("expo/metro-config");
const { withMdx } = require("@bacons/mdx/metro");

const config = getDefaultConfig(__dirname);
module.exports = withMdx(config);
