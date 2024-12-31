// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Languages } = require("@dzcode.io/models/dist/language");

const baseUrl = process.env.LH_TEST_BASE_URL;
const serverBaseUrl = process.env.LH_SERVER_BASE_URL;
const token = process.env.LH_SERVER_TOKEN;
const overwriteURL = process.env.LH_OVERWRITE_URL;

let urls = ["", "/contribute", "/team", "/projects", "/faq"];

const args = process.argv.slice(2);
if (args.includes("--output-urls")) {
  console.log(`urls=${JSON.stringify(urls)}`);
} else if (typeof overwriteURL !== "undefined") {
  urls = [overwriteURL];
}

module.exports = {
  ci: {
    collect: {
      url: urls.reduce((acc, path) => {
        return acc.concat(
          Languages.map(({ code }) => `${baseUrl}${code === "en" ? "" : `/${code}`}${path}`),
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
