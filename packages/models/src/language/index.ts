import { LanguageCode } from "@dzcode.io/utils/dist/language";

export interface Language {
  code: LanguageCode;
  shortLabel: string;
  label: string;
  direction: "ltr" | "rtl";
  baseUrl: string;
}

// todo: renamed to LANGUAGES
export const Languages: Language[] = [
  { code: "en", shortLabel: "EN", label: "English", direction: "ltr", baseUrl: "" },
  { code: "ar", shortLabel: "ع", label: "العربية", direction: "rtl", baseUrl: "/ar" },
];

export const DefaultLanguage: Language = Languages[0];
