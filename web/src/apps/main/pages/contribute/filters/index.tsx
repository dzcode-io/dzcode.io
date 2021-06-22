import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Checkbox from "@material-ui/core/Checkbox";
import CloseIcon from "@material-ui/icons/Close";
import { ContributePageState } from "src/apps/main/redux/reducers/contribute-page";
import Drawer from "@material-ui/core/Drawer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuIcon from "@material-ui/icons/Menu";
import { SpeedDial } from "src/apps/main/components/speed-dial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import { updateFilterValue } from "src/apps/main/redux/actions/contribute-page";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  filter: {
    display: "block",
  },
  option: {
    display: "block",
  },
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(2),
  },
}));

export const Filters: FC = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { filters } = useSelector<StateInterface, ContributePageState>(
    (state) => state.contributePage,
  );
  const dispatch = useDispatch<Dispatch<ContributePageState>>();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const renderFilters = () =>
    filters.map(({ name: filterName, label: filterLabel, options }) => (
      <Accordion key={`filter-${filterName}`} variant="outlined" style={{ marginBottom: -1 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>{filterLabel}</AccordionSummary>
        <AccordionDetails className={classes.filter}>
          {options.map(({ label: optionLabel, name: optionName, checked }) => (
            <FormControlLabel
              key={`filter-${filterName}-${optionName}`}
              control={<Checkbox checked={checked} />}
              label={optionLabel}
              className={classes.option}
              onChange={(e, checked) => {
                dispatch(updateFilterValue(filterName, optionName, checked));
              }}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    ));

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  if (md) {
    return <>{renderFilters()}</>;
  } else {
    return (
      <>
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
          {renderFilters()}
        </Drawer>
      </>
    );
  }
};
