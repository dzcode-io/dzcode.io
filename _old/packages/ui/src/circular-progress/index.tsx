import Box from "@mui/material/Box";
import MUICircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import type { FC } from "react";

export const CircularProgress: FC<CircularProgressProps & { value: number }> = ({
  value,
  ...props
}) => {
  return (
    // @TODO-ZM: cleanup this rushed component
    <Box sx={{ position: "relative", display: "inline-flex" }} {...props}>
      <MUICircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
          position: "absolute",
        }}
        value={100}
      />
      <MUICircularProgress variant="determinate" value={value * 100} />
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
        <Typography component="div" variant="caption">{`${Math.round(value * 100)}%`}</Typography>
      </Box>
    </Box>
  );
};
