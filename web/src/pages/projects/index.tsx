import { ProjectCard } from "@dzcode.io/ui/dist/card/project";
import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { Stack } from "@dzcode.io/ui/dist/stack";
import { Text } from "@dzcode.io/ui/dist/text";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { T, t } from "src/components/t";
import { fetchProjectsList } from "src/redux/actions/projects-page";
import { useSliceSelector } from "src/redux/selectors";

const ProjectsPage: FC = () => {
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
      <Stack direction="vertical" alignItems="center" width="100%">
        <Text variant="v3" margin={[3, 1, 0]}>
          <T projects-header-title />
        </Text>
        {projectsList == "ERROR" ? (
          <TryAgain
            error={t("projects-error")}
            action={t("projects-try-again")}
            onClick={() => fetchProjectsList()}
          />
        ) : (
          <Stack
            direction="horizontal"
            flexWrap="wrap"
            margin={[3, 1]}
            justifyContent="space-evenly"
            gap={3}
          >
            {projectsList
              ? projectsList.map((project, index) => (
                  <ProjectCard key={`project-${index}`} project={project} />
                ))
              : "@TODO-ZM: Loading"}
          </Stack>
        )}
      </Stack>
    </ErrorBoundary>
  );
};

// ts-prune-ignore-next
export default ProjectsPage;
