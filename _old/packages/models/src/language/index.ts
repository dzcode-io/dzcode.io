import { IsIn } from "class-validator";
import { BaseEntity } from "src/_base";

export const allLanguages = [
  { code: "en", shortLabel: "EN", label: "English", direction: "ltr" },
  { code: "ar", shortLabel: "ع", label: "العربية", direction: "rtl" },
] as const;

export class LanguageEntity extends BaseEntity {
  @IsIn(allLanguages.map(({ code }) => code))
  code!: typeof allLanguages[number]["code"];

  @IsIn(allLanguages.map(({ shortLabel }) => shortLabel))
  shortLabel!: typeof allLanguages[number]["shortLabel"];

  @IsIn(allLanguages.map(({ label }) => label))
  label!: typeof allLanguages[number]["label"];

  @IsIn(allLanguages.map(({ direction }) => direction))
  direction!: typeof allLanguages[number]["direction"];
}
