import {
  ContributionEntity,
  FilterEntity,
  OptionEntity,
} from "@dzcode.io/common/dist/types";
import { lorem } from "faker";

export const generateContributionMock = (index: number): ContributionEntity => {
  const projectName = `${lorem.word()}/${lorem.word()}`;

  return {
    id: `${index}`,
    labels: lorem.sentence().split(" "),
    languages: lorem.sentence().split(" "),
    project: {
      id: `github/${projectName}`,
      name: projectName,
    },
    title: lorem.sentence(),
    url: `https://github.com/${projectName}/issues/${index}`,
  };
};

export const bulkGenerateContributionMock = (from: number, to: number) => {
  const contributionsMock: ContributionEntity[] = [];
  const filtersMock: FilterEntity[] = [
    { label: "Project", name: "projects", options: [] },
    { label: "Language", name: "languages", options: [] },
    { label: "Label", name: "labels", options: [] },
  ];

  const pushUniqueOption = (
    options: OptionEntity[],
    filterOptions: OptionEntity[],
  ) => {
    const uniqueOptions = options.filter(
      (_option) => !filterOptions.some(({ name }) => _option.name === name),
    );
    filterOptions.push(...uniqueOptions);
  };

  for (let i = from; i <= to; i++) {
    const contributionMock = generateContributionMock(i);
    contributionsMock.push(contributionMock);
    pushUniqueOption(
      [
        {
          name: contributionMock.project.id,
          label: contributionMock.project.name,
        },
      ],
      filtersMock[0].options,
    );
    pushUniqueOption(
      contributionMock.languages.map((language) => ({
        name: language,
        label: language,
      })),
      filtersMock[1].options,
    );

    pushUniqueOption(
      contributionMock.labels.map((label) => ({
        name: label,
        label: label,
      })),
      filtersMock[2].options,
    );
  }

  return { contributions: contributionsMock, filters: filtersMock };
};
