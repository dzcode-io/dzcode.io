import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import React from "react";
import { Link } from "src/components/link";
import { useLocale } from "src/components/locale";
import { Markdown } from "src/components/markdown";
import { getElapsedTime } from "src/utils/elapsed-time";

export default function ContributionCard({
  key,
  contribution,
}: {
  key: React.Key;
  contribution: Pick<
    ContributionEntity,
    "id" | "title" | "type" | "url" | "updatedAt" | "activityCount"
  > & {
    repository: Pick<RepositoryEntity, "id" | "owner" | "name"> & {
      project: Pick<ProjectEntity, "id" | "name">;
    };
    contributor: Pick<ContributorEntity, "id" | "name" | "username" | "avatarUrl">;
  };
}) {
  const { localize } = useLocale();

  return (
    <div
      dir="ltr"
      className="card card-compact bg-base-300 flex-auto w-full max-w-xs sm:max-w-sm"
      key={key}
    >
      <div className="card-body markdown">
        <div className="card-body">
          <h2 className="card-title">
            <Markdown content={contribution.title} />
          </h2>
          <span className="flex-1" />
          <span className="card-normal">{contribution.repository.project.name}</span>
          <span className="card-normal">
            {contribution.repository.owner}/{contribution.repository.name}
          </span>
          <div className="card-actions justify-end mt-4 gap-4">
            <img className="w-6 h-6 rounded-full" src={contribution.contributor.avatarUrl} />
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
            <div className="flex flex-row">
              {getElapsedTime(contribution.updatedAt, localize("elapsed-time-suffixes"))}
            </div>
            <Link href={contribution.url} className="link">
              {contribution.type === "ISSUE"
                ? localize("contribute-read-issue")
                : localize("contribute-review-changes")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
