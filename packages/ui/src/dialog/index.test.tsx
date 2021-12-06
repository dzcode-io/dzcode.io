import { render, screen } from "@testing-library/react";

import { ContributionsDialog } from ".";
import { createProjects } from "../__mocks__/create-projects";
import { createRepositories } from "../__mocks__/create-repositories";

it("should render a closed dialog on first mount", async () => {
  const onClose = jest.fn();
  const props = {
    onClose: onClose,
    open: false,
    projects: createProjects(2),
    repositories: createRepositories(2),
  };

  const { container } = render(<ContributionsDialog {...props} />);
  expect(container).toMatchSnapshot();
});

it("should handle users with no projects", async () => {
  const onClose = jest.fn();
  const props = {
    onClose: onClose,
    open: true,
    projects: [],
    repositories: createRepositories(2),
  };

  render(<ContributionsDialog {...props} />);
  const dialog = await screen.findByTestId("contribution-dialog");
  expect(dialog).toBeInTheDocument();
});

it("should handle users with no repositories", async () => {
  const onClose = jest.fn();
  const props = {
    onClose: onClose,
    open: true,
    projects: createProjects(2),
    repositories: [],
  };

  render(<ContributionsDialog {...props} />);
  const dialog = await screen.findByTestId("contribution-dialog");
  expect(dialog).toBeInTheDocument();
});

it("should render a dialog", async () => {
  const onClose = jest.fn();
  const props = {
    onClose: onClose,
    open: true,
    projects: createProjects(2),
    repositories: createRepositories(2),
  };

  render(<ContributionsDialog {...props} />);
  const dialog = await screen.findByTestId("contribution-dialog");
  expect(dialog).toBeVisible();
  expect(dialog).toBeInTheDocument();
});
