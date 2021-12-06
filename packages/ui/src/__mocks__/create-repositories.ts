export const createRepositories = (number: number) => {
  const repositories = [];
  for (let i = 0; i < number; i++) {
    repositories.push({
      owner: `user-${i}`,
      provider: `github`,
      repository: `repository-${i}`,
    });
  }
  return repositories;
};
