import { lock } from "@dzcode.io/utils/dist/concurrency";
import { defaults } from "make-fetch-happen";
import { Service } from "typedi";

import { ConfigService } from "../config/service";
import { FetchConfig } from "./types";

@Service()
export class FetchService {
  constructor(private readonly configService: ConfigService) {
    const { FETCH_CACHE_PATH } = this.configService.env();

    this.makeFetchHappenInstance = defaults({
      cachePath: FETCH_CACHE_PATH,
    });
  }

  public get = async <T = unknown>(
    url: string,
    { params = {}, headers = {} }: FetchConfig = {},
  ) => {
    const _url = new URL(url);
    Object.keys(params).forEach((key) => _url.searchParams.append(key, String(params[key])));

    const response = await this.fetch<T>(_url.toString(), { headers });
    return response;
  };

  private makeFetchHappenInstance;
  private fetch = lock(async <T>(url: string, { headers }: Omit<FetchConfig, "params"> = {}) => {
    const response = await this.makeFetchHappenInstance(url, { headers });
    const jsonResponse = (await response.json()) as T;
    return jsonResponse;
  });
}
