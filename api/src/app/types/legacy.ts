 

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

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface GithubIssue {
  html_url: string;
  number: number;
  title: string;
  user: GithubUser;
  body: string;
  labels: Array<{
    name: string;
  }>;
  state: "closed" | "open";
  assignees: GithubUser[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  pull_request?: {
    html_url: "https://github.com/ZibanPirate/l2t/pull/9";
  };
}
