import { linkFactory } from "@dzcode.io/ui/dist/link-factory";
import { getState } from "src/redux";

export const LinkV2 = linkFactory(() => getState().settings.language.code, "en");
