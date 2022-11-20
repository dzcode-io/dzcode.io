import { Link } from "@dzcode.io/ui/dist/link";
import { TreeItem } from "@dzcode.io/utils/dist/ts";
import Drawer from "@material-ui/core/Drawer";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import Skeleton from "@material-ui/lab/Skeleton";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import MUITreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import { FC, Fragment } from "react";
import { SpeedDial } from "src/components/speed-dial";

export type SidebarTreeItem = TreeItem<{
  content: string;
  link?: string;
}>;

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
  path: string;
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
    <MUITreeItem
      key={node.id}
      nodeId={node.id}
      label={
        node.id && node.children ? (
          <Link
            className={classes.treeItem}
            href={`${props.path}/${node.id}`}
            style={{
              color: "inherit",
              textDecoration: "none",
              display: "block",
            }}
          >
            {node.content}
          </Link>
        ) : (
          <div className={classes.treeItem}>{node.content}</div>
        )
      }
    >
      {node.children ? node.children.map((treeItem) => renderTree(treeItem)) : null}
    </MUITreeItem>
  );

  if (md) {
    return (
      <TreeView expanded={props.expanded} selected={props.selected}>
        {props.tree ? props.tree.map((tree) => renderTree(tree)) : SidebarSkeleton}
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
          <TreeView expanded={props.expanded} selected={props.selected} onClick={handleClose}>
            {props.tree ? props.tree.map((tree) => renderTree(tree)) : SidebarSkeleton}
          </TreeView>
        </Drawer>
      </Fragment>
    );
  }
};
