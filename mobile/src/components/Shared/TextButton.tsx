// import react native
import React, { FC } from "react";
import { Text, View } from "react-native";

// define TextButton props interface
interface TextButtonProps {}

// export TextButton component
const TextButton: FC<TextButtonProps> = ({}): JSX.Element => {
  return (
    <View>
      <Text>TextButton component created!</Text>
    </View>
  );
};
export default TextButton;
