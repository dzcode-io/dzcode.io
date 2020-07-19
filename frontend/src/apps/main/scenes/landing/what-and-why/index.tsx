import "./style";
import React from "react";

const reasons = [
  {
    title: "Bring your Code",
    description:
      "Bringing your project and open-sourcing it, brings attention and spotlight, thus more contributor, which will lead to an even better version of you library.",
  },
  {
    title: "Algerian Care",
    description:
      "Centralizing the issues around Algerian problems brings care and commitment from across the country, and you are an example of that ☺️",
  },
  {
    title: "Backers",
    description:
      "Every project is used in production by Algerian websites, apps, and more",
  },
];

export const WhatAndWhy = () => (
  <div className="what-and-why">
    <div className="title">What is dzCode.io and Why?</div>
    <div className="sub-title">
      dzCode.io is a hub for Algerian open source projects
    </div>
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
