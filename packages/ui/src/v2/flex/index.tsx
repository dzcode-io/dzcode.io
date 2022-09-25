import type { CSSProperties, FC } from "react";
import { Color, useColors } from "src/hooks/use-colors";

export interface FlexProps {
  grow?: number;
  max?: Pick<CSSProperties, "width" | "height">;
  color?: Color;
}

export const Flex: FC<FlexProps> = ({ children, grow, max, color }) => {
  const { from } = useColors();
  return (
    <div
      style={{
        flexGrow: grow,
        margin: "auto",
        width: "100%",
        height: "100%",
        backgroundColor: from(color),
        ...(max ? { maxWidth: max.width, maxHeight: max.height } : {}),
      }}
    >
      {children}
    </div>
  );
};
