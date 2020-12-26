import { Container, Theme, makeStyles } from "@material-ui/core";
import svg from "src/assets/svg/404.svg";

const useStyles = makeStyles((theme: Theme) => ({
  cont: {
    padding: 30,
  },
  root: {
    fontSize: 27,
    color: theme.palette.text.primary,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.cont}>
      <div className="justify-content-md-center">
        <img width="100%" height="100%" src={svg} alt="404" />
        <div className={classes.root}>Page Not Found</div>
      </div>
    </Container>
  );
};

export default NotFound;
