import { ProjectEntity } from "@dzcode.io/models/dist/project";

export function getProjectURL({ id }: Pick<ProjectEntity, "id">): string {
  return `/projects/${id}`;
}
