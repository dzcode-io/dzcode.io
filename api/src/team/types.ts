import { Model } from "@dzcode.io/models/dist/_base";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { GeneralResponseDto } from "src/app/types";

export class GetTeamResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ContributorEntity)
  contributors!: Model<ContributorEntity, "repositories">[];
}
