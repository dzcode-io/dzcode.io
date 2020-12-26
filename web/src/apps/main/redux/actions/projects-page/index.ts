import Axios from "axios";
import { Dispatch } from "react";
import { actionType } from "../../constants";
import { fullstackConfig } from "src/config";

const dataURL = fullstackConfig.data.url;

export const fetchProjectsList = () => async (
  dispatch: Dispatch<Record<string, unknown>>,
) => {
  try {
    const response = await Axios.get(dataURL + "/projects/list.c.json");
    dispatch({
      type: actionType.UPDATE_PROJECTS_PAGE,
      payload: { projectsList: response.data },
    });
  } catch (error) {
    console.error(error);
  }
};
