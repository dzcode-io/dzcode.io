import { ContributorEntity } from "@dzcode.io/models/dist/contributor";

export function getContributorURL({ id }: Pick<ContributorEntity, "id">): string {
  return `/team/${id}`;
}
