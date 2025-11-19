import { SearchResults, SearchType } from "./types";

import { BaseEntity } from "@dzcode.io/models/dist/_base";
import { ConfigService } from "src/config/service";
import { LoggerService } from "src/logger/service";
import { MeiliSearch } from "meilisearch";
import { Service } from "typedi";
import { LanguageCode } from "@dzcode.io/utils/dist/language";

@Service()
export class SearchService {
  private readonly meilisearch: MeiliSearch;
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.logger.info("Initializing MeiliSearch client");
    const { MEILISEARCH_URL, MEILISEARCH_MASTER_KEY } = this.configService.env();

    this.meilisearch = new MeiliSearch({
      host: MEILISEARCH_URL,
      apiKey: MEILISEARCH_MASTER_KEY,
    });
    this.loggerService.logger.info("MeiliSearch client initialized", "url", MEILISEARCH_URL);
  }

  public search = async (q: string, lang: LanguageCode, limit?: number): Promise<SearchResults> => {
    // TODO-ZM: only fetch Ids from search db, then query actually entities from their respective repositories
    this.loggerService.logger.info("Searching in all indexes", "query", q);
    const searchResults = await this.meilisearch.multiSearch({
      queries: [
        { indexUid: "project", q, limit, attributesToRetrieve: ["id", `name_${lang}`] },
        {
          indexUid: "contribution",
          q,
          limit,
          attributesToRetrieve: ["id", `title_${lang}`, "type", "activityCount", "url"],
        },
        {
          indexUid: "contributor",
          q,
          limit,
          attributesToRetrieve: ["id", `name_${lang}`, "avatarUrl"],
        },
      ],
    });

    searchResults.results.forEach((result) => {
      result.hits.forEach((hit) => {
        if (hit[`name_${lang}`]) {
          hit.name = hit[`name_${lang}`];
          delete hit[`name_${lang}`];
        }

        if (hit[`title_${lang}`]) {
          hit.title = hit[`title_${lang}`];
          delete hit[`title_${lang}`];
        }
      });
    });

    return searchResults as SearchResults;
  };

  public upsert = async <T extends BaseEntity>(index: SearchType, data: T): Promise<void> => {
    this.loggerService.logger.info("Upserting item to index", "id", data.id, "index", index);
    await this.meilisearch.index(index).updateDocuments([data]);
    this.loggerService.logger.info("Item upserted to index", "id", data.id, "index", index);
  };

  public deleteAllButWithRunId = async (index: SearchType, runId: string): Promise<void> => {
    this.loggerService.logger.info(
      "Deleting all items except runId",
      "index",
      index,
      "runId",
      runId,
    );
    await this.meilisearch.index(index).deleteDocuments({
      filter: `NOT runId=${runId}`,
    });
    this.loggerService.logger.info("Items deleted except runId", "index", index, "runId", runId);
  };

  public setupSearch = async (): Promise<void> => {
    await this.setupIndexes();
    await this.updateFilterableAttributes();
  };

  private setupIndexes = async (): Promise<void> => {
    await this.upsertIndex("project");
    await this.upsertIndex("contribution");
    await this.upsertIndex("contributor");
  };

  private async upsertIndex(index: SearchType): Promise<void> {
    try {
      await this.meilisearch.getIndex(index);
      this.loggerService.logger.info("Index already exists", "index", index);
    } catch {
      await this.meilisearch.createIndex(index, {
        primaryKey: "id",
      });
      this.loggerService.logger.info("Index created", "index", index);
    }
  }

  private async updateFilterableAttributes(): Promise<void> {
    await this.meilisearch.index("project").updateFilterableAttributes(["runId"]);
    await this.meilisearch.index("contribution").updateFilterableAttributes(["runId"]);
    await this.meilisearch.index("contributor").updateFilterableAttributes(["runId"]);
  }
}
