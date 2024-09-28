import { Env, handleProjectRequest } from "handler/project";

export const onRequest: PagesFunction<Env> = handleProjectRequest;
