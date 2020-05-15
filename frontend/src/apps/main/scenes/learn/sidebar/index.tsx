import React from "react";
import "./style";
import { Document } from "t9/types/fullstack";

export const Sidebar = (props: { documentationList: Document[] | null }) => (
  <div className="sidebar">
    {props.documentationList
      ? props.documentationList.map((document, index) => (
          <div key={`document-${index}`}>{document.title}</div>
        ))
      : "Loading Documentation List..."}
  </div>
);
