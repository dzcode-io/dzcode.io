import { Model } from "@dzcode.io/models/dist/_base";
import { DocumentationEntity, DocumentationInfoEntity } from "@dzcode.io/models/dist/documentation";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { GeneralResponseDto } from "src/app/types";

export class GetDocumentationResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => DocumentationInfoEntity)
  documentation!: Model<DocumentationInfoEntity>[];
}

export class GetADocumentationResponseDto extends GeneralResponseDto {
  @ValidateNested()
  documentation!: Model<DocumentationEntity, "authors" | "contributors">;
}
