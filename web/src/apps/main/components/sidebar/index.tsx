import { FC, Fragment, useState } from "react";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import { LinkV2 } from "src/components/link-v2";
import MenuIcon from "@material-ui/icons/Menu";
import { SidebarTreeItem } from "src/apps/main/types";
import Skeleton from "@material-ui/lab/Skeleton";
import { SpeedDial } from "src/apps/main/components/speed-dial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) =>
  createStyles({
    heroImage: {
      width: "100%",
      maxHeight: "400px",
      objectFit: "cover",
    },
    treeItem: {
      padding: theme.spacing(1),
      margin: theme.spacing(0),
      "&:hover": {
        background: theme.palette.background.paper,
      },
    },
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(2),
    },
    SidebarSkeleton: {
      margin: theme.spacing(1),
    },
  }),
);

interface SidebarProps {
  tree: SidebarTreeItem[] | null;
  expanded: string[];
  selected: string;
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  const handleClose = () => props.onChange(false);
  const handleOpen = () => props.onChange(true);

  const SidebarSkeleton = (
    <>
      {[50, 40, 70, 60, 65, 40].map((width, index) => (
        <Skeleton
          key={`ss-${index}`}
          className={classes.SidebarSkeleton}
          animation={index % 2 ? "pulse" : "wave"}
          width={`${width}%`}
        />
      ))}
    </>
  );

  const renderTree = (node: SidebarTreeItem) => (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      label={
        node.link && node.children ? (
          <LinkV2
            className={classes.treeItem}
            href={node.link}
            style={{
              color: "inherit",
              textDecoration: "none",
              display: "block",
            }}
          >
            {node.content}
          </LinkV2>
        ) : (
          <div className={classes.treeItem}>{node.content}</div>
        )
      }
    >
      {node.children
        ? node.children.map((treeItem) => renderTree(treeItem))
        : null}
    </TreeItem>
  );

  if (md) {
    return (
      <TreeView expanded={props.expanded} selected={props.selected}>
        {props.tree
          ? props.tree.map((tree) => renderTree(tree))
          : SidebarSkeleton}
      </TreeView>
    );
  } else {
    return (
      <Fragment>
        <SpeedDial
          className={classes.speedDial}
          ariaLabel="Actions SpeedDial"
          actions={[]}
          direction="right"
          icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
          open={false}
          onClick={handleOpen}
        />
        <Drawer anchor="bottom" onClose={handleClose} open={props.isOpen}>
          <TreeView
            expanded={props.expanded}
            selected={props.selected}
            onClick={handleClose}
          >
            {props.tree
              ? props.tree.map((tree) => renderTree(tree))
              : SidebarSkeleton}
          </TreeView>
        </Drawer>
      </Fragment>
    );
  }
};
