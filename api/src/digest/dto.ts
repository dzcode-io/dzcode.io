import { IsString } from "class-validator";

export class AIResponseTranslateNameDto {
  @IsString()
  name_en!: string;

  @IsString()
  name_ar!: string;
}

export class AIResponseTranslateTitleDto {
  @IsString()
  title_en!: string;

  @IsString()
  title_ar!: string;
}
