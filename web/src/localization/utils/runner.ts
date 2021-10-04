const manageTranslations = require("react-intl-translations-manager").default;

manageTranslations({
  messagesDirectory: "src/localization/extractions",
  translationsDirectory: "src/localization/locals",
  languages: ["ar", "en", "fr"], // any language you need
});
