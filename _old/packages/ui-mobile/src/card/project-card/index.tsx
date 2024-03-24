import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { getRepositoryURL } from "@dzcode.io/models/dist/repository-reference/utils";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC, memo } from "react";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { useTheme } from "src/_hooks/use-theme";
import { AvatarGroup } from "src/avatar/avatar-group";
import { Badge } from "src/badge";
import { Button } from "src/button";
import { Card } from "src/card/card";
import { Chip } from "src/chip";
import { Divider } from "src/divider";
import { Title } from "src/text/title";

import { cardStyles } from "./styles";

interface ProjectCardProps {
  project: Model<ProjectEntity> & {
    repositories: Model<RepositoryEntity, "contributors" | "stats">[];
  };
  openLink: (url: string) => void;
}

const CardItem: FC<ProjectCardProps> = ({
  project: { name, repositories },

  openLink,
}: ProjectCardProps) => {
  const width = Dimensions.get("window").width;
  const { colors } = useTheme();
  return (
    <Card
      style={[
        cardStyles.mainView,
        {
          borderColor: colors.secondary,
        },
      ]}
    >
      <Card.Content>
        <Title>{name}</Title>
        <Divider
          style={[
            cardStyles.divider1,
            {
              backgroundColor: colors.secondary,
            },
          ]}
        />
      </Card.Content>
      <View style={cardStyles.reposColumn}>
        {repositories.map((repository, index) => {
          let link = `${repository.owner}/${repository.repository}`;
          link = link.length >= width / 10 ? link.slice(0, width / 10) + "..." : link;
          const avatarUris = repository.contributors.map((contributor) => contributor.avatarUrl);
          return (
            <View key={index}>
              <Button
                key={`repository-${index}`}
                onPress={() => openLink(getRepositoryURL(repository))}
                uppercase={false}
                style={{
                  alignSelf: "flex-start",
                }}
              >
                {link}
              </Button>
              <View style={cardStyles.row}>
                <AvatarGroup style={cardStyles.avatarGroup} avatarUris={avatarUris} />
                {repository.stats.contributionCount > 0 && (
                  <View style={cardStyles.marginRight}>
                    <MaterialIcons name="construction" color={colors.primary} size={50} />
                    <Badge
                      style={[
                        cardStyles.badgeView,
                        {
                          color: colors.secondary,
                        },
                      ]}
                    >
                      {repository.stats.contributionCount}
                    </Badge>
                  </View>
                )}
              </View>
              {repository.stats.languages.length > 0 && (
                <View
                  style={{
                    height: 40,
                  }}
                >
                  <ScrollView
                    style={cardStyles.flatListView}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    {repository.stats.languages.map((lang) => (
                      <Chip key={lang} style={cardStyles.chipView}>
                        {lang}
                      </Chip>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </Card>
  );
};

/**
 * ProjectCard component used to display the project card in the app
 * @prop {Model<ProjectReferenceEntity, "repositories">} project - the project to display
 * @prop {Function} openLink - the function to open the link
 * @example
 * <ProjectCard
 *    project={project}
 *    openLink={url => Linking.openURL(url)}
 * />
 */
export const ProjectCard = memo(CardItem);
