import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { t } from "src/components/t";
import { fetchProjectsList } from "src/redux/actions/projects-page";
import { useSliceSelector } from "src/redux/store/selectors";

import { Catalog } from "./catalog";

export const ProjectsPage: FC = () => {
  const { projectsList } = useSliceSelector("projectsPage");

  useEffect(() => {
    fetchProjectsList();
  }, []);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{t("projects-title")}</title>
        <meta name="description" content={t("projects-description")} />
      </Helmet>
      <div>
        {projectsList == "ERROR" ? (
          <TryAgain
            error={t("projects-error")}
            action={t("projects-try-again")}
            onClick={() => fetchProjectsList()}
          />
        ) : (
          <Catalog projectsList={projectsList} />
        )}
      </div>
    </ErrorBoundary>
  );
};
export default ProjectsPage;
