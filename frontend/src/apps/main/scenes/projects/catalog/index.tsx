import "./style";
import { Link } from "react-router-dom";
import { Project } from "t9/types/fullstack";
import React from "react";

export const Catalog = (props: { projectsList: Project[] | null }) => (
  <div className="catalog">
    {props.projectsList
      ? props.projectsList.map((project, index) => (
          <Link
            key={`project-${index}`}
            style={{
              paddingLeft: `${(project.slug.match(/\//g) || []).length + 1}rem`,
            }}
            className="item"
            to={"/Projects/" + project.slug}
          >
            {project.title}
          </Link>
        ))
      : "Loading Projects List..."}
  </div>
);
