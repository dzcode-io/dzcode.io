import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useEffect } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Content } from "./content";
import Grid from "@material-ui/core/Grid";
import { LearnPageState } from "src/apps/main/redux/reducers/learn-page";
import { Sidebar } from "src/apps/main/components/sidebar";
import { fetchDocumentationList } from "src/apps/main/redux/actions/documentation-page";

export const LearnPage: FC = () => {
  const { currentDocument, expanded, sidebarTree } = useSelector<
    StateInterface,
    LearnPageState
  >((state) => state.learnPage);
  const dispatch = useDispatch<Dispatch<LearnPageState>>();

  useEffect(() => {
    dispatch(fetchDocumentationList());
  }, []);

  const { path } = useRouteMatch();

  return (
    <Grid container className="learn">
      {/* Sidebar */}
      <Grid item xs={false} md={3} style={{ paddingTop: "1rem" }}>
        <Sidebar
          tree={sidebarTree}
          expanded={expanded}
          selected={currentDocument ? currentDocument.slug : ""}
        />
      </Grid>
      {/* Content */}
      <Grid item xs md={7}>
        <Route
          path={`${path}/:documentSlug`}
          render={() => <Content key={location.pathname} />}
        />
      </Grid>
      {/* Headers */}
      <Grid item xs={false} lg={2}>
        <div style={{ height: "200px", background: "translate" }} />
      </Grid>
    </Grid>
  );
};

export default LearnPage;
