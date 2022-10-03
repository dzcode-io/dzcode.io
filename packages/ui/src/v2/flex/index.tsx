import type { CSSProperties, FC } from "react";
import { Color, useColors } from "src/hooks/use-colors";

// @TODO-ZM: dry this
export const MAX_CONTAINER_WIDTH = 1200;

export interface FlexProps extends Pick<CSSProperties, "position"> {
  grow?: number;
  max?: Pick<CSSProperties, "width" | "height">;
  min?: Pick<CSSProperties, "width" | "height">;
  color?: Color;
}

export const Flex: FC<FlexProps> = ({ children, grow, max, min, color, position }) => {
  const { from } = useColors();
  return (
    <div
      style={{
        flexGrow: grow,
        margin: "auto",
        width: "100%",
        backgroundColor: from(color),
        ...(max ? { maxWidth: max.width, maxHeight: max.height } : {}),
        ...(min ? { maxWidth: min.width, minHeight: min.height } : {}),
        position,
      }}
    >
      {children}
    </div>
  );
};
