import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";

export interface ProjectReferenceEntity extends Model<ProjectEntity> {
  repositories: Model<RepositoryEntity>[];
}
