import { BaseEntity } from ".";
import { IsString } from "class-validator";

export class RepositoryReferenceEntity extends BaseEntity {
  @IsString()
  provider!: "github" | "gitlab";

  @IsString()
  owner!: string;

  @IsString()
  repository!: string;
}
