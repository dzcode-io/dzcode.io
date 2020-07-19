import "./style";
import { Document } from "t9/types/fullstack";
import { Link } from "react-router-dom";
import React from "react";

export const Sidebar = (props: { documentationList: Document[] | null }) => (
  <div className="sidebar">
    {props.documentationList
      ? props.documentationList.map((document, index) => (
          <Link
            key={`document-${index}`}
            style={{
              paddingLeft: `${
                (document.slug.match(/\//g) || []).length + 1
              }rem`,
            }}
            className="item"
            to={"/Learn/" + document.slug}
          >
            {document.title}
          </Link>
        ))
      : "Loading Documentation List..."}
  </div>
);
