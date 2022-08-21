import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { ThemeProvider } from "@dzcode.io/ui/dist/theme/theme-provider";
import { FC } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { t } from "src/apps/main/components/t";

import { StateInterface } from "../../redux";
import { Header } from "./header";
import { MilestonesSection } from "./milestones";
import { Mobile } from "./mobile";

export const LandingPage: FC = () => {
  const {
    settings: { darkMode, language },
  } = useSelector<StateInterface, StateInterface>((state) => state);

  return (
    <ErrorBoundary>
      <ThemeProvider
        direction={language.code === "ar" ? "rtl" : "ltr"}
        mode={darkMode ? "dark" : "light"}
      >
        <Helmet>
          <title>{t("landing-title")}</title>
          <meta name="description" content={t("landing-description")} />
        </Helmet>
        <Header />
        <Mobile />
        <MilestonesSection />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default LandingPage;
