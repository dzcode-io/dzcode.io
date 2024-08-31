import { useEffect } from "react";
import { Link } from "src/components/link";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { Markdown } from "src/components/markdown";
import { TryAgain } from "src/components/try-again";
import { fetchMilestonesListAction } from "src/redux/actions/milestones";
import { useAppDispatch, useAppSelector } from "src/redux/store";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  const { milestones } = useAppSelector((state) => state.landingPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMilestonesListAction());
  }, [dispatch]);

  return (
    <main className="flex flex-col self-center">
      <div className="hero pb-40 pt-40">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold">
              <Locale landing-heading-title />
            </h1>
            <p className="py-6">
              <Locale landing-heading-subtitle />
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:justify-center">
              <Link className="btn btn-primary" href="/projects">
                <Locale landing-cta-button-1 />
              </Link>
              <Link className="btn btn-link" href="/contribute">
                <Locale landing-cta-button-2 />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="m-4">
        <h1 className="text-4xl font-bold text-center max-w-xl m-auto">
          <Locale landing-milestones-title />
        </h1>
        <p className="py-6 max-w-xl m-auto">
          <Locale landing-milestones-subtitle />
        </p>

        <div className="flex justify-center">
          {milestones === "ERROR" ? (
            <TryAgain
              error={localize("global-generic-error")}
              action={localize("global-try-again")}
              onClick={() => {
                dispatch(fetchMilestonesListAction());
              }}
            />
          ) : milestones === null ? (
            <Loading />
          ) : (
            <div>
              <ul className="timeline max-md:timeline-compact timeline-vertical mt-4 mb-4">
                {milestones.map((milestone, milestoneIndex) => {
                  const isEven = milestoneIndex % 2 === 0;

                  return (
                    <li dir="ltr" key={milestoneIndex}>
                      <hr />
                      <div
                        className={`${
                          isEven ? "timeline-start" : "timeline-end"
                        } w-full md:w-auto timeline-box ${
                          isEven ? "md:text-end" : "md:text-start"
                        }`}
                      >
                        <h2 className="text-xl font-bold">{milestone.title}</h2>
                        <p>
                          <Markdown content={milestone.description} />
                        </p>
                      </div>
                      <div className="md:timeline-middle">
                        {milestone.closedAt ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="text-primary h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <hr />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
