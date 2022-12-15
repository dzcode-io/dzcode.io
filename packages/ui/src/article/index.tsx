import { Skeleton } from "@mui/material";
import { VFC } from "react";
import { Divider } from "src/divider";
import { Image } from "src/image";
import { Link } from "src/link";
import { Markdown } from "src/markdown";
import { Stack, StackProps } from "src/stack";
import { Text } from "src/text";

export interface ArticleAuthor {
  name: string;
  link: string;
  image: string;
}

export interface ArticleProps extends Pick<StackProps, "margin"> {
  article: {
    image: string;
    title: string;
    content: string;
    authors: ArticleAuthor[];
    contributors: ArticleAuthor[];
  } | null;
  authorsText: string;
  contributorsText: string;
}

export const Article: VFC<ArticleProps> = ({
  article,
  authorsText,
  contributorsText,
  ...props
}) => {
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
              <Link key={`author-${index}`} href={author.link} variant="v2">
                <Image key={`author-${index}`} width={48} src={author.image} />
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
              <Link key={`contributor-${index}`} href={contributor.link} variant="v2">
                <Image width={48} src={contributor.image} />
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
