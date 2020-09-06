import { Route, useRouteMatch } from "react-router-dom";
import { Article } from "t9/types/fullstack";
import { Content } from "./content";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { Sidebar } from "./sidebar";
import { SidebarTreeItem } from "t9/types/main";
import { connect } from "react-redux";
import { fetchArticlesList } from "t9/apps/main/redux/actions/articles-page";
import { fetchCurrentArticle } from "t9/apps/main/redux/actions/articles-page";
import { useEffect } from "react";

export const ArticlesPage = (props: ArticlesPageProps) => {
  useEffect(() => {
    props.fetchArticlesList();
  }, []);

  const { path } = useRouteMatch();

  return (
    <Grid container className="articles">
      {/* Sidebar */}
      <Grid item xs={false} md={3} style={{ paddingTop: "1rem" }}>
        <Sidebar
          tree={props.sidebarTree}
          expanded={props.expanded}
          selected={props.currentArticle ? props.currentArticle.slug : ""}
        />
      </Grid>
      {/* Content */}
      <Grid item xs>
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
      </Grid>
      {/* Headers */}
      <Grid item xs={false} lg={2}>
        <div style={{ height: "200px", background: "translate" }} />
      </Grid>
    </Grid>
  );
};

export interface ArticlesPageInitialState {
  sidebarTree: SidebarTreeItem[] | null;
  expanded: string[];
  currentArticle: Article | null;
}

interface ArticlesPageProps {
  fetchArticlesList: () => void;
  fetchCurrentArticle: () => void;
  sidebarTree: SidebarTreeItem[] | null;
  expanded: string[];
  currentArticle: Article | null;
}

export default connect(
  (state: { articlesPage: ArticlesPageProps }) => ({
    ...state.articlesPage,
  }),
  (dispatch: any) => ({
    fetchArticlesList: () => dispatch(fetchArticlesList()),
    fetchCurrentArticle: () => dispatch(fetchCurrentArticle()),
  }),
)(ArticlesPage);
