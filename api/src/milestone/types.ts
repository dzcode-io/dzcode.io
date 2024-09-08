import { MilestoneEntity } from "@dzcode.io/models/dist/milestone";
import { GeneralResponseDto } from "src/app/types";

export interface GetMilestonesResponseDto extends GeneralResponseDto {
  milestones: MilestoneEntity[];
}
