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
import learnLanding from "src/assets/svg/learn-landing.svg";
import { T, t } from "src/components/t";
import { fetchCurrentDocument, fetchDocumentationList } from "src/redux/actions/documentation-page";
import { useSliceSelector } from "src/redux/selectors";

const LearnPage: FC = () => {
  const { currentDocument, sidebarTree } = useSliceSelector("learnPage");
  const { params: urlParams } = useRouteMatch<{ articleId?: string }>();

  const loadedCurrentDocument = isLoaded(currentDocument);

  useEffect(() => {
    fetchDocumentationList();
  }, []); // @TODO-ZM: add language as dependency

  useEffect(() => {
    if (urlParams.articleId) {
      fetchCurrentDocument();
    }
  }, [urlParams.articleId]); // @TODO-ZM: add language as dependency

  const loadedSidebarTree = isLoaded(sidebarTree);

  const Sidebar: VFC = () => (
    <Stack direction="vertical" margin={[3, 0]}>
      {sidebarTree === "ERROR" ? (
        <TryAgain
          error={t("learn-list-error")}
          action={t("global-try-again")}
          onClick={() => fetchDocumentationList()}
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
        <Button variant="v1" margin={[1, 1, 0]} href="/Learn">
          <T learn-content-back />
        </Button>
      </MediaQuery>
      {currentDocument === "ERROR" ? (
        <TryAgain
          error={t("learn-content-error")}
          action={t("global-try-again")}
          onClick={() => fetchCurrentDocument()}
          margin={[6, 1, 1]}
        />
      ) : (
        <Article
          article={currentDocument}
          margin={[1, 1, 3]}
          authorsText={t("learn-content-authors")}
          contributorsText={t("learn-content-contributors")}
        />
      )}
    </Stack>
  );

  const BlankContent: VFC = () => (
    <Stack grow={1} direction="vertical" alignItems="center" justifyContent="start">
      <Image src={learnLanding} width={300} margin={[6, 0, 0]} />
      {loadedSidebarTree?.[0] && (
        <Button variant="v3" href={loadedSidebarTree[0].link} margin={[6, 0, 0]}>
          {loadedSidebarTree[0].content}
        </Button>
      )}
    </Stack>
  );

  return (
    <>
      <ErrorBoundary>
        <Helmet>
          <title>{`${
            (urlParams.articleId && loadedCurrentDocument?.title) || t("learn-title")
          } | DzCode i/o`}</title>
          <meta
            name="description"
            content={
              (urlParams.articleId && loadedCurrentDocument?.description) || t("learn-description")
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
export default LearnPage;
