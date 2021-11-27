const internalIp = require("internal-ip");
const localIP = internalIp.v4.sync();
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
