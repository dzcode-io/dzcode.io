import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { v4 as uuid } from "uuid";

export const createContributors = (number: number) => {
  const contributors: ContributorEntity[] = [];
  for (let i = 0; i < number; i++) {
    contributors.push({
      id: uuid(),
      avatarUrl: `mock-avatar-${i}`,
      username: `mock-user-${i}`,
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
