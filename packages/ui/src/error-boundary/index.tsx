import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react";
import { FC } from "react";
import { useTranslation } from "src/_hooks/use-translation";
import { ChildrenProp } from "src/_types";
import { Link } from "src/link";
import { Stack } from "src/stack";
import { Text } from "src/text";

interface ErrorBoundaryProps extends ChildrenProp {
  message?: string;
  local: {
    emailUs: string;
  };
}

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
  children,
  // @TODO-ZM: localize this
  message = "Ops, something broke, we're checking on our end...",
  local,
}) => {
  const { t } = useTranslation();

  return (
    <SentryErrorBoundary
      fallback={
        <Stack direction="vertical" alignItems="center">
          <Text variant="v2" margin={3}>
            {message}
          </Text>
          <Link href="mailto:contact@dzcode.io?subject=Reporting%20an%20error%20in%20dzcode%20website">
            {t(local.emailUs)}
          </Link>
        </Stack>
      }
    >
      {children}
    </SentryErrorBoundary>
  );
};
