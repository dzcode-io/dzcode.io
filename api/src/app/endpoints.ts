import { GetContributionsResponse } from "src/contribution/types";
import { GetContributorsResponse } from "src/contributor/types";
import { GetMilestonesResponse } from "src/milestone/types";
import { GetProjectResponse, GetProjectsResponse } from "src/project/types";

// ts-prune-ignore-next
export interface Endpoints {
  // @TODO-ZM: lower case the endpoints, curtesy of @Fcmam5
  "api:Projects": {
    response: GetProjectsResponse;
  };
  "api:Projects/:id": {
    response: GetProjectResponse;
    params: {
      id: string;
    };
  };
  "api:Contributions": {
    response: GetContributionsResponse;
  };
  "api:Contributors": {
    response: GetContributorsResponse;
  };
  "api:MileStones/dzcode": {
    response: GetMilestonesResponse;
  };
}
