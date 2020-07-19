import { Header } from "./header";
import { HowToContribute } from "./how-to-contribute";
import React from "react";
import { TopArticles } from "./top-articles";
import { TopProjects } from "./top-projects";
import { WhatAndWhy } from "./what-and-why";
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
