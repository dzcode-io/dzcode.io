import React, { useEffect } from "react";
import "./style";
import { Article } from "t9/types/fullstack";

export const Content = (props: ContentInterface) => {
  useEffect(() => {
    props.fetchCurrentArticle();
  }, []);

  return (
    <div className="content">
      {props.currentArticle ? (
        <div>{props.currentArticle.title}</div>
      ) : (
        "Loading Article..."
      )}
    </div>
  );
};

export interface ContentInterface {
  fetchCurrentArticle: () => void;
  currentArticle: Article | null;
}
