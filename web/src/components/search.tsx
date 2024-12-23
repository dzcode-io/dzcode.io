import React from "react";
import { useLocale } from "./locale";
import { useAppSelector } from "src/redux/store";
import ProjectCard from "src/pages/projects/project-card";
import ContributorCard from "src/pages/team/contributor-card";
import ContributionCard from "src/pages/contribute/contribute-card";

export function Search(): JSX.Element {
  const { localize } = useLocale();
  // @TODO-OB: use the search results from the API call (these are just placeholders)
  const { projectsList } = useAppSelector((state) => state.projectsPage);
  const { contributorsList } = useAppSelector((state) => state.contributorsPage);
  const { contributionsList } = useAppSelector((state) => state.contributionsPage);

  return (
    <dialog id="search-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <label className="input input-bordered flex items-center gap-2 bg-neutral">
          <input type="text" className="grow" placeholder={localize("navbar-section-search")} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Contributions</h3>
          <div className="flex flex-row flex-wrap gap-4 justify-center p-4 max-w-7xl">
            {contributionsList !== "ERROR" &&
              contributionsList
                ?.slice(0, 5)
                .map((contribution, contributionIndex) => (
                  <ContributionCard contribution={contribution} key={contributionIndex} />
                ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Contributors</h3>
          <div className="flex flex-row flex-wrap gap-4 justify-between p-4 max-w-7xl">
            {contributorsList !== "ERROR" &&
              contributorsList
                ?.slice(0, 5)
                .map((contributor, contributorIndex) => (
                  <ContributorCard contributor={contributor} key={contributorIndex} />
                ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Projects</h3>
          <div className="flex flex-row flex-wrap gap-4 justify-between p-4 max-w-7xl">
            {projectsList !== "ERROR" &&
              projectsList
                ?.slice(0, 5)
                .map((project, projectIndex) => (
                  <ProjectCard project={project} key={projectIndex} />
                ))}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
