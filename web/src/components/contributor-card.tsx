import React from "react";
import { Link } from "src/components/link";
import { getContributorURL } from "src/utils/contributor";
import { GetContributorsResponse } from "@dzcode.io/api/dist/contributor/types";

export function ContributorCard({
  contributor,
  compact = false,
  onClick,
}: {
  contributor: GetContributorsResponse["contributors"][number];
  compact?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      className="card bg-base-300 w-full sm:max-w-52 rounded-lg flex flex-row border-base-200 border-2 overflow-hidden"
      href={getContributorURL(contributor)}
      // TODO-OB: there's a bug here: when passing onClick to Link, the link no longer work as a SPA link, and instead causes a full reload of the page
      onClick={onClick}
    >
      <img
        src={contributor.avatarUrl}
        alt={contributor.name}
        className="flex sm:hidden rounded-none size-28"
      />
      <div className="flex-1 flex flex-col items-center">
        <div className="flex-1 flex flex-row sm:flex-col justify-start sm:justify-center items-center p-4 gap-4 w-full">
          <img
            src={contributor.avatarUrl}
            alt={contributor.name}
            className="hidden sm:flex rounded-full size-20"
          />
          <span className="card-title break-all">{contributor.name}</span>
        </div>
        {!compact && (
          <div className="flex flex-row gap-4 w-full justify-around bg-base-200 text-gray-500 p-2">
            <div className="flex flex-row gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              {contributor.totalContributionScore}
            </div>
            <div className="divider divider-horizontal" />
            <div className="flex flex-row gap-2">
              {contributor.totalRepositoryCount}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
