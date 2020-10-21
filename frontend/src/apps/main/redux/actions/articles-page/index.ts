import { MainStoreStateInterface, SidebarTreeItem } from "t9/types/main";
import { Article } from "t9/types/fullstack";
import Axios from "axios";
import { Dispatch } from "react";
import { actionType } from "../../constants";
import { fullstackConfig } from "src/config";
import { hasInCollection } from "src/common/utils";
import { history } from "src/common/utils/history";
import { listToTree } from "l2t";

const dataURL = fullstackConfig.data.url;

export const fetchArticlesList = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  try {
    const response = await Axios.get(dataURL + "/articles/list.c.json");
    const articlesList = response.data;
    const ids: string[] = [];
    // convert list into tree
    const tree = listToTree<Article, SidebarTreeItem>(
      articlesList,
      (item) => item.slug,
      (item) => item.slug.substring(0, item.slug.lastIndexOf("/")),
      "children",
      (item) => {
        ids.push(item.slug);
        return {
          content: item.title,
          id: item.slug,
          link: "/Articles/" + item.slug,
        };
      },
    );

    dispatch({
      type: actionType.UPDATE_ARTICLES_PAGE,
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
    // update our page state
    dispatch({
      type: actionType.UPDATE_ARTICLES_PAGE,
      payload: { currentArticle: cashedArticle },
    });
  } else {
    // BUG: cashing not working in local (slug related issue)

    dispatch({
      type: actionType.UPDATE_ARTICLES_PAGE,
      payload: { currentArticle: null },
    });

    try {
      const response = await Axios.get(
        dataURL + `/articles/${articleSlug}.json`,
      );

      console.log(response.data);
      if (response.data.hasOwnProperty("error")) {
        console.log("1");
        throw Error("article_not_found");
      }

      const currentArticle = response.data;
      // update our page state
      dispatch({
        type: actionType.UPDATE_ARTICLES_PAGE,
        payload: { currentArticle },
      });
      // update our cache state
      dispatch({
        type: actionType.UPDATE_ARTICLES,
        payload: [currentArticle],
      });
    } catch (error) {
      if (error.message == "article_not_found") {
        history.push("/Articles");
      }
    }
  }
};
