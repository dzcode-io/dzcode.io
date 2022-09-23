import { DrawerContentComponentProps, DrawerContentOptions } from "@react-navigation/drawer";
import { render } from "@testing-library/react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { DrawerContent } from ".";

describe("DrawerContent", () => {
  it("should render", () => {
    const props: DrawerContentComponentProps<DrawerContentOptions> = {
      progress: {
        " __value": 0,
        isNativelyInitialized: jest.fn(),
      },
      state: {
        index: 0,
        key: "drawer",
        routeNames: ["Home"],
        routes: [
          {
            key: "Home",
            name: "Home",
          },
        ],
        stale: false,
        type: "drawer",
        history: [],
      },
      navigation: {
        canGoBack: jest.fn(),
        dangerouslyGetParent: jest.fn(),
        dangerouslyGetState: jest.fn(),
        dispatch: jest.fn(),
        emit: jest.fn(),
        goBack: jest.fn(),
        isFocused: jest.fn(),
        navigate: jest.fn(),
        reset: jest.fn(),
        setParams: jest.fn(),
        toggleDrawer: jest.fn(),
        closeDrawer: jest.fn(),
        openDrawer: jest.fn(),
        getParent: jest.fn(),
        getState: jest.fn(),
        jumpTo: jest.fn(),
      },
      descriptors: {
        Home: {
          navigation: {
            canGoBack: jest.fn(),
            dangerouslyGetParent: jest.fn(),
            dangerouslyGetState: jest.fn(),
            dispatch: jest.fn(),
            goBack: jest.fn(),
            isFocused: jest.fn(),
            navigate: jest.fn(),
            reset: jest.fn(),
            setParams: jest.fn(),
            getParent: jest.fn(),
            getState: jest.fn(),
            addListener: jest.fn(),
            removeListener: jest.fn(),
            setOptions: jest.fn(),
          },
          options: {},
          render: jest.fn(),
        },
      },
    };
    const { container } = render(
      <SafeAreaProvider>
        <DrawerContent {...props} version="1.0.0" />
      </SafeAreaProvider>,
    );
    expect(container).toBeTruthy();
  });
});
