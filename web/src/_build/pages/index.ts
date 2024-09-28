import { LanguageEntity } from "@dzcode.io/models/dist/language";

import { AllDictionaryKeys } from "../../components/locale/dictionary";
import { staticPages } from "./static-pages";
import { templatePages } from "./template-pages";

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
export { templatePages } from "./template-pages";

export const allPages = [...staticPages, ...templatePages];
