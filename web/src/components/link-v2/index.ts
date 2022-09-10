import { linkFactory } from "@dzcode.io/ui/dist/link-factory";
import { store } from "src/redux";

export const LinkV2 = linkFactory(() => store.getState().settings.language.code, "en");
