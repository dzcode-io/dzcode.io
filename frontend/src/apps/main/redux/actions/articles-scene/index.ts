import { MainStoreStateInterface, SidebarTreeItem } from "t9/types/main";
import { Article } from "t9/types/fullstack";
import Axios from "axios";
import { Dispatch } from "react";
import { actionType } from "../../constants";
import { fullstackConfig } from "src/config";
import { hasInCollection } from "src/common/utils";
import { listToTree } from "l2t";

const dataURL = fullstackConfig.data.url;

export const fetchArticlesList = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  try {
    const response = await Axios.get(dataURL + "/articles/list.c.json");
    const articlesList = response.data;
    // convert list into tree
    const { tree, ids } = listToTree<Article, SidebarTreeItem>(
      articlesList,
      (item) => item.slug,
      (item) => item.slug.substring(0, item.slug.lastIndexOf("/")),
      "children",
      (item) => {
        return {
          content: item.title,
          id: item.slug,
          link: "/Articles/" + item.slug,
        };
      },
    );

    dispatch({
      type: actionType.UPDATE_ARTICLES_SCENE,
      payload: { sidebarTree: tree, expanded: ids },
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchCurrentArticle = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  const articleSlug = location.pathname
    .substring(location.pathname.indexOf("/", 1) + 1)
    .replace(/\/$/, "");
  const cashedArticle = hasInCollection<Article>(
    getState().articles,
    "slug",
    articleSlug,
    [["content"]],
  );
  if (cashedArticle) {
    // update our scene state
    dispatch({
      type: actionType.UPDATE_ARTICLES_SCENE,
      payload: { currentArticle: cashedArticle },
    });
  } else {
    // BUG: cashing not working in local (slug related issue)
    dispatch({
      type: actionType.UPDATE_ARTICLES_SCENE,
      payload: { currentArticle: null },
    });
    try {
      const response = await Axios.get(
        dataURL + `/articles/${articleSlug}.json`,
      );
      const currentArticle = response.data;
      // update our scene state
      dispatch({
        type: actionType.UPDATE_ARTICLES_SCENE,
        payload: { currentArticle },
      });
      // update our cache state
      dispatch({
        type: actionType.UPDATE_ARTICLES,
        payload: [currentArticle],
      });
    } catch (error) {
      console.error(error);
    }
  }
};
