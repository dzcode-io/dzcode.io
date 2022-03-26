import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react";
import { FC, PropsWithChildren } from "react";

import { Grid } from "../grid";
import { Link } from "../link";
import { Typography } from "../typography";

type ErrorBoundaryProps = PropsWithChildren<{
  message?: string;
}>;

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
  children,
  message = "Ops, something broke, we're checking on our end...",
}) => (
  <SentryErrorBoundary
    fallback={
      <Grid style={{ flex: 1 }}>
        <Typography textAlign="center" margin={3}>
          {message}
        </Typography>
        <div style={{ textAlign: "center", margin: "1rem auto" }}>
          <Link href="mailto:contact@dzcode.io?subject=Reporting%20an%20error%20in%20dzcode%20website">
            Email us 📩
          </Link>
        </div>
      </Grid>
    }
  >
    {children}
  </SentryErrorBoundary>
);
