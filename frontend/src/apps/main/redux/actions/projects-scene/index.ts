import Axios from "axios";
import { Dispatch } from "react";
import { MainStoreStateInterface } from "t9/types/main";
import { Project } from "t9/types/fullstack";
import { actionType } from "../../constants";
import { fullstackConfig } from "src/config";
import { hasInCollection } from "src/common/utils";

const dataURL = fullstackConfig.data.url;

export const fetchProjectsList = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  try {
    const response = await Axios.get(dataURL + "/projects/list.c.json");
    dispatch({
      type: actionType.UPDATE_PROJECTS_SCENE,
      payload: { projectsList: response.data },
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchCurrentProject = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  const projectSlug = location.pathname
    .substring(location.pathname.indexOf("/", 1) + 1)
    .replace(/\/$/, "");

  const cashedProject = hasInCollection<Project>(
    getState().projects,
    "slug",
    projectSlug,
    [["content"]],
  );
  if (cashedProject) {
    // update our scene state
    dispatch({
      type: actionType.UPDATE_PROJECTS_SCENE,
      payload: { currentProject: cashedProject },
    });
  } else
    try {
      const response = await Axios.get(
        dataURL + `/projects/${projectSlug}.json`,
      );
      const currentProject = response.data;
      // update our scene state
      dispatch({
        type: actionType.UPDATE_PROJECTS_SCENE,
        payload: { currentProject },
      });
      // update our cache state
      dispatch({
        type: actionType.UPDATE_PROJECTS,
        payload: [currentProject],
      });
    } catch (error) {
      console.error(error);
    }
};
