import { StripLanguage } from "@dzcode.io/utils/dist/ts";
import { BaseEntity } from "src/_base";

export type ContributionEntity = BaseEntity & {
  title_ar: string;
  title_en: string;
  type: "ISSUE" | "PULL_REQUEST";
  url: string;
  updatedAt: string;
  activityCount: number;
};

export type ContributionNoLang = StripLanguage<ContributionEntity>;
