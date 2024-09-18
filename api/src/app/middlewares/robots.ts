import { ConfigService } from "src/config/service";
import { Service } from "typedi";
import { Response } from "express";
import { Controller, Res, Get } from "routing-controllers";

@Service()
@Controller("/robots.txt")
export class RobotsController {
  private readonly stage = this.configService.env().NODE_ENV;

  constructor(private readonly configService: ConfigService) {}

  @Get("/")
  public async robotsTxt(@Res() response: Response): Promise<Response> {
    response.set("Content-Type", "text/plain");
    if (this.stage === "production") {
      return response.send("User-agent: *\nAllow: /");
    } else {
      return response.send("User-agent: *\nDisallow: /");
    }
  }
}
