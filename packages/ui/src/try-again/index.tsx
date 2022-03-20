import { FC } from "react";

import { Button } from "../button";
import { Grid } from "../grid";
import { Typography } from "../typography";

export const TryAgain: FC<{ onClick: () => void; error: string; action: string }> = ({
  error,
  action,
  onClick,
}) => {
  return (
    <Grid>
      <Typography textAlign="center">{error}</Typography>
      <div style={{ textAlign: "center", margin: "1rem auto" }}>
        <Button onClick={onClick}>{action}</Button>
      </div>
    </Grid>
  );
};
