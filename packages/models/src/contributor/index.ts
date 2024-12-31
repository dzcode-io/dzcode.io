import { BaseEntity } from "src/_base";
import { StripLanguage } from "@dzcode.io/utils/dist/ts";

export type ContributorEntity = BaseEntity & {
  name_ar: string;
  name_en: string;
  username: string;
  url: string;
  avatarUrl: string;
};

export type ContributorNoLang = StripLanguage<ContributorEntity>;
