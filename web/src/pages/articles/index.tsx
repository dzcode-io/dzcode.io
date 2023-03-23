import { Article } from "@dzcode.io/ui/dist/article";
import { Button } from "@dzcode.io/ui/dist/button";
import { Divider } from "@dzcode.io/ui/dist/divider";
import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { MAX_CONTAINER_WIDTH } from "@dzcode.io/ui/dist/flex";
import { Image } from "@dzcode.io/ui/dist/image";
import { Link } from "@dzcode.io/ui/dist/link";
import { MediaQuery } from "@dzcode.io/ui/dist/media-query";
import { Stack } from "@dzcode.io/ui/dist/stack";
import { Treeview } from "@dzcode.io/ui/dist/treeview";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import { FC, useEffect, VFC } from "react";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router-dom";
import articlesLanding from "src/assets/svg/articles-landing.svg";
import { T, t } from "src/components/t";
import { AllDictionaryKeys } from "src/components/t/dictionary";
import { fetchArticlesList, fetchCurrentArticle } from "src/redux/actions/articles-page";
import { useSliceSelector } from "src/redux/selectors";

const ArticlesPage: FC = () => {
  const { currentArticle, sidebarTree } = useSliceSelector("articlesPage");
  const { params: urlParams } = useRouteMatch<{ articleId?: string }>();

  const loadedCurrentArticle = isLoaded(currentArticle);

  useEffect(() => {
    fetchArticlesList();
  }, []); // @TODO-ZM: add language as dependency

  useEffect(() => {
    if (urlParams.articleId) {
      fetchCurrentArticle();
    }
  }, [urlParams.articleId]); // @TODO-ZM: add language as dependency

  const loadedSidebarTree = isLoaded(sidebarTree);

  const Sidebar: VFC = () => (
    <Stack direction="vertical" margin={[3, 0]}>
      {sidebarTree === "ERROR" ? (
        <TryAgain
          error={t("articles-list-error")}
          action={t("global-try-again")}
          onClick={() => fetchArticlesList()}
          margin={[6, 1, 1]}
        />
      ) : (
        <Treeview
          items={sidebarTree}
          min={{ width: MAX_CONTAINER_WIDTH / 4 }}
          margin={1}
          itemRender={(item, { isSelected }) => (
            <Link margin={1} href={item.link}>
              <Stack direction="horizontal">
                {isSelected && (
                  <Divider
                    orientation="vertical"
                    thickness={3}
                    margin={[0, 1, 0, 0]}
                    color="PRIMARY"
                  />
                )}
                {item.content}
              </Stack>
            </Link>
          )}
          selectedItemId={urlParams.articleId}
        />
      )}
    </Stack>
  );

  const Content: VFC = () => (
    <Stack direction="vertical" grow={1}>
      <MediaQuery upTo="md">
        <Button variant="v1" margin={[1, 1, 0]} href="/Articles">
          <T articles-content-back />
        </Button>
      </MediaQuery>
      {currentArticle === "ERROR" ? (
        <TryAgain
          error={t("articles-content-error")}
          action={t("global-try-again")}
          onClick={() => fetchCurrentArticle()}
          margin={[6, 1, 1]}
        />
      ) : (
        <Article
          article={currentArticle}
          margin={[1, 1, 3]}
          authorsText={t("articles-content-authors")}
          contributorsText={t("articles-content-contributors")}
        />
      )}
    </Stack>
  );

  const BlankContent: VFC = () => (
    <Stack grow={1} direction="vertical" alignItems="center" justifyContent="start">
      <Image src={articlesLanding} width={300} margin={[6, 0, 0]} />
      {loadedSidebarTree?.[0] && (
        <Button variant="v3" href={loadedSidebarTree[0].link} margin={[6, 0, 0]}>
          {loadedSidebarTree[0].content}
        </Button>
      )}
    </Stack>
  );

  return (
    <>
      <ErrorBoundary local={{ emailUs: "global-error-email-us" as AllDictionaryKeys }}>
        <Helmet>
          <title>{`${
            (urlParams.articleId && loadedCurrentArticle?.title) || t("articles-title")
          } | DzCode i/o`}</title>
          <meta
            name="description"
            content={
              (urlParams.articleId && loadedCurrentArticle?.description) ||
              t("articles-description")
            }
          />
        </Helmet>
      </ErrorBoundary>
      <Stack direction="horizontal" grow={1}>
        <MediaQuery downTo={urlParams.articleId ? "md" : undefined}>
          <Sidebar />
        </MediaQuery>
        {urlParams.articleId && <Content />}
        {!urlParams.articleId && (
          <MediaQuery downTo={"md"}>
            <BlankContent />
          </MediaQuery>
        )}
      </Stack>
    </>
  );
};

// ts-prune-ignore-next
export default ArticlesPage;
