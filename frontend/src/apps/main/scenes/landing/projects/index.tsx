import React from "react";
import "./style";

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1564054074885-e5a7c93671d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=255&q=80",
    title: "wilayat",
    description:
      "Statically generated and server-rendered React applications have never been easier.",
    repository: "https://github.com/dzcode-io/dzcode.io",
  },
  {
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=255&q=80",
    title: "Static Exporting",
    description:
      "No need to learn a new framework. Exporting a static site with Next.js is as easy as a single command.",
    repository: "https://github.com/dzcode-io/dzcode.io",
  },
  {
    image:
      "https://images.unsplash.com/photo-1549970604-a784b6ecde02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=255&q=80",
    title: "CSS-in-JS",
    description:
      "Next.js comes with styled-jsx included, but it also works with every CSS-in-JS solution you know and love.",
    repository: "https://github.com/dzcode-io/dzcode.io",
  },
];

export const Projects = () => (
  <div className="projects">
    <div className="title">Top Repos</div>
    <div className="sub-title">
      <strong>Find</strong>, <strong>Use</strong> and <strong>Improve</strong>{" "}
      solutions written by Algerians for Algerians
    </div>
    <div className="projects">
      {projects.map((project, index) => (
        <div className="project" key={`project-${index}`}>
          <div
            className="image"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="title">{project.title}</div>
          <img src="https://img.shields.io/github/contributors/dzcode-io/dzcode.io?style=social" />
          <div className="description">{project.description}</div>
          <a className="explore" href="#">
            Explore Projects ...
          </a>
        </div>
      ))}
    </div>
  </div>
);
