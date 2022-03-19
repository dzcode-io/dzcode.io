import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createContributors } from "../__mocks__/create-contributors";
import { ContributorCard, ContributorSkeleton } from ".";

it("should render a contributor skeleton ", async () => {
  render(<ContributorSkeleton />);
  const skeleton = await screen.findByTestId("contributor-card-skeleton");

  expect(skeleton).toBeInTheDocument();
});

it("should render a contributor card", () => {
  const contributor = createContributors(1)[0];
  render(<ContributorCard contributor={contributor} />);
  const username = screen.getByText(contributor.username);

  expect(username).toBeInTheDocument();
});

it("should show contributions dialog after Contributions button is clicked", async () => {
  const contributor = createContributors(1)[0];
  render(<ContributorCard contributor={contributor} />);
  const button = await screen.findByRole("button", { name: "Contributions" });
  userEvent.click(button);

  const contributionsDialog = await screen.findByTestId("contribution-dialog");
  expect(contributionsDialog).toBeInTheDocument();
});
