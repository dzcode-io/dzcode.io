// eslint-disable-next-line @typescript-eslint/no-require-imports
const { allLanguages } = require("@dzcode.io/models/dist/language");

const baseUrl = process.env.LH_TEST_BASE_URL;
const serverBaseUrl = process.env.LH_SERVER_BASE_URL;
const token = process.env.LH_SERVER_TOKEN;

module.exports = {
  ci: {
    collect: {
      url: [
        "",
        // "/contribute",
        // "/team",
        // "/projects",
        // "/faq",
      ].reduce((acc, path) => {
        return acc.concat(
          allLanguages.map(({ code }) => `${baseUrl}${code === "en" ? "" : `/${code}`}${path}`),
        );
      }, []),
    },
    upload: {
      target: "lhci",
      serverBaseUrl,
      token,
    },
  },
};
