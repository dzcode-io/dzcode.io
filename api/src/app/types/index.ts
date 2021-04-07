import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class GeneralResponseDto {
  @IsNumber()
  @IsOptional()
  code?: number;

  @IsString()
  @IsOptional()
  msg?: string;

  @IsObject()
  @IsOptional()
  debug?: Record<string, unknown>;
}
