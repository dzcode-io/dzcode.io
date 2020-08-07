import { LinkV2 } from "src/components/link-v2";
import React from "react";
import { SidebarTreeItem } from "t9/apps/main/types";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";

const renderTree = (node: SidebarTreeItem) => (
  <TreeItem
    key={node.id}
    nodeId={node.id}
    label={
      node.link && node.children && node.children.length === 0 ? (
        <LinkV2
          href={node.link}
          style={{ color: "inherit", textDecoration: "none", display: "block" }}
        >
          {node.content}
        </LinkV2>
      ) : (
        node.content
      )
    }
  >
    {node.children
      ? node.children.map((treeItem) => renderTree(treeItem))
      : null}
  </TreeItem>
);

export const Sidebar = (props: {
  tree: SidebarTreeItem[] | null;
  expanded: string[];
}) => {
  return (
    <TreeView
      // defaultCollapseIcon={<ExpandMoreIcon />}
      // defaultExpandIcon={<ChevronRightIcon />}
      expanded={props.expanded}
    >
      {props.tree
        ? props.tree.map((tree) => renderTree(tree))
        : "Loading Documentation List..."}
    </TreeView>
  );
};
