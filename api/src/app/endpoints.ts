import { GetContributionsResponse } from "src/contribution/types";
import { GetContributorsResponse } from "src/contributor/types";
import { GetMilestonesResponse } from "src/milestone/types";
import { GetProjectsResponse } from "src/project/types";

// ts-prune-ignore-next
export interface Endpoints {
  "api:Projects": {
    response: GetProjectsResponse;
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
