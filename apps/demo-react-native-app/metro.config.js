const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { withMdx } = require("@bacons/mdx/metro");

const config = getDefaultConfig(__dirname);
const nativeWindConfig = withNativeWind(config, { input: "./global.css" });
const mdxConfig = withMdx(nativeWindConfig);

module.exports = mdxConfig;
