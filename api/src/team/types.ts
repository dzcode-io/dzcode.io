import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { Model } from "@dzcode.io/models/dist/_base";
import { GeneralResponseDto } from "../app/types";

export class GetTeamResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ContributorEntity)
  contributors!: Model<ContributorEntity, "repositories">[];
}
