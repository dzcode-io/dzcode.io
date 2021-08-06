export interface ContributionsResponse {
  contributions: {
    id?: string;
    labels?: string[];
    languages?: string[];
    project?: {
      slug?: string;
      name?: string;
    };
    title?: string;
    type?: string;
    url?: string;
    createdAt?: string;
    updatedAt?: string;
    commentsCount?: number;
  }[];
}
