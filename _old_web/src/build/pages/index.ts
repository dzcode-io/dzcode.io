import { LanguageEntity } from "@dzcode.io/models/dist/language";

import { AllDictionaryKeys } from "../../components/t/dictionary"; // eslint-disable-line no-restricted-imports

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
// ts-prune-ignore-next
export { staticPages } from "./static-pages";
// ts-prune-ignore-next
export { dynamicPages } from "./dynamic-pages";
