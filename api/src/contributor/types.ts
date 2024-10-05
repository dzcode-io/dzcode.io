import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { GeneralResponse } from "src/app/types";

export interface GetContributorsResponse extends GeneralResponse {
  contributors: Array<
    Pick<ContributorEntity, "id" | "name" | "avatarUrl"> & {
      ranking: number;
    }
  >;
}
