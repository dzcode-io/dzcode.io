import "./style";
import { Article } from "t9/types/fullstack";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { LinkV2 } from "src/components/link-v2";
import React from "react";
import ViewStreamIcon from "@material-ui/icons/ViewStream";

interface TopArticlesProps {
  topArticles: Article[] | null;
}

export const TopArticles = ({ topArticles }: TopArticlesProps) => {
  const [listType, setListType] = React.useState("row"); //card or row

  return (
    <section className="top-articles">
      <header>
        <h1 className="title">Read Community Articles</h1>
        <p className="sub-title">
          Read awesome articles, written by <strong>Algerian Developers</strong>
        </p>
      </header>
      <div style={{ width: "100%" }} className="chooseListType">
        <div style={{ float: "right" }}>
          <ViewStreamIcon
            style={{ cursor: "pointer" }}
            onClick={() => setListType("row")}
          />
          <DashboardIcon
            style={{ cursor: "pointer" }}
            onClick={() => setListType("card")}
          />
        </div>
      </div>
      <div className="articles">
        {topArticles ? (
          topArticles.map((article, index) => (
            <div
              key={`article-${index}`}
              className={`${listType === "row" ? "row" : "card"}`}
            >
              <div
                className="image"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              <div className="partTwo">
                <div className="info">
                  <div className="title">{article.title}</div>
                  <div className="description">{article.description}</div>
                </div>
                <LinkV2
                  className="btn btn__primary"
                  id="buttons__1"
                  href={`/Articles/${article.slug}`}
                >
                  Read Article
                </LinkV2>
              </div>
            </div>
          ))
        ) : (
          <div>Loading Top Articles ...</div>
        )}
      </div>
      <LinkV2 className=" btn btn__secondary" id="buttons__2" to="/Articles">
        Explore More Articles
      </LinkV2>
    </section>
  );
};
