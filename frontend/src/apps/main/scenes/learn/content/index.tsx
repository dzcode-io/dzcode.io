import React, { useEffect } from "react";
import "./style";
import { Document } from "t9/types/fullstack";

export const Content = (props: ContentInterface) => {
  useEffect(() => {
    props.fetchCurrentDocument();
  }, []);

  return (
    <div className="content">
      {props.currentDocument ? (
        <div>{props.currentDocument.title}</div>
      ) : (
        "Loading Document..."
      )}
    </div>
  );
};

export interface ContentInterface {
  fetchCurrentDocument: () => void;
  currentDocument: Document | null;
}
