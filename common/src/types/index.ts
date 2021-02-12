export type LoadingStatus = "loading" | "loaded" | "not-loaded";

export interface Document {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  contributors?: GithubUser[];
  githubAuthors?: GithubUser[];
  views?: number;
}

export interface Article {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  githubAuthors?: GithubUser[];
  contributors?: GithubUser[];
  views?: number;
}

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

export type Environment = "development" | "staging" | "production";

export interface GithubUser {
  login: string;
  id: string;
  // eslint-disable-next-line camelcase
  avatar_url: string;
  // eslint-disable-next-line camelcase
  html_url: string;
  type: string;
}
