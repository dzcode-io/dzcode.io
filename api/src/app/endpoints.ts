import { GetContributionsResponseDto } from "src/contribution/types";
import { GetContributorsResponseDto } from "src/contributor/types";
import { GetMilestonesResponseDto } from "src/milestone/types";
import { GetProjectsResponseDto } from "src/project/types";

// ts-prune-ignore-next
export interface Endpoints {
  "api:Projects": {
    response: GetProjectsResponseDto;
  };
  "api:Contributions": {
    response: GetContributionsResponseDto;
  };
  "api:Contributors": {
    response: GetContributorsResponseDto;
  };
  "api:MileStones/dzcode": {
    response: GetMilestonesResponseDto;
  };
}
