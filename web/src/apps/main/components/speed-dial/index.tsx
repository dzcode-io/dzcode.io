import { FC, ReactNode, useState } from "react";
import SpeedDialMUI, {
  SpeedDialProps as SpeedDialPropsMUI,
} from "@material-ui/lab/SpeedDial";

import PropTypes from "prop-types";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

interface SpeedDialProps extends SpeedDialPropsMUI {
  actions: Array<{
    icon: ReactNode;
    name: string;
  }>;
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
        />
      ))}
    </SpeedDialMUI>
  );
};

SpeedDial.propTypes = {
  actions: PropTypes.array.isRequired,
};
