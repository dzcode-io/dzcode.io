import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { createEntityAdapter } from "@reduxjs/toolkit";

type Project = Model<ProjectEntity> & {
  repositories: Model<RepositoryEntity, "contributors" | "stats">[];
};

export const projectsAdapter = createEntityAdapter<Project>({
  selectId: (project) => project.slug,
});
