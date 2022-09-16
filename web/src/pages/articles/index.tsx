import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Route, useRouteMatch } from "react-router-dom";
import { Sidebar } from "src/components/sidebar";
import { t } from "src/components/t";
import { fetchArticlesList } from "src/redux/actions/articles-page";
import { useSliceSelector } from "src/redux/selectors";

import { Content } from "./content";
import { Landing } from "./landing";

export const ArticlesPage: FC = () => {
  const { currentArticle, expanded, sidebarTree } = useSliceSelector("articlesPage");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchArticlesList();
  }, []);

  const { path: pathRegex } = useRouteMatch();
  const path = "/Articles";
  const loadedCurrentArticle = isLoaded(currentArticle);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{t("articles-title")}</title>
        <meta name="description" content={t("articles-description")} />
      </Helmet>
      <Grid container className="articles" dir="ltr">
        {/* Sidebar */}
        <Grid item xs={false} md={3} style={{ paddingTop: "1rem" }}>
          {sidebarTree === "ERROR" ? (
            <TryAgain
              error="Ops, an error occurred while loading the articles list, please try again..."
              action="Try Again"
              onClick={() => fetchArticlesList()}
            />
          ) : (
            <Sidebar
              tree={sidebarTree}
              path={path}
              expanded={expanded}
              selected={loadedCurrentArticle ? loadedCurrentArticle.slug : ""}
              isOpen={open}
              onChange={(isOpen) => setOpen(isOpen)}
            />
          )}
        </Grid>
        {/* Content */}
        <Grid item xs md={7}>
          <Route
            exact
            path={pathRegex}
            render={() => <Landing onShowSidebar={() => setOpen(true)} />}
          />
          <Route
            path={`${pathRegex}/:articleSlug`}
            render={() => <Content key={location.pathname} />}
          />
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
};

export default ArticlesPage;
