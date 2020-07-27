import { Article, Project } from "t9/types/fullstack";
import React, { useEffect } from "react";
import {
  fetchTopArticles,
  fetchTopProjects,
} from "t9/apps/main/redux/actions/landing-scene";
import { Header } from "./header";
import { HowToContribute } from "./how-to-contribute";
import { TopArticles } from "./top-articles";
import { TopProjects } from "./top-projects";
import { WhatAndWhy } from "./what-and-why";
import { connect } from "react-redux";

export const LandingScene = ({
  topProjects,
  topArticles,
  fetchTopProjects,
  fetchTopArticles,
}: LandingSceneProps) => {
  useEffect(() => {
    fetchTopProjects();
    fetchTopArticles();
  }, []);

  return (
    <div className="landing">
      <Header />
      <HowToContribute />
      <TopProjects topProjects={topProjects} />
      <WhatAndWhy />
      <TopArticles topArticles={topArticles} />
    </div>
  );
};

export interface LandingSceneInitialState {
  topProjects: Project[] | null;
  topArticles: Article[] | null;
}

interface LandingSceneProps {
  fetchTopProjects: () => void;
  fetchTopArticles: () => void;
  topProjects: Project[] | null;
  topArticles: Article[] | null;
}

export default connect(
  (state: { landingScene: LandingSceneProps }) => ({
    ...state.landingScene,
  }),
  (dispatch: any) => ({
    fetchTopProjects: () => dispatch(fetchTopProjects()),
    fetchTopArticles: () => dispatch(fetchTopArticles()),
  }),
)(LandingScene);
