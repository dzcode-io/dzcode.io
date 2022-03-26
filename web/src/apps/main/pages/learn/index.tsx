import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { Sidebar } from "src/apps/main/components/sidebar";
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

  const { path } = useRouteMatch();
  const loadedCurrentDocument = isLoaded(currentDocument);

  return (
    <ErrorBoundary>
      <Grid container className="learn">
        {/* Sidebar */}
        <Grid item xs={false} md={3} style={{ paddingTop: "1rem" }}>
          {sidebarTree === "ERROR" ? (
            <TryAgain
              error="Ops, an error occurred while loading the documentation list, please try again..."
              action="Try Again"
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
            path={`${path}`}
            render={() => <Landing onShowSidebar={() => setOpen(true)} />}
          />
          <Route
            path={`${path}/:documentSlug`}
            render={() => <Content key={location.pathname} />}
          />
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
};

export default LearnPage;
