import { Model } from "@dzcode.io/models/dist/_base";
import { MilestoneEntity } from "@dzcode.io/models/dist/milestone";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { GeneralResponseDto } from "../app/types";

export class GetMilestonesResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => MilestoneEntity)
  milestones!: Model<MilestoneEntity>[];
}
