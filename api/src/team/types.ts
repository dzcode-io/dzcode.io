import { Model } from "@dzcode.io/models/dist/_base";
import { AccountEntity } from "@dzcode.io/models/dist/account";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { GeneralResponseDto } from "src/app/types";

export class GetTeamResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => AccountEntity)
  contributors!: Model<AccountEntity, "repositories">[];
}
