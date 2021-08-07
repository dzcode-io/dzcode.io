import { FC, ReactNode, useState } from "react";
import SpeedDialMUI, { SpeedDialProps as SpeedDialPropsMUI } from "@material-ui/lab/SpeedDial";

import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

export interface SpeedDialAction {
  icon: ReactNode;
  name: string;
  link?: string;
}

interface SpeedDialProps extends SpeedDialPropsMUI {
  actions: SpeedDialAction[];
  open: boolean;
}
export const SpeedDial: FC<SpeedDialProps> = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <SpeedDialMUI
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      {...props}
      open={open}
    >
      {props.actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
          FabProps={{ href: action.link }}
        />
      ))}
    </SpeedDialMUI>
  );
};
