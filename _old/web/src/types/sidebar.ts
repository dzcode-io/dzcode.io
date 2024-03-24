import type { TreeItem } from "@dzcode.io/utils/dist/ts";

export type SidebarTreeItem = TreeItem<{
  content: string;
  link?: string;
}>;
