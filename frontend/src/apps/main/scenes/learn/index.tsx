import { Route, useRouteMatch } from "react-router-dom";
import { Content } from "./content";
import { Document } from "t9/types/fullstack";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { Sidebar } from "./sidebar";
import { SidebarTreeItem } from "t9/types/main";
import { connect } from "react-redux";
import { fetchCurrentDocument } from "t9/apps/main/redux/actions/documentation-scene";
import { fetchDocumentationList } from "t9/apps/main/redux/actions/documentation-scene";
import { useEffect } from "react";

export const LearnScene = (props: LearnSceneProps) => {
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

export interface LearnSceneInitialState {
  sidebarTree: SidebarTreeItem[] | null;
  expanded: string[];
  currentDocument: Document | null;
}

interface LearnSceneProps {
  fetchDocumentationList: () => void;
  fetchCurrentDocument: () => void;
  sidebarTree: SidebarTreeItem[] | null;
  expanded: string[];
  currentDocument: Document | null;
}

export default connect(
  (state: { learnScene: LearnSceneProps }) => ({
    ...state.learnScene,
  }),
  (dispatch: any) => ({
    fetchDocumentationList: () => dispatch(fetchDocumentationList()),
    fetchCurrentDocument: () => dispatch(fetchCurrentDocument()),
  }),
)(LearnScene);
