import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { Sidebar } from "src/apps/main/components/sidebar";
import { t } from "src/apps/main/components/t";
import { Dispatch, StateInterface } from "src/apps/main/redux";
import { fetchDocumentationList } from "src/apps/main/redux/actions/documentation-page";
import { LearnPageState } from "src/apps/main/redux/reducers/learn-page";

import { Content } from "./content";
import { Landing } from "./landing";

export const LearnPage: FC = () => {
  const { currentDocument, expanded, sidebarTree } = useSelector<StateInterface, LearnPageState>(
    (state) => state.learnPage,
  );
  const dispatch = useDispatch<Dispatch<LearnPageState>>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDocumentationList());
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
              onClick={() => dispatch(fetchDocumentationList())}
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
