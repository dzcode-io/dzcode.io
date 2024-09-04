import { Model } from "@dzcode.io/models/dist/_base";
import { ArticleInfoEntity } from "@dzcode.io/models/dist/article";
import { DocumentationInfoEntity } from "@dzcode.io/models/dist/documentation";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";

export type DataProjectEntity = {
  name: string;
  slug: string;
  repositories: Array<{
    provider: RepositoryEntity["provider"];
    owner: string;
    name: string;
  }>;
};

export type DataArticleEntity = Model<ArticleInfoEntity> & {
  authors: string[];
  description: string;
  content: string;
  image: string;
};

export type DataDocumentationEntity = Model<DocumentationInfoEntity> & {
  authors: string[];
  description: string;
  content: string;
  image: string;
};
