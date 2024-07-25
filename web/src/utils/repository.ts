export function getRepositoryName(repository: { owner: string; repository: string }): string {
  return `${repository.owner}/${repository.repository}`;
}

export const getRepositoryURL = (repository: {
  provider: string;
  owner: string;
  repository: string;
}): string => {
  switch (repository.provider) {
    case "github":
      return `https://www.github.com/${repository.owner}/${repository.repository}`;
    case "gitlab":
      return `https://www.gitlab.com/${repository.owner}/${repository.repository}`;
    default:
      return "";
  }
};
