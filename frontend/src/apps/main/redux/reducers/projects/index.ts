import { actionType } from "t9/apps/main/redux/constants";
import { Project } from "t9/types/fullstack";
import { updateCollection } from "src/common/utils";

export const projects = (
  state: Project[] = [],
  action: {
    type: string;
    payload: Project[];
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_PROJECTS:
      return updateCollection<Project>(state, action.payload, "slug");
    default:
      return state;
  }
};
