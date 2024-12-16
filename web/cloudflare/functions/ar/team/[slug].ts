import { Env, handleContributorRequest } from "handler/contributor";

export const onRequest: PagesFunction<Env> = handleContributorRequest;
