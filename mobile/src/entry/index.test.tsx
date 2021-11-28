import { App } from ".";
import React from "react";
import renderer from "react-test-renderer";

jest.useFakeTimers();

const mock = jest.requireMock("react-native-reanimated");
jest.mock("react-native-reanimated", () => ({
  ...mock,
  useSharedValue: jest.fn().mockReturnValue(0),
  useAnimatedStyle: jest.fn().mockReturnValue({}),
  useAnimatedScrollHandler: jest.fn().mockReturnValue({}),
  createAnimatedComponent: (component: any) => jest.fn().mockReturnValue(component),
  __reanimatedWorkletInit: jest.fn(),
  ScrollView: "ScrollView",
}));

jest.mock("@gorhom/bottom-sheet", () => {
  require("react-native-reanimated/mock");
});

(global as any).__reanimatedWorkletInit = jest.fn();

jest.mock("@react-navigation/drawer", () => ({
  createDrawerNavigator: jest.fn().mockReturnValue({
    Navigator: jest.fn().mockReturnValue(null),
    Screen: jest.fn().mockReturnValue(null),
  }),
}));

it("renders correctly", () => {
  const render = renderer.create(<App />);

  expect(render).toMatchSnapshot();
});