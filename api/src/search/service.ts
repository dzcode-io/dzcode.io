import { ConfigService } from "src/config/service";
import { LoggerService } from "src/logger/service";
import { MeiliSearch } from "meilisearch";
import { SearchItem } from "./types";
import { Service } from "typedi";

@Service()
export class SearchService {
  private readonly meilisearch: MeiliSearch;
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const { MEILISEARCH_URL, MEILISEARCH_MASTER_KEY } =
      this.configService.env();

    this.meilisearch = new MeiliSearch({
      host: MEILISEARCH_URL,
      apiKey: MEILISEARCH_MASTER_KEY,
    });
  }

  public search = async (query: string): Promise<SearchItem[]> => {
    this.logger.info({ message: `Searching for ${query}` });
    return [];
  };
}
