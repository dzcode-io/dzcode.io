import { SearchItem, SearchType } from "./types";

import { ConfigService } from "src/config/service";
import { LoggerService } from "src/logger/service";
import { MeiliSearch } from "meilisearch";
import { Service } from "typedi";

@Service()
export class SearchService {
  private readonly meilisearch: MeiliSearch;
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.logger.info({ message: "Initializing MeiliSearch client" });
    const { MEILISEARCH_URL, MEILISEARCH_MASTER_KEY } =
      this.configService.env();

    this.meilisearch = new MeiliSearch({
      host: MEILISEARCH_URL,
      apiKey: MEILISEARCH_MASTER_KEY,
    });
    this.logger.info({
      message: `MeiliSearch client initialized with url ${MEILISEARCH_URL}`,
    });
  }

  public search = async (query: string): Promise<SearchItem[]> => {
    this.logger.info({ message: `Searching for ${query}` });
    return [];
  };

  public index = async (
    index: SearchType,
    data: SearchItem[],
  ): Promise<void> => {
    this.logger.info({
      message: `Indexing ${data.length} items in ${index}`,
    });
    await this.meilisearch.index(index).addDocuments(data);
    this.logger.info({
      message: `Indexed ${data.length} items in ${index}`,
    });
  };

  public ensureIndexes = async (): Promise<void> => {
    await this.meilisearch.createIndex("project");
    this.logger.info({ message: "project index created" });

    await this.meilisearch.createIndex("contribution");
    this.logger.info({ message: "contribution index created" });

    await this.meilisearch.createIndex("contributor");
    this.logger.info({ message: "contributor index created" });
  };
}
