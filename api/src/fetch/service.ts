import { FetchOptions, defaults } from "make-fetch-happen";
import { ConfigService } from "../config/service";
import { Service } from "typedi";
import { lock } from "@dzcode.io/utils/dist/concurrency";

@Service()
export class FetchService {
  constructor(private readonly configService: ConfigService) {
    const { FETCH_CACHE_PATH } = this.configService.env();

    this.makeFetchHappenInstance = defaults({
      cachePath: FETCH_CACHE_PATH,
    } as unknown as FetchOptions);
  }

  public get = async <T = unknown>(
    url: string,
    params: Record<string, string | number | boolean> = {},
  ) => {
    const _url = new URL(url);
    Object.keys(params).forEach((key) => _url.searchParams.append(key, String(params[key])));

    const response = await this.fetch<T>(_url.toString());
    return response;
  };

  private makeFetchHappenInstance;
  private fetch = lock(async <T>(url: string) => {
    const response = await this.makeFetchHappenInstance(url);
    const jsonResponse = (await response.json()) as T;
    return jsonResponse;
  });
}
