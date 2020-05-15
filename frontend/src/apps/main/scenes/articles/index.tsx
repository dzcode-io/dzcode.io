import { connect } from "react-redux";
import React from "react";
import { Sidebar } from "./sidebar";
import { Content } from "./content";
import { Article } from "t9/types/fullstack";
import { useEffect } from "react";
import { fetchArticlesList } from "t9/apps/main/redux/actions/articles-scene";
import { fetchCurrentArticle } from "t9/apps/main/redux/actions/articles-scene";
import { Route, useRouteMatch } from "react-router-dom";

export const ArticlesScene = (props: ArticlesScenePropsReduxed) => {
  useEffect(() => {
    props.fetchArticlesList();
  }, []);

  const { path } = useRouteMatch();

  return (
    <div className="articles">
      <Sidebar articlesList={props.articlesList} />
      <Route
        path={`${path}/:articleSlug`}
        render={() => (
          <Content
            key={location.pathname}
            currentArticle={props.currentArticle}
            fetchCurrentArticle={props.fetchCurrentArticle}
          />
        )}
      />
    </div>
  );
};

interface ArticlesScenePropsReduxed extends ArticlesSceneProps {
  fetchArticlesList: () => void;
  fetchCurrentArticle: () => void;
}

export interface ArticlesSceneProps {
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
