import { Model } from "@dzcode.io/models/dist/_base";
import { AccountEntity } from "@dzcode.io/models/dist/account";
import { Skeleton } from "@mui/material";
import { FC } from "react";
import { Divider } from "src/divider";
import { Image } from "src/image";
import { Link } from "src/link";
import { Markdown } from "src/markdown";
import { Stack, StackProps } from "src/stack";
import { Text } from "src/text";

export type MinimumAccountInfo = Pick<
  Model<AccountEntity>,
  "id" | "name" | "username" | "profileUrl" | "avatarUrl"
>;
export interface ArticleProps extends Pick<StackProps, "margin"> {
  article: {
    image: string;
    title: string;
    content: string;
    authors: MinimumAccountInfo[];
    contributors: MinimumAccountInfo[];
  } | null;
  authorsText: string;
  contributorsText: string;
}

export const Article: FC<ArticleProps> = ({ article, authorsText, contributorsText, ...props }) => {
  return article ? (
    <Stack direction="vertical" {...props}>
      <Image src={article?.image} width="100%" />
      <Text variant="v3" margin={[3, 0, 0]}>
        {article.title}
      </Text>
      <Divider orientation="horizontal" margin={[2, 3, 2, 0]} />
      <Markdown t={article.content} />
      {(article.authors.length || article.contributors.length) && (
        <Divider orientation="horizontal" margin={[2, 0]} width={"50%"} />
      )}
      {article.authors.length > 0 && (
        <>
          <Text variant="v2" margin={[1, 0]}>
            {authorsText}
          </Text>
          <Stack direction="horizontal" gap={3}>
            {article.authors.map((author, index) => (
              <Link key={`author-${index}`} href={author.profileUrl} variant="v2">
                <Image key={`author-${index}`} width={48} src={author.avatarUrl} />
              </Link>
            ))}
          </Stack>
        </>
      )}
      {article.contributors.length > 0 && (
        <>
          <Text variant="v2" margin={[1, 0]}>
            {contributorsText}
          </Text>
          <Stack direction="horizontal" gap={3}>
            {article.contributors.map((contributor, index) => (
              <Link key={`contributor-${index}`} href={contributor.profileUrl} variant="v2">
                <Image width={48} src={contributor.avatarUrl} />
              </Link>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  ) : (
    <Stack direction="vertical" {...props}>
      <Skeleton height={200} variant="rectangular" />
      <Text variant="v3" margin={[3, 0, 0]}>
        <Skeleton />
        <Skeleton width="75%" />
      </Text>
      <Divider orientation="horizontal" margin={[2, 3, 2, 0]} />
      <Skeleton />
      <Skeleton />
      <Skeleton width="75%" />
    </Stack>
  );
};
