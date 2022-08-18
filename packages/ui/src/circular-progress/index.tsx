import Box from "@mui/material/Box";
import MUICircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import type { FC } from "react";

export const CircularProgress: FC<CircularProgressProps & { value: number }> = (props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <MUICircularProgress variant="determinate" {...props} value={props.value * 100} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="div" variant="caption">{`${Math.round(
          props.value * 100,
        )}%`}</Typography>
      </Box>
    </Box>
  );
};
