import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react";
import { FC, PropsWithChildren } from "react";
import { Link } from "src/link";
import { Stack } from "src/stack";
import { Text } from "src/text";

type ErrorBoundaryProps = PropsWithChildren<{
  message?: string;
}>;

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
  children,
  message = "Ops, something broke, we're checking on our end...",
}) => (
  <SentryErrorBoundary
    fallback={
      <Stack direction="vertical" alignItems="center">
        <Text variant="v2" margin={3}>
          {message}
        </Text>
        <Link href="mailto:contact@dzcode.io?subject=Reporting%20an%20error%20in%20dzcode%20website">
          {/* @TODO-ZM: localize this */}
          Email us 📩
        </Link>
      </Stack>
    }
  >
    {children}
  </SentryErrorBoundary>
);
