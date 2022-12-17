import { VFC } from "react";
import { Button } from "src/button";
import { Stack } from "src/stack";
import { Text } from "src/text";

export const TryAgain: VFC<{
  onClick: () => void;
  error: string;
  action: string;
  // @TODO-ZM: dry Margin interface and code
  margin?: number | number[];
}> = ({ error, action, onClick, margin }) => {
  return (
    <Stack direction="vertical" margin={margin} alignItems="center">
      <Text variant="v2">{error}</Text>
      <Button variant="v2" margin={[3, 0, 0]} onClick={onClick}>
        {action}
      </Button>
    </Stack>
  );
};
