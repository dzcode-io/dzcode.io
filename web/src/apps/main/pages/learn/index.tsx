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

  return (
    <Grid container className="learn">
      {/* Sidebar */}
      <Grid item xs={false} md={3} style={{ paddingTop: "1rem" }}>
        <Sidebar
          tree={sidebarTree}
          path={path}
          expanded={expanded}
          selected={currentDocument ? currentDocument.slug : ""}
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
        <Route path={`${path}/:documentSlug`} render={() => <Content key={location.pathname} />} />
      </Grid>
    </Grid>
  );
};

export default LearnPage;
