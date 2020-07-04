import { connect } from "react-redux";
import React from "react";
import { Sidebar } from "./sidebar";
import { Content } from "./content";
import { Document } from "t9/types/fullstack";
import { useEffect } from "react";
import { fetchDocumentationList } from "t9/apps/main/redux/actions/documentation-scene";
import { fetchCurrentDocument } from "t9/apps/main/redux/actions/documentation-scene";
import { Route, useRouteMatch } from "react-router-dom";
import "./style";

export const LearnScene = (props: LearnScenePropsReduxed) => {
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

interface LearnScenePropsReduxed extends LearnSceneProps {
  fetchDocumentationList: () => void;
  fetchCurrentDocument: () => void;
}

export interface LearnSceneProps {
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
