import { LANGUAGE_CODES, LanguageCode } from "@dzcode.io/utils/dist/language";
import { IsIn } from "class-validator";

export class LanguageQuery {
  @IsIn(LANGUAGE_CODES)
  lang!: LanguageCode;
}
