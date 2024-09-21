import { ContributorEntity } from "@dzcode.io/models/dist/contributor";

export function getContributorURL({
  id,
  username,
}: Pick<ContributorEntity, "id" | "username">): string {
  return `/team/${username}-${id}`;
}
