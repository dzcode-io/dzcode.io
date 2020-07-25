import "./style";
import { LinkV2 } from "src/components/link-v2";
import { Project } from "t9/types/fullstack";
import React from "react";

interface TopProjectsProps {
  topProjects: Project[] | null;
}

export const TopProjects = ({ topProjects }: TopProjectsProps) => (
  <section className="top-projects">
    <header>
      <h1 className="title">Top Projects</h1>
      <p className="sub-title">
        <strong>Find</strong>, <strong>Use</strong> and <strong>Improve</strong>{" "}
        solutions written by Algerians for Algerians
      </p>
    </header>
    <div className="repositories">
      {topProjects ? (
        topProjects.map((project, index) => (
          <div className="project" key={`project-${index}`}>
            <div
              className="image"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="info">
              <div className="title">{project.title}</div>

              <LinkV2 to={`https://github.com/${project.githubURI}`}>
                <img
                  src={`https://img.shields.io/github/stars/${project.githubURI}?style=social`}
                />
              </LinkV2>
              <div className="description">{project.description}</div>
            </div>
            <LinkV2
              className="btn btn__primary"
              id="buttons__1"
              to={`/Projects/${project.slug}`}
            >
              Explore Project
            </LinkV2>
          </div>
        ))
      ) : (
        <div>Loading Top Projects ...</div>
      )}
    </div>
    <LinkV2 className=" btn btn__secondary" id="buttons__2" to="/Projects">
      Explore More
    </LinkV2>
  </section>
);
