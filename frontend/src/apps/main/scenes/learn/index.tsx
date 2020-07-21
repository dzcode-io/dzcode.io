import "./style";
import { Route, useRouteMatch } from "react-router-dom";
import { Content } from "./content";
import { Document } from "t9/types/fullstack";
import React from "react";
import { Sidebar } from "./sidebar";
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
    <div className="learn">
      <Sidebar documentationList={props.documentationList} />
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
    </div>
  );
};

export interface LearnSceneInitialState {
  documentationList: Document[] | null;
  currentDocument: Document | null;
}

interface LearnSceneProps {
  fetchDocumentationList: () => void;
  fetchCurrentDocument: () => void;
  documentationList: Document[] | null;
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
