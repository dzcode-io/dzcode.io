import { Button } from "@dzcode.io/ui/dist/button";
import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { Image } from "@dzcode.io/ui/dist/image";
import { Markdown } from "@dzcode.io/ui/dist/markdown";
import { Stack } from "@dzcode.io/ui/dist/stack";
import { Text } from "@dzcode.io/ui/dist/text";
import { FC } from "react";
import { Helmet } from "react-helmet";
import svg from "src/assets/svg/404.svg";
import { T, t } from "src/components/t";

const NotFound: FC = () => {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>{t("notfound-title")}</title>
        <meta name="description" content={t("notfound-description")} />
      </Helmet>
      <Stack direction="vertical" alignItems="center" justifyContent="center">
        <Image src={svg} width="80%" />
        <Text variant="v2">
          <Markdown t={t("notfound-subtitle")} />
        </Text>
        <Button variant="v1" href="/" margin={3}>
          <T notfound-back-home />
        </Button>
      </Stack>
    </ErrorBoundary>
  );
};

// ts-prune-ignore-next
export default NotFound;
