import { Model } from "@dzcode.io/models/dist/_base";
import { ArticleEntity, ArticleInfoEntity } from "@dzcode.io/models/dist/article";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { GeneralResponseDto } from "src/app/types";

export class GetArticlesResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ArticleInfoEntity)
  articles!: Model<ArticleInfoEntity>[];
}

export class GetArticleResponseDto extends GeneralResponseDto {
  @ValidateNested()
  article!: Model<ArticleEntity, "authors" | "contributors">;
}
