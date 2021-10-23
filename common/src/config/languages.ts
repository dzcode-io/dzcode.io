export const languages = [
  { code: "en", shortLabel: "EN", label: "English" },
  { code: "ar", shortLabel: "AR", label: "العربية" },
  { code: "fr", shortLabel: "FR", label: "Français" },
] as const;

export type Language = typeof languages[number];
