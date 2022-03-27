import React, { FC } from "react";
import { View } from "react-native";
import { Button, Headline } from "react-native-paper";

export const TryAgain: FC<{
  onClick: () => void;
  error: string;
  action: string;
}> = ({ error, action, onClick }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        zIndex: 0,
      }}
    >
      <Headline style={{ marginVertical: 24 }}>{error}</Headline>
      <Button icon="repeat" mode="contained" onPress={onClick}>
        {action}
      </Button>
    </View>
  );
};
