import React, { useCallback, useMemo, useState } from "react";
import { useLocale } from "./locale";
import ProjectCard from "src/pages/projects/project-card";
import ContributorCard from "src/pages/team/contributor-card";
import ContributionCard from "src/pages/contribute/contribute-card";
import { useSearch } from "src/utils/search";
import { Project } from "@dzcode.io/api/dist/project/types";
import { Contribution } from "@dzcode.io/api/dist/contribution/types";
import { Contributor } from "@dzcode.io/api/dist/contributor/types";

export function Search(): JSX.Element {
  const { localize } = useLocale();
  const [query, setQuery] = useState("");

  const results = useSearch(query);

  const hideModal = useCallback(() => {
    (document.getElementById("search-modal") as HTMLDialogElement).hidePopover();
  }, []);

  const onSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const projectsList = useMemo(() => {
    return (results?.searchResults.results || [])
      .filter((result) => result.indexUid === "project")
      .flatMap((projects) => projects.hits) as unknown as Array<Project>;
  }, [results?.searchResults.results]);

  const contributorsList = useMemo(() => {
    return (results?.searchResults.results || [])
      .filter((result) => result.indexUid === "contributor")
      .flatMap((contributors) => contributors.hits) as unknown as Array<Contributor>;
  }, [results?.searchResults.results]);

  const contributionsList = useMemo(() => {
    return (results?.searchResults.results || [])
      .filter((result) => result.indexUid === "contribution")
      .flatMap((contributions) => contributions.hits) as unknown as Array<Contribution>;
  }, [results?.searchResults.results]);

  return (
    <dialog id="search-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl h-[80vh] flex flex-col">
        <label className="input input-bordered flex items-center gap-2 bg-neutral sticky top-0 z-10">
          <input
            type="text"
            className="grow h-12"
            placeholder={localize("navbar-section-search")}
            onChange={onSearchInputChange}
          />
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
        <div className="overflow-y-auto flex-grow">
          {contributionsList?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Contributions</h3>
              <div className="flex flex-row flex-wrap gap-4 justify-center p-4 max-w-7xl">
                {contributionsList.map((contribution) => (
                  <ContributionCard contribution={contribution} key={contribution.id} compact />
                ))}
              </div>
            </div>
          )}
          {contributorsList?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Contributors</h3>
              <div className="flex flex-row flex-wrap gap-4 justify-between p-4 max-w-7xl">
                {contributorsList.map((contributor) => (
                  <ContributorCard
                    contributor={contributor}
                    key={contributor.id}
                    compact
                    onClick={hideModal}
                  />
                ))}
              </div>
            </div>
          )}
          {projectsList?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Projects</h3>
              <div className="flex flex-row flex-wrap gap-4 justify-between p-4 max-w-7xl">
                {projectsList.map((project) => (
                  <ProjectCard project={project} key={project.id} compact onClick={hideModal} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
