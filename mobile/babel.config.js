// eslint-disable-next-line @typescript-eslint/no-var-requires
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
      "@babel/plugin-proposal-class-properties",
      process.env.NODE_ENV !== "test" && [
        "babel-plugin-typescript-to-proptypes",
        { comments: true },
      ],
    ].filter(Boolean),
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
