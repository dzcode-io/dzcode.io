import "./style";
import { LinkV2 } from "src/components/link-v2";
import React from "react";
import projectPlaceholder from "t9/apps/main/assets/jpeg/project-placeholder.jpeg";

const projects = [
  {
    image: projectPlaceholder,
    title: "Administration Structure",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    contributors: 9,
    githubURI: "dzcode-io/dzcode.io",
    slug: "Algerian_Administrative_Structure",
  },
  {
    image: projectPlaceholder,
    title: "Academic Structure",
    description:
      "Perspiciatis nisi molestias adipisci corporis ducimus, cupiditate officiis quod delectus aut.",
    contributors: 9,
    githubURI: "dzcode-io/dzcode.io",
    slug: "Algerian_Academic_Structure",
  },
  {
    image: projectPlaceholder,
    title: "Algerian User Profile",
    description:
      "Nesciunt at repellendus iste quasi magni quidem, non maiores accusantium voluptatibus.",
    contributors: 9,
    githubURI: "dzcode-io/dzcode.io",
    slug: "Algerian_User_Profile",
  },
];

export const TopProjects = () => (
  <section className="top-projects">
    <header>
      <h1 className="title">Top Projects</h1>
      <p className="sub-title">
        <strong>Find</strong>, <strong>Use</strong> and <strong>Improve</strong>{" "}
        solutions written by Algerians for Algerians
      </p>
    </header>
    <div className="repositories">
      {projects.map((project, index) => (
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
      ))}
    </div>
    <LinkV2 className=" btn btn__secondary" id="buttons__2" to="/Projects">
      Explore More
    </LinkV2>
  </section>
);
