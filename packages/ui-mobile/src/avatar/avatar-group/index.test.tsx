import { render } from "@testing-library/react-native";

import { AvatarGroup } from ".";

describe("AvatarGroup", () => {
  it("should render", () => {
    const { container } = render(<AvatarGroup avatarUris={[]} />);
    expect(container).toBeTruthy();
  });
});
