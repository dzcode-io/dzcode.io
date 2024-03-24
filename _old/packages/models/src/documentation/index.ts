import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { AccountEntity } from "src/account";

export class DocumentationInfoEntity extends BaseEntity {
  @IsString()
  slug!: string;

  @IsString()
  title!: string;
}

export class DocumentationEntity extends DocumentationInfoEntity {
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
