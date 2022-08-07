import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { FC } from "react";
import { Helmet } from "react-helmet";
import { t } from "src/apps/main/components/t";

import { Header } from "./header";
import { Mobile } from "./mobile";

export const LandingPage: FC = () => {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>{t("landing-title")}</title>
        <meta name="description" content={t("landing-description")} />
      </Helmet>
      <Header />
      <Mobile />
    </ErrorBoundary>
  );
};

export default LandingPage;
