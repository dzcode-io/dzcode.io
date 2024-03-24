import { IsString } from "class-validator";
import { BaseEntity } from "src/_base";

// @TODO-ZM: to remove this
export class RepositoryReferenceEntity extends BaseEntity {
  @IsString()
  provider!: "github" | "gitlab";

  @IsString()
  owner!: string;

  @IsString()
  repository!: string;
}
