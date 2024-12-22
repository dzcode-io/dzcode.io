import { SearchResults, SearchType } from "./types";

import { BaseEntity } from "@dzcode.io/models/dist/_base";
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

  public search = async (query: string): Promise<SearchResults> => {
    this.logger.info({ message: `Searching for ${query}` });
    return {
      results: [],
    };
  };

  public upsert = async <T extends BaseEntity>(
    index: SearchType,
    data: T,
  ): Promise<void> => {
    this.logger.info({
      message: `Upserting "${data.id}" item to ${index}`,
    });
    await this.meilisearch.index(index).updateDocuments([data]);
    this.logger.info({ message: `Upserted "${data.id}" item to ${index}` });
  };

  public deleteAllButWithRunId = async (
    index: SearchType,
    runId: string,
  ): Promise<void> => {
    this.logger.info({
      message: `Deleting all ${index} but with runId ${runId}`,
    });
    await this.meilisearch.index(index).deleteDocuments({
      filter: `NOT runId=${runId}`,
    });
    this.logger.info({
      message: `Deleted all ${index} but with runId ${runId}`,
    });
  };

  public setupSearch = async (): Promise<void> => {
    await this.setupIndexes();
    await this.updateFilterableAttributes();
  };

  private setupIndexes = async (): Promise<void> => {
    await this.meilisearch.createIndex("project", {
      primaryKey: "id",
    });
    this.logger.info({ message: "project index created" });

    await this.meilisearch.createIndex("contribution", {
      primaryKey: "id",
    });
    this.logger.info({ message: "contribution index created" });

    await this.meilisearch.createIndex("contributor", {
      primaryKey: "id",
    });
    this.logger.info({ message: "contributor index created" });
  };

  private async updateFilterableAttributes(): Promise<void> {
    await this.meilisearch
      .index("project")
      .updateFilterableAttributes(["runId"]);
    await this.meilisearch
      .index("contribution")
      .updateFilterableAttributes(["runId"]);
    await this.meilisearch
      .index("contributor")
      .updateFilterableAttributes(["runId"]);
  }
}
