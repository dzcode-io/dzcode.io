import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchContributorAction } from "src/redux/actions/contributor";
import { useAppDispatch, useAppSelector } from "src/redux/store";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const dispatch = useAppDispatch();
  const { contributor } = useAppSelector((state) => state.contributorPage);
  const { contributorId } = useParams<{ contributorId: string }>();

  useEffect(() => {
    dispatch(fetchContributorAction(contributorId));
  }, [dispatch, contributorId]);

  return (
    <main className="flex flex-col self-center w-full max-w-7xl">
      <pre>{JSON.stringify(contributorId, null, 2)}</pre>
      <pre>{JSON.stringify(contributor, null, 2)}</pre>
    </main>
  );
}
