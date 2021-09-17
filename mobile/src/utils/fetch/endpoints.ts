import { GetContributionsResponseDto } from "../../_common/types/api-responses";

export interface Endpoints {
  "api:v2/Contributions": {
    response: GetContributionsResponseDto;
    query: [string, string][];
  };
}
