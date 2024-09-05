import { lockFactory } from "@dzcode.io/utils/dist/concurrency";
import { ClassConstructor } from "class-transformer";
import { defaults } from "make-fetch-happen";
import { validatePlainObject } from "src/_utils/validator/validate-plain-object";
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get = async <T extends ClassConstructor<any>>(
    url: string,
    { params = {}, headers = {} }: FetchConfig = {},
    cls: T,
    rootKey?: string,
  ) => {
    const _url = new URL(url);
    Object.keys(params).forEach((key) => _url.searchParams.append(key, String(params[key])));

    const response = await this.fetch<InstanceType<T>>(_url.toString(), { headers });
    const mappedResponse = rootKey ? { [rootKey]: response } : response;

    return validatePlainObject(cls, mappedResponse, undefined, true);
  };

  // @TODO-ZM: using DTO, validate response and DRY the types
  public getUnsafe = async <T = unknown>(
    url: string,
    { params = {}, headers = {} }: FetchConfig = {},
  ) => {
    const _url = new URL(url);
    Object.keys(params).forEach((key) => _url.searchParams.append(key, String(params[key])));

    const response = await this.fetch<T>(_url.toString(), { headers });
    return response;
  };

  private makeFetchHappenInstance;
  // @TODO-ZM: make sure lockFactory works as expected
  private fetch = lockFactory(
    async <T>(url: string, { headers }: Omit<FetchConfig, "params"> = {}) => {
      this.logger.info({ message: `Fetching ${url}` });
      const response = await this.makeFetchHappenInstance(url, { headers });
      const jsonResponse = (await response.json()) as T;
      return jsonResponse;
    },
  );
}
