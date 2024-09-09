export const Languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const;

export type Language = (typeof Languages)[number];
