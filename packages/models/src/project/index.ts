import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { BaseEntity } from "src/_base";
import { RepositoryEntityCompact } from "src/repository";

export class ProjectEntityCompact extends BaseEntity {
  // @TODO-ZM: move this to BaseEntity
  @IsNumber()
  id!: number;

  @IsString()
  slug!: string;

  @IsString()
  name!: string;
}

export class ProjectEntity extends ProjectEntityCompact {
  @IsString()
  runId!: string;
}

export class ProjectEntityForList extends ProjectEntityCompact {
  @ValidateNested({ each: true })
  @Type(() => RepositoryEntityCompact)
  repositories!: RepositoryEntityCompact[];
}
