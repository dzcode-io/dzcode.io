import { ProjectCard } from "@dzcode.io/ui/dist/card/project";
import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { Stack } from "@dzcode.io/ui/dist/stack";
import { Text } from "@dzcode.io/ui/dist/text";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { arrayOf } from "@dzcode.io/utils/dist/array";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { T, t, tKey } from "src/components/t";
import { AllDictionaryKeys } from "src/components/t/dictionary";
import { fetchProjectsList } from "src/redux/actions/projects-page";
import { useSliceSelector } from "src/redux/selectors";

const loadingItems = arrayOf(4);

const ProjectsPage: FC = () => {
  const { projectsList } = useSliceSelector("projectsPage");

  useEffect(() => {
    fetchProjectsList();
  }, []);

  return (
    <ErrorBoundary local={{ emailUs: "global-error-email-us" as AllDictionaryKeys }}>
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
                  <ProjectCard
                    key={`project-${index}`}
                    project={project}
                    local={{
                      filterLabelKeyPrefix: tKey("contribute-filter"),
                      programmingLanguageKeyPrefix: tKey("global-programming-language"),
                      contributionLabelKeyPrefix: tKey("global-contribution-label"),
                    }}
                  />
                ))
              : loadingItems.map((index) => (
                  <ProjectCard key={`loading-${index}`} project={null} />
                ))}
          </Stack>
        )}
      </Stack>
    </ErrorBoundary>
  );
};

// ts-prune-ignore-next
export default ProjectsPage;
