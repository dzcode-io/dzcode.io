import React from "react";
import { Sidebar } from "./sidebar";
import { Content } from "./content";
import { connect } from "react-redux";
import { Article } from "t9/types/fullstack";

export const ArticlesScene = (props: any) => {
  return (
    <div className="articles">
      <Sidebar />
      <Content />
    </div>
  );
};

export interface ArticlesSceneProps {
  articlesList: Article[] | null;
  currentArticle: Article | null;
}

export default connect()(ArticlesScene);
