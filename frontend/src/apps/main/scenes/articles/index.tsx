import "./style";
import { Route, useRouteMatch } from "react-router-dom";
import { Article } from "t9/types/fullstack";
import { Content } from "./content";
import React from "react";
import { Sidebar } from "./sidebar";
import { connect } from "react-redux";
import { fetchArticlesList } from "t9/apps/main/redux/actions/articles-scene";
import { fetchCurrentArticle } from "t9/apps/main/redux/actions/articles-scene";
import { useEffect } from "react";

export const ArticlesScene = ({
  fetchArticlesList,
  currentArticle,
  articlesList,
  fetchCurrentArticle,
}: ArticlesSceneProps) => {
  useEffect(() => {
    fetchArticlesList();
  }, []);

  const { path } = useRouteMatch();

  return (
    <div className="articles">
      <Sidebar articlesList={articlesList} />
      <Route
        path={`${path}/:articleSlug`}
        render={() => (
          <Content
            key={location.pathname}
            currentArticle={currentArticle}
            fetchCurrentArticle={fetchCurrentArticle}
          />
        )}
      />
    </div>
  );
};

interface ArticlesSceneProps {
  fetchArticlesList: () => void;
  fetchCurrentArticle: () => void;
  articlesList: Article[] | null;
  currentArticle: Article | null;
}

export interface ArticlesSceneInitialState {
  articlesList: Article[] | null;
  currentArticle: Article | null;
}

export default connect(
  (state: { articlesScene: ArticlesSceneProps }) => ({
    ...state.articlesScene,
  }),
  (dispatch: any) => ({
    fetchArticlesList: () => dispatch(fetchArticlesList()),
    fetchCurrentArticle: () => dispatch(fetchCurrentArticle()),
  }),
)(ArticlesScene);
