import { getCollection } from "@dzcode.io/data/dist/get/collection";
import { getEntry } from "@dzcode.io/data/dist/get/entry";
import { join } from "path";
import { Service } from "typedi";

import { DataArticleEntity, DataDocumentationEntity, DataProjectEntity } from "./types";

@Service()
export class DataService {
  public listProjects = async (): Promise<DataProjectEntity[]> => {
    const projects = getCollection<DataProjectEntity>(
      this.dataModelsPath,
      "projects-v2",
      "list.json",
    );

    if (projects === 404) throw new Error("Projects list not found");

    return projects;
  };

  public listArticles = async (): Promise<Pick<DataArticleEntity, "slug" | "title">[]> => {
    const articles = getCollection<DataArticleEntity>(this.dataModelsPath, "articles", "list.json");

    if (articles === 404) throw new Error("Articles list not found");

    const mappedArticles = articles.map(({ slug, title }) => ({ slug, title }));

    return mappedArticles;
  };

  public getArticle = async (slug: string): Promise<DataArticleEntity> => {
    const article = getEntry<DataArticleEntity>(this.dataModelsPath, `articles/${slug}`);

    if (article === 404) throw new Error("Article not found");

    return article;
  };

  public listDocumentation = async (): Promise<
    Pick<DataDocumentationEntity, "slug" | "title">[]
  > => {
    const documentation = getCollection<DataDocumentationEntity>(
      this.dataModelsPath,
      "documentation",
      "list.json",
    );

    if (documentation === 404) throw new Error("Documentation list not found");

    const mappedDocumentation = documentation.map(({ slug, title }) => ({ slug, title }));

    return mappedDocumentation;
  };

  public getDocumentation = async (slug: string): Promise<DataDocumentationEntity> => {
    const documentation = getEntry<DataDocumentationEntity>(
      this.dataModelsPath,
      `documentation/${slug}`,
    );

    if (documentation === 404) throw new Error("Documentation not found");

    return documentation;
  };

  private dataModelsPath = join(__dirname, "../../../data");
}
