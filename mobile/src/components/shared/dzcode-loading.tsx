import React, { FC, useEffect, useState } from "react";
import { Animated, ImageStyle } from "react-native";
import { dzcodeLoadingStyles } from "../../styles";

// declare DZCodeLoading props interface
interface DZCodeLoadingProps {
  style?: ImageStyle;
}

// export dzcode loading component
const DZCodeLoading: FC<DZCodeLoadingProps> = ({ style }: DZCodeLoadingProps): JSX.Element => {
  // use rotate animated value state
  const [rotateAnimValue, setRotateAnimValue] = useState(new Animated.Value(0));

  // use effect on component did mount
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
      source={require("../../assets/images/favicon.png")}
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
export default DZCodeLoading;
