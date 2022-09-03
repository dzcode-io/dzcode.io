import { linkFactory } from "@dzcode.io/ui/dist/link-factory";

import { mainStore } from "../../redux";

export const LinkV2 = linkFactory(() => mainStore.getState().settings.language.code, "en");
