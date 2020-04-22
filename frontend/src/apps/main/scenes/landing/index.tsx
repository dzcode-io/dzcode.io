import React from "react";
import { Header } from "./header";
import { WhatAndWhy } from "./what-and-why";
import { Projects } from "./projects";
import { HowToContribute } from "./how-to-contribute";
import { TransitionSection } from "./transition-section";
import { JoinOrganization } from "./join-organization";
import { JoinClassrooms } from "./join-classrooms";
import { Blogs } from "./blogs";

export default () => {
  return (
    <div className="landing">
      <Header />
      <WhatAndWhy />
      <Projects />
      <HowToContribute />
      <TransitionSection />
      <JoinOrganization />
      <TransitionSection />
      <JoinClassrooms />
      <TransitionSection />
      <Blogs />
    </div>
  );
};
