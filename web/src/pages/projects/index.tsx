import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { t } from "src/components/t";
import { Dispatch, StateInterface } from "src/redux";
import { fetchProjectsList } from "src/redux/actions/projects-page";
import { ProjectsPageState } from "src/redux/reducers/projects-page";

import { Catalog } from "./catalog";

export const ProjectsPage: FC = () => {
  const { projectsList } = useSelector<StateInterface, ProjectsPageState>(
    (state) => state.projectsPage,
  );
  const dispatch = useDispatch<Dispatch<ProjectsPageState>>();

  useEffect(() => {
    dispatch(fetchProjectsList());
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
            onClick={() => dispatch(fetchProjectsList())}
          />
        ) : (
          <Catalog projectsList={projectsList} />
        )}
      </div>
    </ErrorBoundary>
  );
};
export default ProjectsPage;
