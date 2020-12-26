import { Document } from "src/types/fullstack";
import { actionType } from "src/apps/main/redux/constants";
import { updateCollection } from "src/common/utils";

export const documentation = (
  state: Document[] = [],
  action: {
    type: string;
    payload: Document[];
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_DOCUMENTATION:
      return updateCollection<Document>(state, action.payload, "slug");
    default:
      return state;
  }
};
