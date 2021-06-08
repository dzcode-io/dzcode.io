import { GetContributionsResponseDto } from "@dzcode.io/common/dist/types/api-responses";
import { Service } from "typedi";
import { bulkGenerateContributionMock } from "./mock";

@Service()
export class ContributionRepository {
  public async find(): Promise<
    Pick<GetContributionsResponseDto, "contributions" | "filters">
  > {
    const randomIndex = Math.round(Math.random() * 20);
    const randomLength = Math.round(Math.random() * 20);
    const { contributions, filters } = bulkGenerateContributionMock(
      randomIndex,
      randomIndex + randomLength,
    );

    return {
      contributions,
      filters,
    };
  }
}
