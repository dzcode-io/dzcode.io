const RepositoryProviders = ["github", "gitlab"] as const;
type RepositoryProvider = (typeof RepositoryProviders)[number];

export interface RepositoryEntity {
  // @TODO-ZM: move this to BaseEntity
  id: number;
  owner: string;
  name: string;
  runId: string;
  provider: RepositoryProvider;
}
