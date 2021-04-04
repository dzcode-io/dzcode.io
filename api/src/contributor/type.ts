import { GeneralResponse } from "../app/types";
import { GithubUser } from "@dzcode.io/common/dist/types";

export interface GetContributorsResponse extends GeneralResponse {
  contributors?: GithubUser[];
}
