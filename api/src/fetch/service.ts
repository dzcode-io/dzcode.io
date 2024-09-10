import { defaults } from "make-fetch-happen";
import { ConfigService } from "src/config/service";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";

import { FetchConfig } from "./types";

@Service()
export class FetchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const { FETCH_CACHE_PATH } = this.configService.env();

    this.makeFetchHappenInstance = defaults({
      cachePath: FETCH_CACHE_PATH,
    });
  }

  public get = async <T>(
    url: string,
    { params = {}, headers = {} }: FetchConfig = {},
  ): Promise<Awaited<T>> => {
    const _url = new URL(url);
    Object.keys(params).forEach((key) => _url.searchParams.append(key, String(params[key])));

    const response = await this.fetch<T>(_url.toString(), { headers });
    return response;
  };

  private makeFetchHappenInstance;
  private async fetch<T>(url: string, { headers }: Omit<FetchConfig, "params"> = {}) {
    this.logger.info({ message: `Fetching ${url}` });
    const response = await this.makeFetchHappenInstance(url, { headers });
    const jsonResponse = (await response.json()) as T;
    return jsonResponse;
  }
}
