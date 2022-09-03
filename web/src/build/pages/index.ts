import { LanguageEntity } from "@dzcode.io/models/dist/language";

import { AllDictionaryKeys } from "../../components/t/dictionary";

export interface PageInfo {
  uri: string;
  title: string;
  description: string;
  ogImage: string;
  keywords: string;
  lang: LanguageEntity["code"];
}

export type PageInfoWithLocalKeys = Omit<PageInfo, "lang" | "title" | "description"> & {
  title: AllDictionaryKeys;
  description: AllDictionaryKeys;
};

export { staticPages } from "./static-pages";
export { dynamicPages } from "./dynamic-pages";
