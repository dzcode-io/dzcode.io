import { render } from "@testing-library/react-native";
import React from "react";

import { ProjectCard } from ".";

describe("ProjectCard", () => {
  it("should render", () => {
    const { container } = render(
      <ProjectCard
        openLink={() => undefined}
        project={{
          title: "title",
          description: "description",
          githubURI: "githubURI",
          image: "image",
        }}
        theme={"dark"}
      />,
    );
    expect(container).toBeTruthy();
  });
});
