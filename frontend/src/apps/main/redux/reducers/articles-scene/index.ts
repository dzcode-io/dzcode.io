import { ArticlesSceneInitialState } from "t9/apps/main/scenes/articles";
import { actionType } from "t9/apps/main/redux/constants";

export const articlesScene = (
  state: ArticlesSceneInitialState = {
    articlesList: null,
    currentArticle: null,
  },
  action: {
    type: string;
    payload: ArticlesSceneInitialState;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_ARTICLES_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
