import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Route, useRouteMatch } from "react-router-dom";
import { Sidebar } from "src/components/sidebar";
import { t } from "src/components/t";
import { fetchDocumentationList } from "src/redux/actions/documentation-page";
import { useSliceSelector } from "src/redux/store/selectors";

import { Content } from "./content";
import { Landing } from "./landing";

export const LearnPage: FC = () => {
  const { currentDocument, expanded, sidebarTree } = useSliceSelector("learnPage");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchDocumentationList();
  }, []);

  const { path: pathRegex } = useRouteMatch();
  const path = "/Learn";

  const loadedCurrentDocument = isLoaded(currentDocument);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{t("learn-title")}</title>
        <meta name="description" content={t("learn-description")} />
      </Helmet>
      <Grid container className="learn" dir="ltr">
        {/* Sidebar */}
        <Grid item xs={false} md={3} style={{ paddingTop: "1rem" }}>
          {sidebarTree === "ERROR" ? (
            <TryAgain
              error={t("team-error")}
              action={t("team-try-again")}
              onClick={() => fetchDocumentationList()}
            />
          ) : (
            <Sidebar
              tree={sidebarTree}
              path={path}
              expanded={expanded}
              selected={loadedCurrentDocument ? loadedCurrentDocument.slug : ""}
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
            path={`${pathRegex}/:documentSlug`}
            render={() => <Content key={location.pathname} />}
          />
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
};

export default LearnPage;
