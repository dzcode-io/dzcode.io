import { BaseEntity } from "src/_base";
import { StripLanguage } from "@dzcode.io/utils/dist/ts";
import { Language } from "@dzcode.io/utils/dist/language";

export type ContributorEntity = BaseEntity & {
  name_ar: string;
  name_en: string;
  username: string;
  url: string;
  avatarUrl: string;
};

export type ContributorNoLang = StripLanguage<Language, ContributorEntity>;
