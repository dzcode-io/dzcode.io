import { Contribution, ContributionFilters, Filter, Project } from "../../../api/interfaces";

/**
 * @function getFilters
 * @description Returns the filters for the contributions list
 * @param {Contribution[]} contributions - list of contributions
 * @returns {object[]} list of filters
 * @author [Omar Belghaouti](https://github.com/Omar-Belghaouti)
 */
export const getFilters = (contributions: Contribution[]): ContributionFilters => {
  let filters: ContributionFilters = {
    project: [],
    language: [],
    label: [],
  };
  const projects: Project[] = [];
  const languages: string[] = [];
  const labels: string[] = [];
  for (let i = 0; i < contributions.length; i++) {
    const contribution = contributions[i];
    let found = false;
    for (let j = 0; j < projects.length; j++) {
      const project = projects[j];
      if (project.name === contribution.project.name) {
        found = true;
      }
    }
    if (!found) {
      projects.push(contribution.project);
    }
    for (let j = 0; j < contribution.languages.length; j++) {
      const language = contribution.languages[j];
      if (!languages.includes(language)) {
        languages.push(language);
      }
    }
    for (let j = 0; j < contribution.labels.length; j++) {
      const label = contribution.labels[j];
      if (!labels.includes(label)) {
        labels.push(label);
      }
    }
  }
  const project: (Project & Filter)[] = [];
  const language: Filter[] = [];
  const label: Filter[] = [];
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    project.push({
      name: p.name,
      slug: p.slug,
      value: p.slug,
      checked: false,
    });
  }
  for (let i = 0; i < languages.length; i++) {
    const l = languages[i];
    language.push({
      value: l,
      checked: false,
    });
  }
  for (let i = 0; i < labels.length; i++) {
    const l = labels[i];
    label.push({
      value: l,
      checked: false,
    });
  }
  filters = {
    project: project,
    language: language,
    label: label,
  };
  return filters;
};
