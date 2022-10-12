import React, { FC } from "react";
import { View } from "react-native";
import { Button, Headline } from "react-native-paper";

/**
 * TryAgain component used to display a button to try again when an error is caught
 * @prop {VoidFunction} onClick - the function to call when the button is clicked
 * @prop {string} error - the error message to display
 * @prop {string} action - the action to display on the button
 * @example
 * <TryAgain
 *    onClick={() => {}}
 *    error="Ops, something broke, we're checking on our end..."
 *    action="Try again"
 * />
 */
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
        padding: 10,
      }}
    >
      <Headline style={{ marginVertical: 24 }}>{error}</Headline>
      <Button icon="repeat" mode="contained" onPress={onClick}>
        {action}
      </Button>
    </View>
  );
};
