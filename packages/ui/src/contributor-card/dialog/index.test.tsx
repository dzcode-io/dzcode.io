import { render, screen } from "@testing-library/react";
import { createRepositories } from "src/__mocks__/create-repositories";

import { ContributionsDialog, ContributionsDialogProps } from ".";

it("should render a closed dialog on first mount", async () => {
  const onClose = jest.fn();
  const props: ContributionsDialogProps = {
    onClose: onClose,
    open: false,
    repositories: createRepositories(2),
    repositoriesText: "Repositories",
  };

  const { container } = render(<ContributionsDialog {...props} />);
  expect(container).toMatchSnapshot();
});

it("should handle users with no projects", async () => {
  const onClose = jest.fn();
  const props: ContributionsDialogProps = {
    onClose: onClose,
    open: true,
    repositories: createRepositories(2),
    repositoriesText: "Repositories",
  };

  render(<ContributionsDialog {...props} />);
  const dialog = await screen.findByTestId("contribution-dialog");
  expect(dialog).toBeInTheDocument();
});

it("should handle users with no repositories", async () => {
  const onClose = jest.fn();
  const props: ContributionsDialogProps = {
    onClose: onClose,
    open: true,
    repositories: [],
    repositoriesText: "Repositories",
  };

  render(<ContributionsDialog {...props} />);
  const dialog = await screen.findByTestId("contribution-dialog");
  expect(dialog).toBeInTheDocument();
});

it("should render a dialog", async () => {
  const onClose = jest.fn();
  const props: ContributionsDialogProps = {
    onClose: onClose,
    open: true,
    repositories: createRepositories(2),
    repositoriesText: "Repositories",
  };

  render(<ContributionsDialog {...props} />);
  const dialog = await screen.findByTestId("contribution-dialog");
  expect(dialog).toBeVisible();
  expect(dialog).toBeInTheDocument();
});
