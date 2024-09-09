import { MilestoneEntity } from "@dzcode.io/models/dist/milestone";
import { GeneralResponse } from "src/app/types";

export interface GetMilestonesResponse extends GeneralResponse {
  milestones: MilestoneEntity[];
}
