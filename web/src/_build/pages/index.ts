import { LanguageEntity } from "@dzcode.io/models/dist/language";

import { AllDictionaryKeys } from "../../components/locale/dictionary";

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
