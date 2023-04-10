const { readFileSync } = require("fs");
const internalIp = require("internal-ip");
const localIP = internalIp.v4.sync();

let bundleInfo = { version: require("./package.json").version };
try {
  bundleInfo = JSON.parse(readFileSync(".bundle-info.json").toString());
} catch (error) {
  /**/
}

bundleInfo.channel = process.env.BUILD_CHANNEL;
if (bundleInfo.channel) throw new Error("BUILD_CHANNEL is not defined");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "transform-define",
        {
          "process.env.LOCAL_API_HOST": localIP,
          "window.bundleInfo": bundleInfo,
        },
      ],
      [
        "module-resolver",
        {
          root: ["../"],
          alias: {
            src: "./src",
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
