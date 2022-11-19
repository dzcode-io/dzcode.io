import { runDTOTestCases } from "src/_test";

import { ArticleEntity } from ".";

runDTOTestCases(
  ArticleEntity,
  {
    image:
      "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=formatfit=crop&w=800&q=100",
    id: "learn/Getting_Started",
    title: "Getting Started",
    description: "test-description",
    content: "test-content",
    authors: [],
    contributors: [],
  },
  {},
);
