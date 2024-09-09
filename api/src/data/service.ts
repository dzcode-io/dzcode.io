import { getCollection } from "@dzcode.io/data/dist/collection";
import { join } from "path";
import { Service } from "typedi";

import { DataProjectEntity } from "./types";

@Service()
export class DataService {
  public listProjects = async (): Promise<DataProjectEntity[]> => {
    const projects = getCollection<DataProjectEntity>(this.dataModelsPath, "projects", "list.json");

    if (projects === 404) throw new Error("Projects list not found");

    return projects;
  };

  private dataModelsPath = join(__dirname, "../../../data");
}
