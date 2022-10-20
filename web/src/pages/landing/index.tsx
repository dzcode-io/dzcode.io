import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { useColors } from "@dzcode.io/ui/dist/hooks/use-colors";
import { ThemeProvider } from "@dzcode.io/ui/dist/theme/theme-provider";
import { Button } from "@dzcode.io/ui/dist/v2/button";
import { Image } from "@dzcode.io/ui/dist/v2/image";
import { Markdown } from "@dzcode.io/ui/dist/v2/markdown";
import { MediaQuery } from "@dzcode.io/ui/dist/v2/media-query";
import { Stack } from "@dzcode.io/ui/dist/v2/stack";
import { Text } from "@dzcode.io/ui/dist/v2/text";
import { FC } from "react";
import { Helmet } from "react-helmet";
import androidDark from "src/assets/png/android-dark.png";
import androidLight from "src/assets/png/android-light.png";
import iosDark from "src/assets/png/ios-dark.png";
import iosLight from "src/assets/png/ios-light.png";
import headerImage from "src/assets/svg/dzcode.svg";
import { LinkV2 } from "src/components/link-v2";
import { T, t } from "src/components/t";
import { fullstackConfig } from "src/config";
import { useSliceSelector } from "src/redux/selectors";

export const LandingPage: FC = () => {
  const { darkMode, language } = useSliceSelector("settings");
  const { from } = useColors();

  const mobileApps = [
    {
      image: darkMode ? androidDark : androidLight,
      href: fullstackConfig.mobile.android.url,
    },
    {
      image: darkMode ? iosDark : iosLight,
      href: fullstackConfig.mobile.ios.url,
    },
  ];

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
        <Stack direction="vertical" alignItems="center">
          <Stack direction="horizontal" alignItems="center" height="100vh">
            <Stack direction="vertical" margin={3}>
              <Text variant="v3">
                <Markdown t={t("landing-heading-title", { COLOR: from("PRIMARY") })} />
              </Text>
              <Text variant="v4" margin={[3, 0]}>
                <Markdown t={t("landing-heading-subtitle")} />
              </Text>
              <MediaQuery downTo="sm">
                <Stack direction="horizontal" alignItems="center">
                  <Button variant="v3" href="/Contribute">
                    <T landing-cta-button />
                  </Button>
                  <Button variant="v1" margin={[0, 3]} href="/FAQ">
                    <T landing-help-button />
                  </Button>
                </Stack>
              </MediaQuery>
              <MediaQuery upTo="sm">
                <Stack direction="vertical" alignItems="center">
                  <Button variant="v3" margin={[3]} href="/Contribute">
                    <T landing-cta-button />
                  </Button>
                  <Button variant="v1" href="/FAQ">
                    <T landing-help-button />
                  </Button>
                </Stack>
              </MediaQuery>
            </Stack>
            <MediaQuery downTo="md">
              <Image src={headerImage} width="40%" margin={3} />
            </MediaQuery>
          </Stack>
          <Stack direction="vertical" alignItems="center">
            <Text variant="v3" margin={[0, 3]}>
              <T landing-mobile-title />
            </Text>
            <Text variant="v2" margin={3}>
              <T landing-mobile-subtitle />
            </Text>
            <Stack
              direction="horizontal"
              justifyContent="space-around"
              alignItems="center"
              width="100%"
              flexWrap="wrap"
            >
              {mobileApps.map((mobileApp, index) => (
                <LinkV2 key={`mobile-app-${index}`} href={mobileApp.href} variant="v2">
                  <Image src={mobileApp.image} height="480" />
                </LinkV2>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default LandingPage;
