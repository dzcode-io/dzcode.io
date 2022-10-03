import { allLanguages, LanguageEntity } from "@dzcode.io/models/dist/language";
import { FC, Fragment } from "react";
import { useTranslation } from "src/hooks/use-translation";
import { Link } from "src/link-factory";
import { Button } from "src/v2/button";
import { Divider } from "src/v2/divider";
import { Dropdown } from "src/v2/dropdown";
import { Flex, MAX_CONTAINER_WIDTH } from "src/v2/flex";
import { Image } from "src/v2/image";
import { MediaQuery } from "src/v2/media-query";
import { Stack } from "src/v2/stack";
import { Text } from "src/v2/text";

interface NavBarProps {
  version: string;
  selectedLanguageCode: LanguageEntity["code"];
  // @TODO-ZM: dry theme names
  themeName: "DARK" | "LIGHT" | "AUTO";
  logo: string;
  links: Array<{ text: string; href: string }>;
  onLanguageChanged: (languageCode: LanguageEntity["code"]) => void;
  onThemeChanged: (themeName: NavBarProps["themeName"]) => void;
}

// @TODO-ZM: dry theme names
const themNameToText: Record<NavBarProps["themeName"], string> = {
  DARK: "🌙",
  LIGHT: "🌞",
  AUTO: "🌗",
};

export const Navbar: FC<NavBarProps> = ({
  version,
  selectedLanguageCode,
  themeName,
  logo,
  links,
  onLanguageChanged,
  onThemeChanged,
}) => {
  const { t } = useTranslation();

  const Logo: FC = () => (
    // @TODO-ZM: 24 is an arbitrary number, use a regulated number
    <Link href="/" variant="v2" margin={1}>
      <Image src={logo} height={24} />
    </Link>
  );

  return (
    <Flex position="absolute">
      <Stack direction="vertical" alignItems="stretch">
        <Flex max={{ width: MAX_CONTAINER_WIDTH }}>
          <Stack direction="horizontal" alignItems="center">
            <MediaQuery upTo="md">
              <Logo />
            </MediaQuery>
            <Link
              margin={1}
              variant="v1"
              href={`https://github.com/dzcode-io/dzcode.io/releases/tag/${version}`}
              target="_blank"
            >
              {version}
            </Link>
            <Flex grow={1} />
            <Dropdown
              text={
                allLanguages.find(({ code }) => code === selectedLanguageCode)?.shortLabel || ""
              }
              items={allLanguages.map((lang) => ({
                code: lang.code,
                text: (
                  <Text variant="v2" margin={1}>
                    {lang.label}
                  </Text>
                ),
              }))}
              onSelect={onLanguageChanged}
            />
            <Dropdown
              text={themNameToText[themeName]}
              items={[
                {
                  code: "DARK",
                  text: (
                    <Text variant="v2" margin={1}>
                      {t("ui-theme-DARK")}
                    </Text>
                  ),
                },
                {
                  code: "LIGHT",
                  text: (
                    <Text variant="v2" margin={1}>
                      {t("ui-theme-LIGHT")}
                    </Text>
                  ),
                },
                {
                  code: "AUTO",
                  text: (
                    <Text variant="v2" margin={1}>
                      {t("ui-theme-AUTO")}
                    </Text>
                  ),
                },
              ]}
              onSelect={onThemeChanged}
            />
          </Stack>
        </Flex>
        <Flex color="BACKGROUND_2">
          <Flex max={{ width: MAX_CONTAINER_WIDTH }}>
            <Stack direction="horizontal" overflow="auto">
              <MediaQuery downTo="md">
                <Logo />
              </MediaQuery>
              <Flex grow={1} />
              {links.map(({ text, href }, index) => (
                <Fragment key={`navbar-link-${index}`}>
                  <Button margin={1} variant="v1" href={href}>
                    {t(text)}
                  </Button>
                  {index < links.length - 1 && <Divider margin={1} orientation="vertical" />}
                </Fragment>
              ))}
              <MediaQuery upTo="md">
                <Flex grow={1} />
              </MediaQuery>
            </Stack>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};
