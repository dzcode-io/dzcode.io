import type { FC } from "react";
import React from "react";
import type { ViewStyle } from "react-native";
import { View } from "react-native";
import { useTheme } from "src/_hooks/use-theme";
import { Avatar } from "src/avatar/avatar";

import { avatarGroupStyles } from "./styles";

interface AvatarGroupProps {
  max?: number;
  avatarUris: string[];
  style?: ViewStyle;
}

export const AvatarGroup: FC<AvatarGroupProps> = ({ max = 3, avatarUris, style }) => {
  const { colors } = useTheme();
  const rest = avatarUris.length - max + 1;
  return (
    <View style={[avatarGroupStyles.row, { ...style }]}>
      {avatarUris.map((uri, index) => {
        if (index < max - 1) {
          return (
            <View
              key={uri}
              style={[
                avatarGroupStyles.avatarContainer,
                {
                  zIndex: 99 - index,
                  borderColor: colors.background,
                },
              ]}
            >
              <Avatar.Image
                source={{ uri }}
                style={{
                  backgroundColor: colors.background,
                }}
              />
            </View>
          );
        } else if (index === max) {
          return (
            <View
              key={uri}
              style={[
                avatarGroupStyles.avatarContainer,
                {
                  zIndex: 99 - index,
                  borderColor: colors.background,
                },
              ]}
            >
              <Avatar.Text
                label={`+${rest}`}
                labelStyle={avatarGroupStyles.avatarLabelText}
                style={{
                  backgroundColor: colors.outline,
                }}
              />
            </View>
          );
        } else {
          return <View key={uri} />;
        }
      })}
    </View>
  );
};
