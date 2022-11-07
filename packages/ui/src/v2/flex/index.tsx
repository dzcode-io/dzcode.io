import type { CSSProperties, FC } from "react";
import { Color, useColors } from "src/_hooks/use-colors";

// @TODO-ZM: dry this
export const MAX_CONTAINER_WIDTH = 1200;

export interface FlexProps
  extends Pick<
    CSSProperties,
    "position" | "width" | "height" | "position" | "top" | "bottom" | "left" | "right" | "display"
  > {
  grow?: number;
  max?: Pick<CSSProperties, "width" | "height">;
  min?: Pick<CSSProperties, "width" | "height">;
  color?: Color;
}

export const Flex: FC<FlexProps> = ({
  children,
  grow,
  max,
  min,
  color,
  position,
  width = "100%",
  ...css
}) => {
  const { from } = useColors();
  return (
    <div
      style={{
        flexGrow: grow,
        margin: "auto",
        width,
        backgroundColor: from(color),
        ...(max ? { maxWidth: max.width, maxHeight: max.height } : {}),
        ...(min ? { maxWidth: min.width, minHeight: min.height } : {}),
        position,
        ...css,
      }}
    >
      {children}
    </div>
  );
};
