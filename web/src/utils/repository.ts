import { RepositoryEntity } from "@dzcode.io/models/dist/repository";

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
    case "bitbucket":
      return `https://bitbucket.org/${owner}/${name}`;
    default:
      return "";
  }
};
