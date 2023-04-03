import { Model } from "@dzcode.io/models/dist/_base";
import { ArticleInfoEntity } from "@dzcode.io/models/dist/article";
import { ProjectEntity } from "@dzcode.io/models/dist/project";

export type DataProjectEntity = Model<ProjectEntity, "repositories">;

export type DataArticleEntity = Model<ArticleInfoEntity> & {
  authors: string[];
  description: string;
  content: string;
  image: string;
};
