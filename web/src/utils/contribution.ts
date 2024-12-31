import { ContributionEntity } from "@dzcode.io/models/dist/contribution";

export function getContributionURL({
  id,
  title,
}: Pick<ContributionEntity, "id" | "title">): string {
  return `/contribute/${title.replace(/\s/g, "-")}-${id}`;
}
