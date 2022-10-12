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
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  contributors?: string[];
  views?: number;
  githubURI?: string;
}
