export const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const;

export type Language = (typeof languages)[number];
