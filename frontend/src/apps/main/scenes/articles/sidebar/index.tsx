import React from "react";
import "./style";
import { Article } from "t9/types/fullstack";
import { Link } from "react-router-dom";

export const Sidebar = (props: { articlesList: Article[] | null }) => (
  <div className="sidebar">
    {props.articlesList
      ? props.articlesList.map((article, index) => (
          <Link
            key={`article-${index}`}
            style={{
              paddingLeft: `${(article.slug.match(/\//g) || []).length + 1}rem`,
            }}
            className="item"
            to={"/Articles/" + article.slug}
          >
            {article.title}
          </Link>
        ))
      : "Loading Articles List..."}
  </div>
);
