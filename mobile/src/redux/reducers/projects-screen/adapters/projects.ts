import { Project } from "@dzcode.io/api/dist/app/types/legacy";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const projectsAdapter = createEntityAdapter<Project>({
  selectId: (project) => project.slug,
});
