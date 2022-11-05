/**
 * Type used in `@dzcode.io/api` package to represent a project
 * @example
 * let project: Project = {
 *  slug: "dzcode-io",
 *  description: "dzcode.io is an open source project that aims to provide a platform for Algerian developers to share their knowledge and experience with the community.",
 *  githubURI: "https://github.com/dzcode-io/dzcode.io"
 * };
 */
export interface Project {
  /**
   * the slug of the project
   */
  slug: string;
  /**
   * the image url of the project
   */
  image?: string;
  /**
   * the title of the project
   */
  title: string;
  /**
   * the description of the project
   */
  description?: string;
  /**
   * the content of the project
   */
  content?: string;
  /**
   * the author of the project
   */
  authors?: string[];
  /**
   * the contributors of the project
   */
  contributors?: string[];
  /**
   * the number of views of the project
   */
  views?: number;
  /**
   * the github uri of the project
   */
  githubURI?: string;
}
