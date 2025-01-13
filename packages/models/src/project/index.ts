import { StripLanguage } from "@dzcode.io/utils/dist/ts";
import { BaseEntity } from "src/_base";

export type ProjectEntity = BaseEntity & {
  name_ar: string;
  name_en: string;
};

export type ProjectNoLang = StripLanguage<ProjectEntity>;
