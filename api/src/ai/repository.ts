import { PostgresService } from "src/postgres/service";
import { Service } from "typedi";
import { aiPromptsTable, AIPromptRow } from "./table";
import { sql } from "drizzle-orm";
import { camelCaseObject } from "src/_utils/case";
import { generateShortHash } from "src/_utils/hash";

@Service()
export class AiPromptRepository {
  constructor(private readonly postgresService: PostgresService) {}

  public async insert(promptObj: unknown, responseObj: unknown) {
    const prompt = JSON.stringify(promptObj);
    const hash = generateShortHash(prompt);
    const response = JSON.stringify(responseObj);

    return await this.postgresService.db
      .insert(aiPromptsTable)
      .values({ hash, prompt, response })
      .returning({ hash: aiPromptsTable.hash });
  }

  public async findPromptResponse(
    promptObj: unknown,
  ): Promise<Pick<AIPromptRow, "response"> | undefined> {
    const prompt = JSON.stringify(promptObj);
    const shortHash = generateShortHash(prompt);

    const statement = sql`
      SELECT
        response
      FROM
        ai_prompts
      WHERE
        hash = ${shortHash}
      `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const entry = entries[0];
    const camelCased = camelCaseObject(entry) as Pick<AIPromptRow, "response">;
    return camelCased;
  }
}
