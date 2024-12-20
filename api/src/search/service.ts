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

    this.meilisearch
      .createIndex("project")
      .then(() => {
        this.logger.info({ message: "project index created" });
      })
      .catch((error) => {
        this.logger.error({
          message: `failed to create project index: ${error.message}`,
        });
      });

    this.meilisearch
      .createIndex("contribution")
      .then(() => {
        this.logger.info({ message: "contribution index created" });
      })
      .catch((error) => {
        this.logger.error({
          message: `failed to create contribution index: ${error.message}`,
        });
      });

    this.meilisearch
      .createIndex("contributor")
      .then(() => {
        this.logger.info({ message: "contributor index created" });
      })
      .catch((error) => {
        this.logger.error({
          message: `failed to create contributor index: ${error.message}`,
        });
      });
  }

  public search = async (query: string): Promise<SearchItem[]> => {
    this.logger.info({ message: `Searching for ${query}` });
    return [];
  };
}
