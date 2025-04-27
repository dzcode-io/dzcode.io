import { ContributionNoLang } from "@dzcode.io/models/dist/contribution";
import { DEFAULT_LANGUAGE, Language } from "@dzcode.io/models/dist/language";

export function getContributionURL(
  { id, title }: Pick<ContributionNoLang, "id" | "title">,
  lang?: Language,
): string {
  const escapedTitle = encodeURIComponent(title);
  const restOfUrl = `${escapedTitle}-${id}`;

  if (!lang) return `/contribute/${restOfUrl}`;

  if (lang === DEFAULT_LANGUAGE) return `/contribute/${restOfUrl}`;

  return `/${lang.code}/contribute/${restOfUrl}`;
}
