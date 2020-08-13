import "./style";
import { Article } from "t9/types/fullstack";
import { LinkV2 } from "src/components/link-v2";
import React from "react";

interface TopArticlesProps {
  topArticles: Article[] | null;
}

export const TopArticles = ({ topArticles }: TopArticlesProps) => (
  <section className="top-articles">
    <header>
      <h1 className="title">Read Community Articles</h1>
      <p className="sub-title">
        Read awesome articles, written by <strong>Algerian Developers</strong>
      </p>
    </header>
    <div className="articles">
      {topArticles ? (
        topArticles.map((article, index) => (
          <div className="article" key={`article-${index}`}>
            <div
              className="image"
              style={{ backgroundImage: `url(${article.image})` }}
            />
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
