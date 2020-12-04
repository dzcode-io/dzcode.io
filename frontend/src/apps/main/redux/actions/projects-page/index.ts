import Axios from "axios";
import { Dispatch } from "react";
import { MainStoreStateInterface } from "t9/types/main";
import { actionType } from "../../constants";
import { fullstackConfig } from "src/config";

const dataURL = fullstackConfig.data.url;
const githubAPIUrl = fullstackConfig.github.url;

export const fetchProjectsGraphs = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  try {
    const projects = getState().projectsPage.projectsList || [];
    if (projects.length === 0) return;

    const graphsPromises = await Promise.all(
      projects.map((project, index) =>
        Axios.get<Array<{ total: number }>>(
          `${githubAPIUrl}/repos/${project.githubURI}/stats/commit_activity`,
        ),
      ),
    );

    const updatedProjects = projects.map((project, index) => {
      if (!Array.isArray(graphsPromises[index].data)) return project;

      const xAxe: string[] = [];
      const yAxe: number[] = [];

      graphsPromises[index].data.forEach((point) => {
        xAxe.push("");
        yAxe.push(point.total);
      });

      return {
        ...project,
        graphData: { xAxe, yAxe },
      };
    });

    dispatch({
      type: actionType.UPDATE_PROJECTS_PAGE,
      payload: { projectsList: updatedProjects },
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectsList = () => async (dispatch: Dispatch<any>) => {
  try {
    const response = await Axios.get(dataURL + "/projects/list.c.json");
    dispatch({
      type: actionType.UPDATE_PROJECTS_PAGE,
      payload: { projectsList: response.data },
    });
    dispatch(fetchProjectsGraphs());
  } catch (error) {
    console.error(error);
  }
};
