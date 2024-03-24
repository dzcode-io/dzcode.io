import { render } from "@testing-library/react-native";

import { ProjectCard } from ".";

describe("ProjectCard", () => {
  it("should render", () => {
    const { container } = render(
      <ProjectCard
        project={{
          name: "test",
          repositories: [],
          slug: "test",
        }}
        openLink={() => undefined}
      />,
    );
    expect(container).toBeTruthy();
  });
});
