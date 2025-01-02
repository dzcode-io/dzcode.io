import { GetContributionsResponse } from "@dzcode.io/api/dist/contribution/types";
import React from "react";
import { Link } from "src/components/link";
import { useLocale } from "src/components/locale";
import { Markdown } from "src/components/markdown";
import { getContributionURL } from "src/utils/contribution";
import { getElapsedTime } from "src/utils/elapsed-time";

export function ContributionCard({
  contribution,
  compact = false,
  onClick,
}: {
  contribution: GetContributionsResponse["contributions"][number];
  compact?: boolean;
  onClick?: () => void;
}) {
  const { localize } = useLocale();

  return (
    <Link
      className="card card-compact bg-base-300 flex-auto w-full max-w-xs sm:max-w-sm"
      href={getContributionURL(contribution)}
      // TODO-OB: there's a bug here: when passing onClick to Link, the link no longer work as a SPA link, and instead causes a full reload of the page
      onClick={onClick}
    >
      <div className="card-body markdown">
        <div className="card-body">
          <h2 className="card-title">
            <Markdown content={contribution.title} />
          </h2>
          <span className="flex-1" />
          {!compact && (
            <>
              <span className="card-normal">{contribution.repository.project.name}</span>
              <span className="card-normal">
                {contribution.repository.owner}/{contribution.repository.name}
              </span>
            </>
          )}
          <div className="card-actions justify-end mt-4 gap-4">
            {!compact && (
              <img className="w-6 h-6 rounded-full" src={contribution.contributor.avatarUrl} />
            )}
            <div className="flex-1" />
            {contribution.activityCount > 0 && (
              <div className="flex flex-row">
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
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
                <span className="">{contribution.activityCount}</span>
              </div>
            )}
            {!compact && (
              <div className="flex flex-row">
                {getElapsedTime(contribution.updatedAt, localize("elapsed-time-suffixes"))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
