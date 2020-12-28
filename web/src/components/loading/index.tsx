import { FC } from "react";
import logoSquare from "src/assets/svg/logo-wide.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  image: {
    display: "inline-block",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    maxWidth: "400px",
  },
}));

export const Loading: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={logoSquare} alt="DzCode i/o" className={classes.image} />
    </div>
  );
};

export default Loading;
