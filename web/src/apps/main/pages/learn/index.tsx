import { Route, useRouteMatch } from "react-router-dom";

import { Content } from "./content";
import { Document } from "src/types/fullstack";
import Grid from "@material-ui/core/Grid";
import { Sidebar } from "./sidebar";
import { SidebarTreeItem } from "src/apps/main/types";
import { connect } from "react-redux";
import { fetchCurrentDocument } from "src/apps/main/redux/actions/documentation-page";
import { fetchDocumentationList } from "src/apps/main/redux/actions/documentation-page";
import { useEffect } from "react";

export const LearnPage = (props: LearnPageProps) => {
  useEffect(() => {
    props.fetchDocumentationList();
  }, []);

  const { path } = useRouteMatch();

  return (
    <Grid container className="learn">
      {/* Sidebar */}
      <Grid item xs={false} md={3} style={{ paddingTop: "1rem" }}>
        <Sidebar
          tree={props.sidebarTree}
          expanded={props.expanded}
          selected={props.currentDocument ? props.currentDocument.slug : ""}
        />
      </Grid>
      {/* Content */}
      <Grid item xs>
        <Route
          path={`${path}/:documentSlug`}
          render={() => (
            <Content
              key={location.pathname}
              currentDocument={props.currentDocument}
              fetchCurrentDocument={props.fetchCurrentDocument}
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

export interface LearnPageInitialState {
  sidebarTree: SidebarTreeItem[] | null;
  expanded: string[];
  currentDocument: Document | null;
}

interface LearnPageProps {
  fetchDocumentationList: () => void;
  fetchCurrentDocument: () => void;
  sidebarTree: SidebarTreeItem[] | null;
  expanded: string[];
  currentDocument: Document | null;
}

export default connect(
  (state: { learnPage: LearnPageProps }) => ({
    ...state.learnPage,
  }),
  (dispatch: any) => ({
    fetchDocumentationList: () => dispatch(fetchDocumentationList()),
    fetchCurrentDocument: () => dispatch(fetchCurrentDocument()),
  }),
)(LearnPage);
