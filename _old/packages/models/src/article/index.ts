import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { AccountEntity } from "src/account";

export class ArticleInfoEntity extends BaseEntity {
  @IsString()
  slug!: string;

  @IsString()
  title!: string;
}

export class ArticleEntity extends ArticleInfoEntity {
  @IsString()
  image!: string;

  @IsString()
  description!: string;

  @IsString()
  content!: string;

  @ValidateNested({ each: true })
  @Type(() => AccountEntity)
  authors!: Model<AccountEntity>[];

  @ValidateNested({ each: true })
  @Type(() => AccountEntity)
  contributors!: Model<AccountEntity>[];
}
