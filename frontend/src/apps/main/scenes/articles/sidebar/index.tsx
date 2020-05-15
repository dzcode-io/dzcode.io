import React from "react";
import "./style";
import { Article } from "t9/types/fullstack";

export const Sidebar = (props: { articlesList: Article[] | null }) => (
  <div className="sidebar">
    {props.articlesList
      ? props.articlesList.map((article, index) => (
          <div key={`article-${index}`}>{article.title}</div>
        ))
      : "Loading Articles List..."}
  </div>
);
