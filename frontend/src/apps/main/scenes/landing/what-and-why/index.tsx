import React from "react";
import "./style";

const reasons = [
  {
    title: "Pre-Rendering",
    description:
      "Statically generated and server-rendered React applications have never been easier.",
  },
  {
    title: "Static Exporting",
    description:
      "No need to learn a new framework. Exporting a static site with Next.js is as easy as a single command.",
  },
  {
    title: "CSS-in-JS",
    description:
      "Next.js comes with styled-jsx included, but it also works with every CSS-in-JS solution you know and love.",
  },
];

export const WhatAndWhy = () => (
  <div className="what-and-why">
    <div className="why">Why dzCode.io</div>
    <div className="elaborate-why">A hub for Algerian open source projects</div>
    <div className="reasons">
      {reasons.map((reason, index) => (
        <div className="reason" key={`reason-${index}`}>
          <div className="title">{reason.title}</div>
          <div className="description">{reason.description}</div>
        </div>
      ))}
    </div>
  </div>
);
