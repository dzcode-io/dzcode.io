import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react-native";
import React, { FC, PropsWithChildren } from "react";
import { Linking, View } from "react-native";
import { Button, Headline } from "react-native-paper";

interface ErrorBoundaryProps {
  /**
   * the children of the error boundary
   */
  children?: React.ReactNode;
  /**
   * the message to display when an error is caught
   */
  message?: string;
}

/**
 * ErrorBoundary component used to display a fallback UI when an error is caught
 * @example
 * <ErrorBoundary>
 *    <Text>Content</Text>
 * </ErrorBoundary>
 */
export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
  children,
  message = "Ops, something broke, we're checking on our end...",
}) => (
  <SentryErrorBoundary
    fallback={
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          zIndex: 0,
          padding: 10,
        }}
      >
        <Headline style={{ marginVertical: 24 }}>{message}</Headline>
        <Button
          icon="mail"
          mode="contained"
          onPress={() => {
            Linking.openURL(
              "mailto:contact@dzcode.io?subject=Reporting%20an%20error%20in%20dzcode%20mobile%20app",
            );
          }}
        >
          Email us
        </Button>
      </View>
    }
  >
    {children}
  </SentryErrorBoundary>
);
