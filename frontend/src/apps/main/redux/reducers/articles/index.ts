import { Article } from "t9/types/fullstack";
import { actionType } from "t9/apps/main/redux/constants";
import { updateCollection } from "src/common/utils";

export const articles = (
  state: Article[] = [],
  action: {
    type: string;
    payload: Article[];
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_ARTICLES:
      return updateCollection<Article>(state, action.payload, "slug");
    default:
      return state;
  }
};
