import { Model } from "src/_base";

import { RepositoryReferenceEntity } from ".";

export const getRepositoryURL = (repository: Model<RepositoryReferenceEntity>): string => {
  switch (repository.provider) {
    case "github":
      return `https://www.github.com/${repository.owner}/${repository.repository}`;
    case "gitlab":
      return `https://www.gitlab.com/${repository.owner}/${repository.repository}`;
  }
};
