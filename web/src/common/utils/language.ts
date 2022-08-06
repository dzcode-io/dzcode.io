import { allLanguages } from "@dzcode.io/models/dist/language";

export const urlLanguageRegEx = `/:lang(${allLanguages.map(({ code }) => code).join("|")})?`;
