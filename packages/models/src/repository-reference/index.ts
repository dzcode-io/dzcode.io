import { IsString } from "class-validator";

import { BaseEntity } from "../_base";

export class RepositoryReferenceEntity extends BaseEntity {
  @IsString()
  provider!: "github" | "gitlab";

  @IsString()
  owner!: string;

  @IsString()
  repository!: string;
}
