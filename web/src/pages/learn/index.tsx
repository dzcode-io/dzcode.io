import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { Link } from "@dzcode.io/ui/dist/link";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { Article } from "@dzcode.io/ui/dist/v2/article";
import { Button } from "@dzcode.io/ui/dist/v2/button";
import { MAX_CONTAINER_WIDTH } from "@dzcode.io/ui/dist/v2/flex";
import { Image } from "@dzcode.io/ui/dist/v2/image";
import { MediaQuery } from "@dzcode.io/ui/dist/v2/media-query";
import { Stack } from "@dzcode.io/ui/dist/v2/stack";
import { Treeview } from "@dzcode.io/ui/dist/v2/treeview";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import { FC, useEffect, VFC } from "react";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router-dom";
import learnLanding from "src/assets/svg/learn-landing.svg";
import { t } from "src/components/t";
import { fetchCurrentDocument, fetchDocumentationList } from "src/redux/actions/documentation-page";
import { useSliceSelector } from "src/redux/selectors";

export const LearnPage: FC = () => {
  const { currentDocument, sidebarTree } = useSliceSelector("learnPage");
  const { params: urlParams } = useRouteMatch<{ articleId?: string }>();

  const loadedCurrentDocument = isLoaded(currentDocument);

  useEffect(() => {
    fetchDocumentationList();
  }, []);

  useEffect(() => {
    if (urlParams.articleId) {
      fetchCurrentDocument();
    }
  }, [urlParams.articleId]);

  const loadedSidebarTree = isLoaded(sidebarTree);

  const Sidebar: VFC = () => (
    <Stack direction="vertical" grow={0.25}>
      {sidebarTree === "ERROR" ? (
        <TryAgain
          // @TODO-ZM: use correct dictionary keys
          error={t("team-error")}
          action={t("team-try-again")}
          onClick={() => fetchDocumentationList()}
        />
      ) : (
        <Treeview
          items={sidebarTree}
          min={{ width: MAX_CONTAINER_WIDTH / 4 }}
          margin={1}
          itemRender={(item) => (
            <Link margin={1} href={item.link}>
              {item.content}
            </Link>
          )}
        />
      )}
    </Stack>
  );

  const Content: VFC = () => (
    <Stack direction="vertical" grow={0.75}>
      {currentDocument === "ERROR" ? (
        <TryAgain
          // @TODO-ZM: localize these
          error="Ops, an error occurred while loading the selected document, please try again..."
          action="Try Again"
          onClick={() => fetchCurrentDocument()}
        />
      ) : (
        <>
          <MediaQuery upTo="md">
            <Button variant="v1" margin={[1, 1, 0]} href="/Learn">
              {/* @TODO-ZM: localize this */}
              Back
            </Button>
          </MediaQuery>
          <Article article={currentDocument} margin={[1, 1, 3]} />
        </>
      )}
    </Stack>
  );

  const BlankContent: VFC = () => (
    <Stack grow={0.75} direction="vertical" alignItems="center" justifyContent="start">
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

export default LearnPage;
