import { ContributionNoLang } from "@dzcode.io/models/dist/contribution";

export function getContributionURL({
  id,
  title,
}: Pick<ContributionNoLang, "id" | "title">): string {
  return `/contribute/${title.replace(/\s/g, "-")}-${id}`;
}
