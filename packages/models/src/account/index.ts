import { IsString, IsUrl } from "class-validator";
import { BaseEntity } from "src/_base";

export class AccountEntity extends BaseEntity {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsUrl()
  link!: string;

  @IsUrl()
  image!: string;
}
