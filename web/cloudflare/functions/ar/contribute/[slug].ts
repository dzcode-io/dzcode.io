import { Env, handleContributionRequest } from "handler/contribution";

export const onRequest: PagesFunction<Env> = handleContributionRequest;
