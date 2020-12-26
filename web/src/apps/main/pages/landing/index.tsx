import { Article, Project } from "src/types/fullstack";
import {
  fetchTopArticles,
  fetchTopProjects,
} from "src/apps/main/redux/actions/landing-page";

import { Header } from "./header";
import { HowToContribute } from "./how-to-contribute";
import { TopArticles } from "./top-articles";
import { TopProjects } from "./top-projects";
import { WhatAndWhy } from "./what-and-why";
import { connect } from "react-redux";
import { useEffect } from "react";

export const LandingPage = ({
  topProjects,
  topArticles,
  fetchTopProjects,
  fetchTopArticles,
}: LandingPageProps) => {
  useEffect(() => {
    fetchTopProjects();
    fetchTopArticles();
  }, []);

  return (
    <>
      <Header />
      <WhatAndWhy />
      <TopProjects topProjects={topProjects} />
      <HowToContribute />
      <TopArticles topArticles={topArticles} />
    </>
  );
};

export interface LandingPageInitialState {
  topProjects: Project[] | null;
  topArticles: Article[] | null;
}

interface LandingPageProps {
  fetchTopProjects: () => void;
  fetchTopArticles: () => void;
  topProjects: Project[] | null;
  topArticles: Article[] | null;
}

export default connect(
  (state: { landingPage: LandingPageProps }) => ({
    ...state.landingPage,
  }),
  (dispatch: any) => ({
    fetchTopProjects: () => dispatch(fetchTopProjects()),
    fetchTopArticles: () => dispatch(fetchTopArticles()),
  }),
)(LandingPage);
