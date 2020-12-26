module.exports = {
  presets: [
    // https://babeljs.io/docs/en/babel-preset-env
    "@babel/env",
    // https://babeljs.io/docs/en/babel-preset-typescript
    "@babel/preset-typescript",
    // https://babeljs.io/docs/en/babel-preset-react
    [
      "@babel/preset-react",
      {
        development: process.env.BABEL_ENV === "development",
        runtime: "automatic",
      },
    ],
  ],
  plugins: [
    // https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
    "@babel/proposal-class-properties",
    // https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread
    "@babel/proposal-object-rest-spread",
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    "@babel/plugin-transform-runtime",
  ],
};
