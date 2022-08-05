import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { FC } from "react";

import { Header } from "./header";
import { Mobile } from "./mobile";

export const LandingPage: FC = () => {
  return (
    <ErrorBoundary>
      <Header />
      <Mobile />
    </ErrorBoundary>
  );
};

export default LandingPage;
