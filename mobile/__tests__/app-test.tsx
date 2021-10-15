import { App } from "../src/entry";
import React from "react";
import renderer from "react-test-renderer";

jest.useFakeTimers();

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));

jest.mock("@react-navigation/drawer", () => ({
  createDrawerNavigator: jest.fn().mockReturnValue({
    Navigator: jest.fn().mockReturnValue(null),
    Screen: jest.fn().mockReturnValue(null),
  }),
}));

it("renders correctly", () => {
  renderer.create(<App />);
});
