import React, { useEffect, useState, VFC } from "react";
import { Animated, ImageStyle } from "react-native";

import { dzcodeLoadingStyles } from "./styles";

interface DZCodeLoadingProps {
  style?: ImageStyle;
}
/**
 * DZCodeLoading component used to display the dzcode.io loading logo in the app
 * @prop {ImageStyle} style - the style of the dzcode.io logo
 * @example
 * <DZCodeLoading style={{ width: 100, height: 100 }} />
 * @see https://reactnative.dev/docs/image#style
 */

export const DZCodeLoading: VFC<DZCodeLoadingProps> = ({ style }: DZCodeLoadingProps) => {
  const [rotateAnimValue, setRotateAnimValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.spring(rotateAnimValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ).start(() => {
      setRotateAnimValue(new Animated.Value(0));
    });
  }, []);

  return (
    <Animated.Image
      source={require("../../assets/png/favicon.png")}
      style={[
        dzcodeLoadingStyles.imageView,
        {
          transform: [
            {
              rotate: rotateAnimValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        },
        style,
      ]}
    />
  );
};
