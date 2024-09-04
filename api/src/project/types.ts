import { ProjectEntityForList } from "@dzcode.io/models/dist/project";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { GeneralResponseDto } from "src/app/types";

// @TODO-ZM: remove Model<> from existence

export class GetProjectsResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ProjectEntityForList)
  projects!: Array<ProjectEntityForList>;
}
