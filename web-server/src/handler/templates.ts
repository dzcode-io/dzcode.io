import { readFileSync } from "fs";
import { templatePath } from "src/utils/paths";

export const templateContent = Object.freeze(readFileSync(templatePath, "utf-8"));
