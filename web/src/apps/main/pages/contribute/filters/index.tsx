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
    filters.map(
      ({ name: filterName, label: filterLabel, options }, filterIndex) => (
        <Accordion
          key={`filter-${filterIndex}`}
          variant="outlined"
          style={{ marginBottom: -1 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {filterLabel}
          </AccordionSummary>
          <AccordionDetails className={classes.filter}>
            {options.map(
              (
                { label: optionLabel, name: optionName, checked },
                optionIndex,
              ) => (
                <FormControlLabel
                  key={`filter-${filterIndex}-${optionIndex}`}
                  control={<Checkbox checked={checked} />}
                  label={optionLabel}
                  className={classes.option}
                  onChange={(e, checked) => {
                    const newFilters = filters.map((filter) => {
                      if (filter.name !== filterName) {
                        return filter;
                      } else {
                        return {
                          ...filter,
                          options: filter.options.map((option) => {
                            if (option.name !== optionName) {
                              return option;
                            } else {
                              return { ...option, checked };
                            }
                          }),
                        };
                      }
                    });
                    dispatch({
                      type: "UPDATE_CONTRIBUTE_PAGE",
                      payload: {
                        filters: newFilters,
                      },
                    });
                  }}
                />
              ),
            )}
          </AccordionDetails>
        </Accordion>
      ),
    );

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
