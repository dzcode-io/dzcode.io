import { useEffect } from "react";
import { Link } from "src/components/link";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { TryAgain } from "src/components/try-again";
import { fetchContributorsListAction } from "src/redux/actions/contributors";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { getRepositoryName, getRepositoryURL } from "src/utils/repository";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  const { contributorsList } = useAppSelector((state) => state.contributorsPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContributorsListAction());
  }, [dispatch]);

  return (
    <main className="flex flex-col self-center">
      <h1 className="text-xl font-bold m-2 mt-8 self-center">
        <Locale team-header-title />
      </h1>

      <div className="flex flex-col self-center">
        {contributorsList === "ERROR" ? (
          <TryAgain
            error={localize("global-generic-error")}
            action={localize("global-try-again")}
            onClick={() => {
              dispatch(fetchContributorsListAction());
            }}
          />
        ) : contributorsList === null ? (
          <Loading />
        ) : (
          <div className="flex flex-row flex-wrap gap-4 justify-between p-4 max-w-7xl">
            {contributorsList.map((contributor, contributorIndex) => (
              <div dir="ltr" className="card bg-base-300 w-96 flex-auto" key={contributorIndex}>
                <div className="card-body markdown">
                  <img
                    src={contributor.avatarUrl}
                    alt={contributor.name}
                    className="rounded-full w-20 h-20"
                  />
                  <h2 className="card-title">{contributor.name}</h2>
                  <ul>
                    {contributor.repositories.map((repository, repositoryIndex) => (
                      <li key={repositoryIndex}>
                        <Link href={getRepositoryURL(repository)}>
                          {getRepositoryName(repository)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
