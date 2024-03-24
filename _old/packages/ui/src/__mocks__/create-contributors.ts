import { AccountEntity } from "@dzcode.io/models/dist/account";

export const createContributors = (number: number) => {
  const contributors: AccountEntity[] = [];
  for (let i = 0; i < number; i++) {
    contributors.push({
      id: `github/${i}`,
      username: `mock-user-${i}`,
      name: `mock-name-${i}`,
      profileUrl: `mock-profile-${i}`,
      avatarUrl: `mock-avatar-${i}`,
      repositories: [
        {
          owner: `user-${i}`,
          provider: `github`,
          repository: `repository-${i}`,
        },
      ],
    });
  }
  return contributors;
};
