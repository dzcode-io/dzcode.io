import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import { LinkV2 } from "src/components/link-v2";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { SidebarTreeItem } from "t9/apps/main/types";
import Skeleton from "@material-ui/lab/Skeleton";
import { SpeedDial } from "t9/apps/main/components/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heroImage: {
      width: "100%",
      maxHeight: "400px",
      objectFit: "cover",
    },
    treeItem: {
      padding: theme.spacing(1),
      margin: theme.spacing(0),
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

export const Sidebar = (props: {
  tree: SidebarTreeItem[] | null;
  expanded: string[];
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const SidebarSkeleton = (
    <>
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <Skeleton
          key={`ss-${index}`}
          className={classes.SidebarSkeleton}
          animation={index % 2 ? "pulse" : "wave"}
        />
      ))}
    </>
  );

  const renderTree = (node: SidebarTreeItem) => (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      label={
        node.link && node.children && node.children.length === 0 ? (
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
      <TreeView expanded={props.expanded}>
        {props.tree
          ? props.tree.map((tree) => renderTree(tree))
          : SidebarSkeleton}
      </TreeView>
    );
  } else {
    return (
      <React.Fragment>
        <SpeedDial
          className={classes.speedDial}
          ariaLabel="Actions SpeedDial"
          actions={[]}
          direction="right"
          icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
          open={false}
          onClick={handleOpen}
        />
        <Drawer anchor="bottom" onClose={handleClose} open={open}>
          <TreeView expanded={props.expanded} onClick={handleClose}>
            {props.tree
              ? props.tree.map((tree) => renderTree(tree))
              : SidebarSkeleton}
          </TreeView>
        </Drawer>
      </React.Fragment>
    );
  }
};
