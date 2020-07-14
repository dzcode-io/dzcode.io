import React from "react";
import { Header } from "./header";
import { WhatAndWhy } from "./what-and-why";
import { TopProjects } from "./top-projects";
import { HowToContribute } from "./how-to-contribute";
import { TopArticles } from "./top-articles";
import { connect } from "react-redux";

export const LandingScene = () => {
  return (
    <div className="landing">
      <Header />
      <HowToContribute />
      <TopProjects />
      <WhatAndWhy />
      <TopArticles />
    </div>
  );
};

export default connect()(LandingScene);
