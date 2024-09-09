import { RepositoryEntity } from "@dzcode.io/models/dist/repository";

export function getRepositoryName(repository: Pick<RepositoryEntity, "owner" | "name">): string {
  return `${repository.owner}/${repository.name}`;
}

export const getRepositoryURL = ({
  provider,
  owner,
  name,
}: Pick<RepositoryEntity, "provider" | "owner" | "name">): string => {
  switch (provider) {
    case "github":
      return `https://www.github.com/${owner}/${name}`;
    case "gitlab":
      return `https://www.gitlab.com/${owner}/${name}`;
    default:
      return "";
  }
};
