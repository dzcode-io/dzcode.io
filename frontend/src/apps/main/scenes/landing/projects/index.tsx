import React from "react";
import "./style";
import start from "./star.png";

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1564054074885-e5a7c93671d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=255&q=80",
    title: "wilayat",
    description:
      "Statically generated and server-rendered React applications have never been easier.",
    contributers: 9,
    repository: "https://github.com/dzcode-io/dzcode.io",
  },
  {
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=255&q=80",
    title: "Static Exporting",
    description:
      "No need to learn a new framework. Exporting a static site with Next.js is as easy as a single command.",
    contributers: 9,
    repository: "https://github.com/dzcode-io/dzcode.io",
  },
  {
    image:
      "https://images.unsplash.com/photo-1549970604-a784b6ecde02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=255&q=80",
    title: "CSS-in-JS",
    description:
      "Next.js comes with styled-jsx included, but it also works with every CSS-in-JS solution you know and love.",
    contributers: 9,
    repository: "https://github.com/dzcode-io/dzcode.io",
  },
  {
    image:
      "https://images.unsplash.com/photo-1549970604-a784b6ecde02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=255&q=80",
    title: "CSS-in-JS",
    description:
      "Next.js comes with styled-jsx included, but it also works with every CSS-in-JS solution you know and love.",
    contributers: 9,
    repository: "https://github.com/dzcode-io/dzcode.io",
  },
  {
    image:
      "https://images.unsplash.com/photo-1549970604-a784b6ecde02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=255&q=80",
    title: "CSS-in-JS",
    description:
      "Next.js comes with styled-jsx included, but it also works with every CSS-in-JS solution you know and love.",
    contributers: 9,
    repository: "https://github.com/dzcode-io/dzcode.io",
  },
];

export const Projects = () => (
  <section className="projects">
    <header>
      <h1 className="title">Top Repos</h1>
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
            <div className="info__header">
              <div className="title">{project.title}</div>

              <div className="contributers">
                <img src={start} alt="contiributers" />
                <div className="number">{project.contributers}</div>
              </div>
            </div>
            <div className="description">{project.description}</div>
          </div>
          <a className=" btn btn__primary" id="buttons__1" href="#">
            Explore Project
          </a>
        </div>
      ))}
    </div>
    <a className=" btn btn__secondary" id="buttons__2" href="#">
      Explore More
    </a>
  </section>
);
