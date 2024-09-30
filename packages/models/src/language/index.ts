export const allLanguages = [
  { code: "en", shortLabel: "EN", label: "English", direction: "ltr", baseUrl: "" },
  { code: "ar", shortLabel: "ع", label: "العربية", direction: "rtl", baseUrl: "/ar" },
] as const;

export interface LanguageEntity {
  code: (typeof allLanguages)[number]["code"];
  shortLabel: (typeof allLanguages)[number]["shortLabel"];
  label: (typeof allLanguages)[number]["label"];
  direction: (typeof allLanguages)[number]["direction"];
}
