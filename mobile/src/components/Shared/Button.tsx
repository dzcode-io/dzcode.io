// import react native
import React, { FC } from "react";
import { Text, View } from "react-native";

// define Button props interface
interface ButtonProps {}

// export Button component
const Button: FC<ButtonProps> = ({}): JSX.Element => {
  return (
    <View>
      <Text>Button component created!</Text>
    </View>
  );
};
export default Button;
