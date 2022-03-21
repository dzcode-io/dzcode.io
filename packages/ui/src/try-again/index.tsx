import { FC } from "react";

import { Button } from "../button";
import { Grid } from "../grid";
import { Typography } from "../typography";

export const TryAgain: FC<{
  onClick: () => void;
  error: string;
  action: string;
  stretch?: boolean;
}> = ({ error, action, onClick, stretch = false }) => {
  return (
    <Grid style={{ flex: stretch ? 1 : "initial" }}>
      <Typography textAlign="center">{error}</Typography>
      <div style={{ textAlign: "center", margin: "1rem auto" }}>
        <Button onClick={onClick}>{action}</Button>
      </div>
    </Grid>
  );
};
