import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { DEFAULT_LANGUAGE, Language } from "@dzcode.io/models/dist/language";

export function getContributorURL({ id }: Pick<ContributorEntity, "id">, lang?: Language): string {
  if (!lang) return `/team/${id}`;

  if (lang === DEFAULT_LANGUAGE) return `/team/${id}`;

  return `/${lang.code}/team/${id}`;
}
