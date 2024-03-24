import { FC } from "react";
import { View } from "react-native";
import { Button, Headline } from "react-native-paper";

interface TryAgainProps {
  /**
   * the function to call when the button is clicked
   */
  onClick: () => void;
  /**
   * the error message to display
   */
  error: string;
  /**
   * the action to display on the button
   */
  action: string;
}

/**
 * TryAgain component used to display a button to try again when an error is caught
 * @example
 * <TryAgain
 *    onClick={() => {}}
 *    error="Ops, something broke, we're checking on our end..."
 *    action="Try again"
 * />
 */
export const TryAgain: FC<TryAgainProps> = ({ error, action, onClick }) => {
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
