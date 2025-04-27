import { DEFAULT_LANGUAGE, Language } from "@dzcode.io/models/dist/language";
import { ProjectEntity } from "@dzcode.io/models/dist/project";

export function getProjectURL({ id }: Pick<ProjectEntity, "id">, lang?: Language): string {
  if (!lang) return `/projects/${id}`;

  if (lang === DEFAULT_LANGUAGE) return `/projects/${id}`;

  return `/${lang.code}/projects/${id}`;
}
