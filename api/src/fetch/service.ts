import { FetchOptions, defaults } from "make-fetch-happen";
import { ConfigService } from "../config/service";
import { Service } from "typedi";

@Service()
export class FetchService {
  constructor(private readonly configService: ConfigService) {
    this.fetch = defaults(({
      cachePath: this.configService.env().FETCH_CACHE_PATH,
    } as unknown) as FetchOptions);
  }

  public get = async <T = unknown>(
    url: string,
    params: Record<string, string | number | boolean> = {},
  ) => {
    const _url = new URL(url);
    Object.keys(params).forEach((key) =>
      _url.searchParams.append(key, String(params[key])),
    );
    const response = await this.fetch(_url.toString());
    return (await response.json()) as T;
  };

  private fetch;
}
