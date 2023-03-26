import { getCollection } from "@dzcode.io/data/dist/get/collection";
import { join } from "path";
import { ConfigService } from "src/config/service";
import { Service } from "typedi";

import { ProjectReferenceEntity } from "./types";

@Service()
export class DataService {
  constructor(private readonly configService: ConfigService) {}

  public listProjects = async (): Promise<ProjectReferenceEntity[]> => {
    const projects = getCollection<ProjectReferenceEntity>(
      this.dataModelsPath,
      "projects-v2",
      "list.json",
    );

    if (projects === 404) throw new Error("Projects list not found");

    return projects;
  };

  private dataModelsPath = join(__dirname, "../../../data");
}
