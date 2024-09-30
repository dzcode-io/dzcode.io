import { ProjectEntity } from "@dzcode.io/models/dist/project";

export function getProjectURL({ id, slug }: Pick<ProjectEntity, "id" | "slug">): string {
  return `/projects/${slug}-${id}`;
}
