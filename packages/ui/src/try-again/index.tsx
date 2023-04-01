import { FC } from "react";
import { BaseUIProps } from "src/_types";
import { Button } from "src/button";
import { Stack } from "src/stack";
import { Text } from "src/text";

export const TryAgain: FC<
  {
    onClick: () => void;
    error: string;
    action: string;
  } & BaseUIProps
> = ({ error, action, onClick, margin }) => {
  return (
    <Stack direction="vertical" margin={margin} alignItems="center">
      <Text variant="v2">{error}</Text>
      <Button variant="v2" margin={[3, 0, 0]} onClick={onClick}>
        {action}
      </Button>
    </Stack>
  );
};
