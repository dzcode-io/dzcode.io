import { BaseEntity } from "../_base";
import { IsIn } from "class-validator";

export const allLanguages = [
  { code: "en", shortLabel: "EN", label: "English" },
  { code: "ar", shortLabel: "ع", label: "العربية" },
] as const;

export class LanguageEntity extends BaseEntity {
  @IsIn(allLanguages.map(({ code }) => code))
  code!: typeof allLanguages[number]["code"];

  @IsIn(allLanguages.map(({ shortLabel }) => shortLabel))
  shortLabel!: typeof allLanguages[number]["shortLabel"];

  @IsIn(allLanguages.map(({ label }) => label))
  label!: typeof allLanguages[number]["label"];
}
