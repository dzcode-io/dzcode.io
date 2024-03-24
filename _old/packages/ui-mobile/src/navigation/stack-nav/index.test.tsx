import { NavigationContainer } from "@react-navigation/native";
import { act, render } from "@testing-library/react-native";
import { FC } from "react";
import { View } from "react-native";
import type { Route } from "src/_types/route";

import { StackNav } from ".";

const Home: FC = () => <View />;

const routes: Route[] = [
  {
    name: "Home",
    component: Home,
    label: "Home",
    title: "Home",
  },
];

describe("StackNav", () => {
  it("should render", async () => {
    const { container } = render(
      <NavigationContainer>
        <StackNav routes={routes} />
      </NavigationContainer>,
    );
    await act(async () => {
      expect(container).toBeTruthy();
    });
  });
});
