import { Model } from "@dzcode.io/models/dist/_base";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";

export function getRepositoryName(repository: Model<RepositoryEntity>): string {
  return `${repository.owner}/${repository.repository}`;
}

export const getRepositoryURL = (repository: Model<RepositoryEntity>): string => {
  switch (repository.provider) {
    case "github":
      return `https://www.github.com/${repository.owner}/${repository.repository}`;
    case "gitlab":
      return `https://www.gitlab.com/${repository.owner}/${repository.repository}`;
    default:
      return "";
  }
};
