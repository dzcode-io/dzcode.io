import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { fullstackConfig } from "src/utils/config";
import { fetchV2Factory } from "@dzcode.io/utils/dist/fetch/factory";
import { getInitialLanguageCode } from "./website-language";

export const fetchV2 = fetchV2Factory<Endpoints>(fullstackConfig, getInitialLanguageCode());
