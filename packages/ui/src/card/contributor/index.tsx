import { Model } from "@dzcode.io/models/dist/_base";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { getRepositoryURL } from "@dzcode.io/models/dist/repository-reference/utils";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FC } from "react";
import { Button } from "src/button";
import { Divider } from "src/divider";
import { Image } from "src/image";
import { Stack } from "src/stack";
import { Text } from "src/text";

interface ContributorCard {
  contributor: Model<ContributorEntity, "repositories">;
}

export const ContributorCard: FC<ContributorCard> = ({ contributor }) => {
  return (
    // @TODO-ZM: cleanup this rushed component
    <Card sx={{ width: 300 }} variant="outlined">
      <CardContent>
        <Stack direction="vertical" alignItems="center">
          {/* @TODO-ZM: standardize image sizes */}
          <Image src={contributor.avatarUrl} width={100} height={100} />
          <Text variant="v2" margin={[1, 0, 0]}>
            {contributor.username}
          </Text>
          <Divider orientation="horizontal" margin={[1, 3]} />
        </Stack>
        <Stack direction="vertical">
          <ul dir="ltr">
            {contributor.repositories.map((repository, index) => (
              <li key={`repository-${index}`}>
                <Button
                  variant="v1"
                  href={getRepositoryURL(repository)}
                >{`${repository.owner}/${repository.repository}`}</Button>
              </li>
            ))}
          </ul>
        </Stack>
      </CardContent>
    </Card>
  );
};
