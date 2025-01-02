import { ConfigService } from "src/config/service";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";
import { targetConstructorToSchema } from "class-validator-jsonschema";
import { FetchService } from "src/fetch/service";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

type AIChat = { role: "user" | "system"; content: string };

type OpenAIResponse = {
  choices: Array<{ message: AIChat }>;
};

@Service()
export class AIService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly fetchService: FetchService,
  ) {}

  public query = async <T extends object>(
    payload: AIChat[],
    ResponseDto: ClassConstructor<T>,
  ): Promise<T> => {
    const schema = targetConstructorToSchema(ResponseDto);

    const payloadWithValidationPrompt: AIChat[] = [
      {
        role: "system",
        content: `system response must strictly follow the schema:\n${JSON.stringify(schema)}`,
      },
      ...payload,
    ];

    const { OPENAI_KEY } = this.configService.env();

    // todo: cache response
    const res = await this.fetchService.post<OpenAIResponse>(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: { Authorization: `Bearer ${OPENAI_KEY}` },
        body: {
          model: "gpt-4o",
          messages: payloadWithValidationPrompt,
        },
      },
    );

    const chatResponseUnchecked = JSON.parse(res.choices[0].message.content) as T;

    const output = plainToClass(ResponseDto, chatResponseUnchecked);
    const errors = validateSync(output);

    if (errors.length > 0)
      throw new Error(
        `⚠️  Errors in AI response in the following keys:${errors.reduce(
          (pV, cV) => (pV += "\n" + cV.property + " : " + JSON.stringify(cV.constraints)),
          "",
        )}`,
      );

    return output;
  };
}
