import { RepositoryEntity } from "@dzcode.io/models/dist/repository";

export type DataProjectEntity = {
  name: string;
  slug: string;
  repositories: Array<{
    provider: RepositoryEntity["provider"];
    owner: string;
    name: string;
  }>;
};
