import { Model } from "@dzcode.io/models/dist/_base";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { createEntityAdapter } from "@reduxjs/toolkit";

type Contribution = Model<ContributionEntity, "project">;

export const contributionsAdapter = createEntityAdapter<Contribution>({
  selectId: (contribution) => contribution.id,
});
