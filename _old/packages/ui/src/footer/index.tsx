import { FC } from "react";
import { useTranslation } from "src/_hooks/use-translation";
import { Divider } from "src/divider";
import { Flex } from "src/flex";
import { Link } from "src/link";
import { Markdown } from "src/markdown";
import { Stack } from "src/stack";
import { Text } from "src/text";

interface FooterProps {
  sections: Array<{
    title: string;
    links: Array<{
      text: string;
      href: string;
    }>;
  }>;
  bottomText: string;
}

export const Footer: FC<FooterProps> = ({ sections, bottomText }) => {
  const { t } = useTranslation();

  return (
    <Flex color="BACKGROUND_2">
      <Stack direction="vertical" margin={[3, 1, 1]} alignItems="center">
        <Stack direction="horizontal" justifyContent="space-around" width="100%" flexWrap="wrap">
          {sections.map(({ title, links }, sectionIndex) => (
            <Stack key={`section-${sectionIndex}`} direction="vertical">
              <Text variant="v2" margin={[0, 0, 1, 0]}>
                {t(title)}
              </Text>
              {links.map(({ text, href }, linkIndex) => (
                <Link key={`link-${linkIndex}`} href={href}>
                  {t(text)}
                </Link>
              ))}
            </Stack>
          ))}
        </Stack>
        <Divider orientation="horizontal" margin={1} width={100} flexItem={false} />
        <Markdown t={t(bottomText, { CURRENT_YEAR: new Date().getFullYear() })} />
      </Stack>
    </Flex>
  );
};
