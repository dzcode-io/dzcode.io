import { render } from "@testing-library/react-native";
import React from "react";

import { ProjectCard } from ".";

describe("ProjectCard", () => {
  it("should render", () => {
    const { container } = render(
      <ProjectCard
        openLink={() => undefined}
        project={{
          name: "test",
          repositories: [
            {
              owner: "test",
              provider: "github",
              repository: "test",
            },
          ],
          slug: "test",
        }}
      />,
    );
    expect(container).toBeTruthy();
  });
});
