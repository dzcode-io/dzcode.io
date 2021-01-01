import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useEffect, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ArticlesPageState } from "src/apps/main/redux/reducers/articles-page";
import { Content } from "./content";
import Grid from "@material-ui/core/Grid";
import { Landing } from "./landing";
import { Sidebar } from "src/apps/main/components/sidebar";
import { fetchArticlesList } from "src/apps/main/redux/actions/articles-page";

export const ArticlesPage: FC = () => {
  const { currentArticle, expanded, sidebarTree } = useSelector<
    StateInterface,
    ArticlesPageState
  >((state) => state.articlesPage);
  const dispatch = useDispatch<Dispatch<ArticlesPageState>>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchArticlesList());
  }, []);

  const { path } = useRouteMatch();

  return (
    <Grid container className="articles">
      {/* Sidebar */}
      <Grid item xs={false} md={3} style={{ paddingTop: "1rem" }}>
        <Sidebar
          tree={sidebarTree}
          expanded={expanded}
          selected={currentArticle ? currentArticle.slug : ""}
          isOpen={open}
          onChange={(isOpen) => setOpen(isOpen)}
        />
      </Grid>
      {/* Content */}
      <Grid item xs md={7}>
        <Route
          exact
          path={`${path}`}
          render={() => <Landing onShowSidebar={() => setOpen(true)} />}
        />
        <Route
          path={`${path}/:articleSlug`}
          render={() => <Content key={location.pathname} />}
        />
      </Grid>
    </Grid>
  );
};

export default ArticlesPage;
