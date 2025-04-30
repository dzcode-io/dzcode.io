import { join } from "path";

export const staticPath = join(__dirname, "../../../web/bundle");
export const indexPath = join(staticPath, "index.html");
export const templatePath = join(staticPath, "template.html");
export const notFoundPath = join(staticPath, "404.html");
