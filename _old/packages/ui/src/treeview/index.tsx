import { TreeItem } from "@dzcode.io/utils/dist/ts";
import Skeleton from "@mui/material/Skeleton";
import { FC, ReactElement } from "react";
import { Stack, StackProps } from "src/stack";

export interface TreeviewProps<T extends Record<string, unknown>>
  extends Pick<StackProps, "min" | "margin"> {
  items: TreeItem<T>[] | null;
  itemRender: (item: TreeItem<T>, info: { isSelected: boolean }) => ReactElement;
  shift?: number;
  selectedItemId?: TreeItem<T>["id"];
}

export const Treeview = <T extends Record<string, unknown>>({
  items,
  itemRender,
  shift = 1,
  selectedItemId: selectedItem,
  ...props
}: TreeviewProps<T>): ReturnType<FC<TreeviewProps<T>>> => {
  const RecursiveTreeitem: FC<{ item: TreeItem<T>; root?: boolean }> = ({ item, root }) => (
    <Stack direction="vertical" margin={!root ? [0, 0, 0, shift] : undefined}>
      {itemRender(item, { isSelected: item.id === selectedItem })}
      <Stack direction="vertical">
        {item.children?.map((childItem) => (
          <RecursiveTreeitem key={`treeitem-${childItem.id}`} item={childItem} />
        ))}
      </Stack>
    </Stack>
  );

  return (
    <Stack direction="vertical" {...props}>
      {items ? (
        items.map((i) => <RecursiveTreeitem key={`treeitem-${i.id}`} item={i} root={true} />)
      ) : (
        <>
          <Skeleton height={48} width={"70%"} sx={{ display: "inline-block" }} />
          <Skeleton height={48} width={"50%"} sx={{ display: "inline-block" }} />
          <Skeleton height={48} width={"60%"} sx={{ display: "inline-block" }} />
          <Skeleton height={48} width={"90%"} sx={{ display: "inline-block" }} />
          <Skeleton height={48} width={"80%"} sx={{ display: "inline-block" }} />
        </>
      )}
    </Stack>
  );
};
